require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const Authentication = require('./controllers/authentication');
const Profile = require('./controllers/profile');


module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'You are authorized' });
  });
  app.post('/login', requireLogin, Authentication.login);
  app.post('/signup', Authentication.signup);
  app.get('/:username', Profile.loadUser);
};
