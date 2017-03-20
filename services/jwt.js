const jwt = require('jsonwebtoken');
const config = require('../config');

const generateJwtForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, config.jwtSecret);
};

const getUserIdFromToken = (token) => {
  const payload = jwt.verify(token, config.jwtSecret);
  return payload.sub;
};

module.exports = {
  generateJwtForUser,
  getUserIdFromToken
};
