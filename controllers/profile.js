const User = require('../models/user');

exports.loadUser = (req, res, next) => {
  return User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404)
          .json({ error: 'Could not find user' });
      }
      return res.status(200)
        .json({
          message: 'Loaded user successfully',
          status: 'success',
          data
        });
    })
    .catch(error => next(error));
};
