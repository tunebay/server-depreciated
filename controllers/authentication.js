const User = require('../models/user');

exports.signup = (req, res, next) => {
  const user = new User(req.body);

  User.findByUsername(req.body.username)
    .then((foundUser) => {
      if (foundUser) {
        return res.status(422)
          .json({
            error: `The username ${user.username} is not available.`
          });
      }
      return User.findByEmail(req.body.email)
        .then((data) => {
          if (data) {
            return res.status(422)
              .json({
                error: 'This email is already in use.'
              });
          }
          return user.save()
            .then((result) => {
              res.status(200)
                .json({
                  status: 'success',
                  message: `Successfully created ${result.rowCount} user.`
                });
            });
        });
    })
    .catch((error) => {
      console.log('*** SIGNUP ERROR **** ', error);
      return next(error);
    });
};
