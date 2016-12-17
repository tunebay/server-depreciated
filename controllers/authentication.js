const User = require('../models/user');

exports.signup = (req, res, next) => {
  const user = new User(req.body);
  const { email, username } = req.body;

  User.findByEmail(email)
    .then((data) => {
      if (data) {
        res.status(422)
          .json({
            error: 'This email is already in use.'
          });
      }
      user.save()
        .then((result) => {
          res.status(200)
            .json({
              status: 'success',
              message: `Successfully created ${result.rowCount} user.`
            });
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
