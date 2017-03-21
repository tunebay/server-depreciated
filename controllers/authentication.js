const User = require('../models/user');
const { generateJwtForUser } = require('../services/jwt');

exports.login = (req, res, next) => {
  // User already auth'd
  User.updateLastLogin(req.user)
    .then(() => {
      res.status(200)
      .json({
        status: 'success',
        message: 'ok',
        token: generateJwtForUser(req.user),
        user: {
          username: req.user.username,
          email: req.user.email,
          displayName: req.user.display_name,
          id: req.user.id,
          accountType: req.user.account_type
        }
      });
    })
    .catch(error => next(error));
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
              return res.status(200)
                .json({
                  status: 'success',
                  message: 'ok',
                  token: generateJwtForUser(userRecord),
                  user: {
                    username: userRecord.username,
                    email: userRecord.email,
                    displayName: userRecord.display_name,
                    id: userRecord.id,
                    accountType: userRecord.account_type
                  }
                });
            });
        });
    })
    .catch((error) => {
      console.log('*** SIGNUP ERROR **** ', error);
      next(error);
    });
};

exports.usernamecheck = (req, res, next) => {
  User.findByUsername(req.body.username)
    .then((foundUsername) => {
      if (foundUsername) {
        return res
          .json({
            error: `The username ${foundUsername.username} is not available.`,
            status: 'fail'
          });
      }
      return res
        .json({
          status: 'success'
        });
    })
    .catch(error => next(error));
};

exports.emailcheck = (req, res, next) => {
  User.findByEmail(req.body.email)
    .then((foundEmail) => {
      if (foundEmail) {
        return res
          .json({
            error: 'This email is already in use.',
            status: 'fail'
          });
      }
      return res
        .json({
          status: 'success'
        });
    })
    .catch(error => next(error));
};
