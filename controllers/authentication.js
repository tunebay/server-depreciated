const User = require('../models/user');

exports.signup = (req, res, next) => {
  const user = new User(req.body);
  user.save()
    .then((result) => {
      console.log('IN SIGNUP POST SAVE', user);
      console.log(result);
    });
};

// .then(() => {
//   user.save()
//     .then((result) => {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: `Successfully created ${result.rowCount} user.`
//         });
//     })
//     .catch((error) => {
//       return next(error);
//     });
// });
