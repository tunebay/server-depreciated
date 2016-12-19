const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

const db = require('../database/config').db;
const sql = require('../database/config').sql;

const sqlCreateUser = sql('./queries/createUser.sql');
const sqlFindUserByEmail = sql('./queries/findUserByEmail.sql');
const sqlFindUserByUsername = sql('./queries/findUserByUsername.sql');
const sqlFindUserById = sql('./queries/findUserById.sql');
const sqlUpdateLastLogin = sql('./queries/updateLastLogin.sql');

const getCurrentTimestamp = () => {
  return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
};

class User {
  constructor({ displayName, username, email, password, accountType }) {
    this.displayName = displayName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.active = true;
    this.accountType = accountType;
    this.lastLogin = null;
    this.createdAt = getCurrentTimestamp();
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.oneOrNone(sqlFindUserById, id)
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.oneOrNone(sqlFindUserByEmail, email)
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.oneOrNone(sqlFindUserByUsername, username)
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  save() {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, null, (err, hash) => {
          if (err) { reject(err); }

          this.password = hash;

          db.one(sqlCreateUser, this)
            .then(data => resolve(data))
            .catch(error => reject(error));
        });
      });
    });
  }

  static comparePasswords(candidatePassword, passwordHash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, passwordHash, (error, isMatch) => {
        if (error) { return reject(error); }
        console.log(isMatch);
        return resolve(isMatch);
      });
    });
  }

  static updateLastLogin(userRecord) {
    return new Promise((resolve, reject) => {
      db.result(sqlUpdateLastLogin, [getCurrentTimestamp(), true, userRecord.id])
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }
}

module.exports = User;
