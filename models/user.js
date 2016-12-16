const db = require('../database/config').db;
const sql = require('../database/config').sql;

const sqlCreateUser = sql('./queries/createUser.sql');

const create = (req, res, next) => {
  const { displayName, email, username, password } = req.body;
  const createdAt = Date.now();
  const active = true;
  console.log(password);

  db.result(sqlCreateUser, { displayName, username, email, createdAt, active })
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
