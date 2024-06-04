const passport = require("passport");
const userService = require("./services/userService");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcrypt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config();

passport.use(
  new LocalStrategy({ usernameField: "login" }, (login, password, done) => {
    userService.getUserByLogin(login, (err, result) => {
      console.log({ result });
      if (!result.rows.length) {
        return done(null, false, { message: "That email is not registered" });
      }

      bcrypt.compare(password, result.rows[0].password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, true, result.rows[0]);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      });
    });
  })
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log({ profile, accessToken });
      // Here, you can save the user to your database or perform any other actions.
      return done(null, { accessToken, profile });
    }
  )
);

// Configure Passport with Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (token, tokenSecret, profile, done) {
      // You can save the profile information in your database here
      return done(null, { token, profile });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports = passport;
