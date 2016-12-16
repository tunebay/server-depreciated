const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
const db = require('../database/config').db;
const sql = require('../database/config').sql;

const sqlCreateUser = sql('./queries/createUser.sql');

const create = (req, res, next) => {
  const { displayName, email, username, password, accountType } = req.body;
  const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  const active = true;

  const user = {
    displayName,
    username,
    email,
    password, // password is raw here. DO NOT SAVE
    accountType,
    active,
    createdAt
  };

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    return bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) { return next(error); }
      user.password = hash; // Hashes password here, safe to save.

      return db.result(sqlCreateUser, user)
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            message: `Successfully created ${result.rowCount} user.`
          });
      })
      .catch((responce) => {
        return next(responce);
      });
    });
  });
};

module.exports = {
  create
};
