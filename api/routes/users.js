const express = require('express');
const router = express.Router();
const { models } = require('../db');
const bcrypt = require('bcryptjs');
const methodOverride = require('method-override');
const authenticateUser = require('../auth');
const asyncHandler = require('../asyncHandler');

router.use(methodOverride('_method'));
//express.json as seen here https://teamtreehouse.com/library/create-a-new-quote
router.use(express.json());


/** ADAPTED FROM
 * https://sequelize.readthedocs.io/en/1.7.0/articles/express/ 
 * https://gist.github.com/vapurrmaid/a111bf3fc0224751cb2f76532aac2465
 * */
// get list of ALL users currently in database
router.get('/all', asyncHandler(async (req, res) => {
    await models.User.findAll({})
        .then(user => {
            if (user) {
                res.json({ user: user });
            } else {
                res.status(404).json({
                    message: "The get request is not Not found"
                });
            }
        });
}));

/** Set up permissions to require users to be signed in
 */
router.get('/', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.json(req.currentUser).end();
}));

//POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post('/', asyncHandler(async (req, res) => {
    //bcrypt hash function adapted from https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f
    const saltRounds = 10;
    if (req.body) {
        if (req.body.password) {
            bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
                await models.User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    emailAddress: req.body.emailAddress,
                    password: hash,
                })
                    .then(user => {
                        res.setHeader('Location', `/`);
                        res.status(201).end();
                    })
                    .catch(err => {
                        if (err.name === "SequelizeValidationError") {
                            res.status(400).send(err.message).end();
                        } else {
                            res.json({ message: err.message });
                        }
                    });
            });
        } else {
            res.status(400).send("password is required");
        }
    } else {
        res.status(400).send("All fields are required");
    }
}));

// get user by primary key (pk) and display edit form
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    await models.User.findByPk(id, {
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })
        .then(user => {
            if (user) {
                res.json({ user: user });
            } else {
                res.status(404).json({
                    message: "The get request is not Not found"
                });
            }
        });
}));

// update user details
router.put('/:id', asyncHandler(async (req, res) => {
    const user = await models.User.findByPk(req.params.id);
    // Get the user from the request body
    const userPassword = req.body;
    // Hash the new user's password.
    if (user) {
        if (req.body.password) {
            userPassword.password = bcrypt.hashSync(userPassword.password);
            await models.User.update(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    emailAddress: req.body.emailAddress,
                    password: userPassword.password
                },
                { where: { id: req.params.id } },
                { fields: ['firstName', 'lastName', 'emailAddress', 'password'] }
            )
                .then(user => {
                    res.status(204).end();
                });
        } else {
            res.status(400).send("password is required");
        }
    } else {
        res.status(400).send("All fields are required");

    }
}));

// delete user from database
router.delete('/:id', asyncHandler(async (req, res) => {
    const user = await models.User.findByPk(req.params.id);
    if (user) {
        await models.User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(book => {
                res.status(204).end();
            });
    } else {
        res.status(404).json({
            message: "The DELETE request is not Not found"
        });
    }
}));

module.exports = router;
