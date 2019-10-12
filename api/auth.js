const bcrypt = require('bcryptjs');
const auth = require('basic-auth');
const { models } = require('./db');


const authenticateUser = async (req, res, next) => {
    let message = null;
    // Get the user's credentials from the Authorization header.
    const credentials = auth(req);

    if (credentials) {
        const users = await models.User.findOne({
            where: {
                emailAddress: credentials.name,
            },
        });
        if (users) {
            const authenticated = bcrypt.compareSync(credentials.pass, users.password);
            if (authenticated) {
                console.log(`Authentication successful for emailAddress: ${users.emailAddress}`);
                req.currentUser = await models.User.findOne({
                    where: { emailAddress: credentials.name },
                    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
                });
            } else {
                message = `Authentication failure for emailAddress: ${users.emailAddress}`;
            }
        } else {
            message = `User not found for emailAddress: ${credentials.name}`;
        }
    }

    if (credentials == undefined) {
        message = 'Auth header not found';
        res.status(401);
    }

    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
        next();
    }


};

module.exports = authenticateUser;