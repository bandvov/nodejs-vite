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
        res.cookie("access_token", token, {
          domain: process.env.COOKIE_DOMAIN,
          httpOnly: true,
          secure: true,
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
    });

    res.redirect(process.env.REDIRECT_URL);
  }
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log(" google userData", req.session);
    res.cookie("exampleCookie", "cookieValue", {
      domain: process.env.COOKIE_DOMAIN,
      httpOnly: true,
      secure: true, // Ensure this is true if using HTTPS
    });
    // Set user profile information in a cookie
    res.cookie("user", JSON.stringify(req.session), {
      domain: process.env.COOKIE_DOMAIN,
      httpOnly: true,
      secure: true,
    });
    res.redirect(process.env.REDIRECT_URL);
  }
);
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Error destroying session");
    }
    res.clearCookie("connect.sid"); // Adjust the cookie name if it's different
    res.redirect("/"); // Redirect to the homepage or login page
  });
});

module.exports = router;
