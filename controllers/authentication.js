const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

const generateJwtForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.jwtSecret);
};

exports.login = (req, res) => {
  console.log('hitting log in handler');
  // User already auth'd
  res.status(200)
    .json({ token: generateJwtForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const user = new User(req.body);

  User.findByUsername(req.body.username)
    .then((foundUsername) => {
      if (foundUsername) {
        return res.status(422)
          .json({
            error: `The username ${user.username} is not available.`
          });
      }
      return User.findByEmail(req.body.email)
        .then((foundEmail) => {
          if (foundEmail) {
            return res.status(422)
              .json({
                error: 'This email is already in use.'
              });
          }
          return user.save()
            .then((userRecord) => {
              res.status(200)
                .json({
                  status: 'success',
                  message: 'Successfully created a user.',
                  token: generateJwtForUser(userRecord)
                });
            });
        });
    })
    .catch((error) => {
      console.log('*** SIGNUP ERROR **** ', error);
      return next(error);
    });
};
