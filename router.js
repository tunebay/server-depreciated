const User = require('./models/user');

module.exports = (app) => {
  app.post('/signup', User.create);
};
