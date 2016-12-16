const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

const db = require('../database/config').db;
const sql = require('../database/config').sql;

const sqlCreateUser = sql('./queries/createUser.sql');

class User {
  constructor({ displayName, username, email, password, accountType }) {
    this.displayName = displayName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.active = true;
    this.accountType = accountType;
    this.lastLogin = null;
    this.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  }

  save() {
    return new Promise((resolve, reject) => {
      console.log('**** THIS *****', this);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, null, (error, hash) => {
          if (err) {
            console.log('Hashing password failed, see user.js', error);
            reject(error);
          } else {
            console.log('Hash sucessfull');
            resolve(hash);
          }
        });
      });
    });
  }
}

module.exports = User;

// return bcrypt.genSalt(10, (err, salt) => {
//   if (err) { console.log(err); }
//
//   return bcrypt.hash(this.password, salt, null, (error, hash) => {
//     if (error) { console.log(error); }
//     this.password = hash;
//     console.log('IN THE SAVE ', this);
//     console.log(db.result(sqlCreateUser, this));
//     return db.result(sqlCreateUser, this);
//   });
// });
