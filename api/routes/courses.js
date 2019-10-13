const express = require('express');
const router = express.Router();
const { models } = require('../db');
const authenticateUser = require('../auth');
const methodOverride = require('method-override');
const asyncHandler = require('../asyncHandler');
const auth = require('basic-auth');

router.use(methodOverride('_method'));
//express.json as seen here https://teamtreehouse.com/library/create-a-new-quote
router.use(express.json());

/** ADAPTED FROM
 * https://sequelize.readthedocs.io/en/1.7.0/articles/express/ 
 * https://gist.github.com/vapurrmaid/a111bf3fc0224751cb2f76532aac2465
 * */
// get list of ALL users currently in database
router.get('/', asyncHandler(async (req, res) => {
    await models.Course.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
        .then(course => {
            if (course) {
                res.json({ course: course });
            } else {
                res.status(404).json({
                    "errors": ["The get request is not Not found"]
                });
            }
        });
}));
//POST /api/users 201 - Creates a course, sets the Location header to "/", and returns no content
router.post('/', authenticateUser, asyncHandler(async (req, res) => {
    if (req.body) {
        await models.Course.create({
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded,
            userId: req.body.userId,
        })
            .then(course => {
                // use setHeader https://stackoverflow.com/questions/14943607/how-to-set-the-location-response-http-header-in-express-framework
                res.setHeader('Location', `/courses/${course.id}`);
                res.status(201).end();
            })
    } else {
        res.status(400).json({
            "errors": ["Title is required. Description is required."]
        });
    }
}));
// get course by primary key (pk) and display edit form
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    // await models.Course.findByPk(id)
    await models.Course.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then(course => {
            if (course) {
                res.json({ course: course });
            } else {
                res.status(404).json({
                    "errors": ["The get request is not Not found"]
                });
            }
        });
}));

// update course details
router.put('/:id', authenticateUser, asyncHandler(async (req, res) => {
    // store user name and password
    const credentials = auth(req);
    /// get course by ID param in URL
    const course = await models.Course.findByPk(req.params.id);
    const userId = course.userId;
    // get user ID that is associated with the course from ID params
    const getUser = await models.User.findByPk(userId);
    const userEmailAddress = getUser.emailAddress;

    // if the user who signed is is assocated with the course ID they can edit it
    if (credentials.name === userEmailAddress) {
        if (course) {
            await models.Course.update(
                {
                    title: req.body.title,
                    description: req.body.description,
                    estimatedTime: req.body.estimatedTime,
                    materialsNeeded: req.body.materialsNeeded,
                    userId: req.body.userId,
                },
                { where: { id: req.params.id } },
                { fields: ['title', 'description', 'estimatedTime', 'materialsNeeded', 'userId'] }
            )
                .then(course => {
                    res.status(204).end();
                });
        } else {
            res.status(400).json({
                "errors": ["Title and description are required"]
            });
            
        }
    } else {
        res.status(403).json({
            "errors": ["You do not have authorization to edit this course."]
        });
    }
}));

// delete course from database
router.delete('/:id', authenticateUser, asyncHandler(async (req, res) => {
    // store user name and password
    const credentials = auth(req);
    /// get course by ID param in URL
    const course = await models.Course.findByPk(req.params.id);
    const userId = course.userId;
    // get user ID that is associated with the course from ID params
    const getUser = await models.User.findByPk(userId);
    const userEmailAddress = getUser.emailAddress;

    // if the user who signed is is assocated with the course ID they can edit it
    if (credentials.name === userEmailAddress) {
        if (course) {
            await models.Course.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(course => {
                    res.status(204).end();
                });
        } else {
            res.status(404).json({
                "errors": ["The DELETE request is not Not found"]
            });
        }
    } else {
        res.status(403).json({
            "errors": ["You do not have authorization to DELETE this course."]
        });
    }
}));

module.exports = router;
