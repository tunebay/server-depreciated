require('./services/passport');

const passport = require('passport');
const Authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'You are authorized' });
  });
  app.post('/signup', Authentication.signup);
};
