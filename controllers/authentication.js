const User = require('../models/user');

module.exports = {
  signup(req, res, next) {
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
                    message: 'Successfully created user.',
                    token: `${userRecord.id}`
                  });
              });
          });
      })
      .catch((error) => {
        console.log('*** SIGNUP ERROR **** ', error);
        return next(error);
      });
  }
};
