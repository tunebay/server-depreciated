const User = require('../models/user');

exports.loadUser = (req, res, next) => {
  console.log(req.params.username);
  return User.findByUsername(req.params.username)
    .then((user) => {
      if (!user) {
        return res.status(404)
          .json({ error: 'Could not find user' });
      }
      return res.status(200)
        .json(user);
    })
    .catch(error => next(error));
};
