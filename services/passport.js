const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;
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

const facebookLogin = new FacebookStrategy({
  clientID: config.FACEBOOK_APP_ID,
  clientSecret: config.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback/'
},
  (accessToken, refreshToken, profile, cb) => {
    console.log('************IN STRATEGY*************');
    console.log(cb);
    console.log(profile);
    // User.findOrCreate({ facebookId: profile.id }, (err, user) => {
    //   return cb(err, user);
    // });
  }
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Tell passport to use strategies
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(facebookLogin);
