const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const config = require('../config');

// Create LocalStrategy
const localOptions = {
  usernameField: 'emailOrUsername'
};

const localLogin = new LocalStrategy(localOptions, (emailOrUsername, password, done) => {
  User.findByEmailOrUsername(emailOrUsername)
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

// set up options for Jwt Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwtSecret
};

// Create jwt Strategy
// This is what requireAuth from router uses to verify token
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
