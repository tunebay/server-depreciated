require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const AWS = require('./util/AWSUtil');
const Authentication = require('./controllers/authentication');
const Profile = require('./controllers/profile');
const Playlist = require('./controllers/playlist');

module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'You are authorized' });
  });
  app.post('/login', requireLogin, Authentication.login);
  app.post('/signup', Authentication.signup);
  app.post('/signup/usernamecheck', Authentication.usernamecheck);
  app.post('/signup/emailcheck', Authentication.emailcheck);
  app.post('/playlists/new', requireAuth, Playlist.create);
  app.get('/user/:username', Profile.loadUserByUsername);
  app.get('/upload/s3/sign', AWS.sign);
  app.get('/*', (req, res) => {
    res.status(404)
      .json({
        error: 'Page not found'
      });
  });
};
