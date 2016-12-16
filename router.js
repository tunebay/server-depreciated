const db = require('./database/config');

module.exports = (app) => {
  app.get('/signup', db.createUser);
};
