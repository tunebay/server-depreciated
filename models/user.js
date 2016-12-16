const path = require('path');
const db = require('../database/config');

const sql = (file) => {
  return new db.QueryFile(path.join(__dirname, file), { minify: true });
};

const sqlCreateUser = sql('./SQL/createUser.sql');

const create = (req, res, next) => {
  const { displayName, email, username, rawPassword } = req.body;
  const createdAt = Date.now();
  const active = true;

  db.result(sqlCreateUser, { displayName, email, username, createdAt, active })
    .then((result) => {
      console.log('User created: ', result);
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

module.exports = {
  create
};
