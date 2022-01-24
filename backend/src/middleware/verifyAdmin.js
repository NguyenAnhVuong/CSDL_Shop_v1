const { ErrorHandler } = require('../helpers/errors');

module.exports = (req, res, next) => {
    const user_id = req.user.user_id;
    if (user_id === 1) {
        next();
    } else {
        throw new ErrorHandler(401, "not admin");
    }
}