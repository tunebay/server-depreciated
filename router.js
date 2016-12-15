const db = require('./database/config');

const mali = {
  display_name: 'Mali Michael',
  username: 'malimichael',
  email: 'malimccalla@gmail.com',
  account_type: 'artist',
  created_at: '2012-06-22 05:40:06',
  active: true
};

module.exports = (app) => {
  app.get('/', (req, res, next) => {
    db.none(
      'INSERT INTO users(display_name, username, email, account_type,created_at, active) VALUES ($<display_name>, $<username>, $<email>, $<account_type>, $<created_at>,$<active>)',
    mali)
      .then(() => {
        res.status(200)
          .json({
            status: 'success',
            message: 'User added'
          });
      })
      .catch((err) => {
        return next(err);
      });
  });
};
