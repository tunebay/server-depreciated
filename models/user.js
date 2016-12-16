const db = require('../database/config').db;
const sql = require('../database/config').sql;
const moment = require('moment');

const sqlCreateUser = sql('./queries/createUser.sql');

const create = (req, res, next) => {
  const { displayName, email, username, password, accountType } = req.body;
  const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  const active = true;

  db.result(sqlCreateUser, { displayName, username, email, createdAt, active, accountType })
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: `Successfully created ${result.rowCount} user.`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = {
  create
};
