const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../helpers/errors');
const proCess = require('../jwt/nodemon.json');

const verifyLogout = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ErrorHandler(401, "Token missing");
  }
  console.log(token);
  try {
    const verified = jwt.verify(token, proCess.env.ACCESS_TOKEN_SECERT);
    req.user = {
      ...verified,
      token
    }
    next();
  } catch (error) {
    throw new ErrorHandler(401, error.message || "Invalid Token");
  }
};


module.exports = verifyLogout;