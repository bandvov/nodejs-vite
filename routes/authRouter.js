const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const passport = require("../passport");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    console.log({ user, info });
    if (!user) res.json({ success: false, message: info.message });
    else {
      req.logIn(user, (err) => {
        if (err) res.json({ error: err });
        // Generate the token
        var token = jwt.sign({ email: info.email }, "shhhhh");
        console.log({ token });
        res.cookie("access_token", token, {
          domain: process.env.COOKIE_DOMAIN,
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
        res.json({
          success: true,
          id: info.id,
          email: info.email,
          first_name: info.first_name,
          last_name: info.last_name,
          image: info.image,
        });
      });
    }
  })(req, res, next);
});

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("here", req.user);
    // Successful authentication, set a cookie and redirect home
    res.cookie("access_token", req.user.accessToken, {
      httpOnly: true,
      secure: true,
      domain: process.env.COOKIE_DOMAIN,
      sameSite: "None",
    });

    res.redirect(process.env.REDIRECT_URL);
  }
);

module.exports = router;
