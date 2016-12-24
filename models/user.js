const bcrypt = require('bcrypt-nodejs');

const { getCurrentTimestamp } = require('../services/helpers');
const { db, sql } = require('../database/config');

const sqlCreateUser = sql('./queries/createUser.sql');
const sqlFindUserByEmail = sql('./queries/findUserByEmail.sql');
const sqlFindUserByUsername = sql('./queries/findUserByUsername.sql');
const sqlFindUserById = sql('./queries/findUserById.sql');
const sqlUpdateLastLogin = sql('./queries/updateLastLogin.sql');

const isEmail = (credential) => {
  if (credential.match(/@/)) return true;
  return false;
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

  static findByEmailOrUsername(credential) {
    return new Promise((resolve, reject) => {
      if (isEmail(credential)) {
        db.oneOrNone(sqlFindUserByEmail, credential)
        .then(data => resolve(data))
        .catch(error => reject(error));
      } else {
        db.oneOrNone(sqlFindUserByUsername, credential)
        .then(data => resolve(data))
        .catch(error => reject(error));
      }
    });
  }

  static comparePasswords(candidatePassword, passwordHash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, passwordHash, (error, isMatch) => {
        if (error) return reject(error);
        return resolve(isMatch);
      });
    });
  }

  static updateLastLogin(userRecord) {
    return new Promise((resolve, reject) => {
      db.one(sqlUpdateLastLogin, [getCurrentTimestamp(), true, userRecord.id])
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }
}

module.exports = User;
