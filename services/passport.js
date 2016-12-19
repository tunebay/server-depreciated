const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const config = require('../config');

// Create LocalStrategy
const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findByEmail(email)
    .then((userRecord) => {
      if (!userRecord) { return done(null, false); }

      return User.comparePasswords(password, userRecord.password_hash)
        .then((isMatch) => {
          if (!isMatch) { return done(null, false); }

          return done(null, userRecord);
        });
    })
    .catch(error => done(error));
});

// return User.comparePasswords(password, (err, isMatch) => {
//   if (err) { return done(err); }
//   if (!isMatch) { return done(null, false); }
//
//   return done(null, userRecord);
// });

// set up options for Jwt Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwtSecret
};

// Create jwt Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
    .then((user) => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(error => done(error, false));
});

// Tell passport to use strategies
passport.use(jwtLogin);
passport.use(localLogin);
