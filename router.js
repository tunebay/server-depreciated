require('./services/passport');

const passport = require('passport');
const Authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'You are authorized' });
  });
  app.post('/login', requireLogin, Authentication.login);
  app.post('/signup', Authentication.signup);
};
