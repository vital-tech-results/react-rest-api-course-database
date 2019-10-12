/**adapted from https://teamtreehouse.com/library/refactor-with-express-middleware
 * global try / catch with async/await
 * instead of having try/catch in every route below
 * this wraps the req,res callback in a try/catch block
 * and uses async/await as well
 */
const asyncHandler = (cb) => async (req, res, next) => {
    try {
        await cb(req, res, next);
    } catch (err) {
        if (err.name === "SequelizeValidationError") {
            res.status(400).send(err.message).end();
            next(err);
        } else {
            next(err);
        }
        res.status(500).json({ message: err.message });
    }
};

module.exports = asyncHandler;