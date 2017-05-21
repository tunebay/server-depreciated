require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const User = require('./controllers/user');
const Authentication = require('./controllers/authentication');

const AWS = require('./services/AWSUtil');
// const Profile = require('./controllers/profile');
const Playlist = require('./controllers/playlist');

module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'You are authorized' });
  });
  app.post('/auth/login', requireLogin, Authentication.login);
  app.post('/auth/signup', Authentication.signup);
  app.post('/auth/signup/usernamecheck', Authentication.usernamecheck);
  app.post('/auth/signup/emailcheck', Authentication.emailcheck);
  app.get('/users', User.loadAllUsers);
  app.get('/users/:username', User.loadUserByUsername);
  app.post('/playlists/new', requireAuth, Playlist.create);
  app.get('/upload/s3/sign', AWS.sign);
  app.get('/*', (req, res) => {
    res.status(404)
      .json({
        error: 'Page not found'
      });
  });
};
