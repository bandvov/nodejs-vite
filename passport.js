const passport = require("passport");
const userService = require("./services/userService");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcrypt");

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
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log({ profile, accessToken });
      // Here, you can save the user to your database or perform any other actions.
      return done(null, { accessToken, profile });
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
