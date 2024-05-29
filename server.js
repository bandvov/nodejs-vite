const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const carRouter = require("./routes/carRouter");
const userRouter = require("./routes/userRouter");
const session = require("express-session");
const passport = require("./passport");
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");

// Enable all CORS requests
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the URL of your React app
    credentials: true,
  })
);
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/cars", carRouter);
app.use("/users", userRouter);

app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, "client/build")));

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    console.log({ user, info });
    if (!user) res.json({ success: false, message: info.message });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        // Generate the token
        var token = jwt.sign({ email: info.email }, "shhhhh");
        console.log({ token });
        res.cookie("access_token", token, { httpOnly: true, secure: true });

        res.cookie("user_id", info.id, {
          httpOnly: false,
          secure: false,
        });

        res.cookie("user_name", info.first_name + " " + info.last_name);

        res.json({
          success: true,
          id: 4,
          email: info.email,
          first_name: info.first_name,
          last_name: info.last_name,
        });
      });
    }
  })(req, res, next);
});

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("here", req.user);
    // Successful authentication, set a cookie and redirect home
    res.cookie("facebook_user_id", req.user.profile.id, {
      httpOnly: true,
      secure: false,
    });

    res.cookie("access_token", req.user.accessToken, {
      httpOnly: true,
      secure: false,
    });

    res.cookie("user_id", 1, {
      httpOnly: false,
      secure: false,
    });

    res.cookie("name", req.user.profile.displayName);

    res.redirect("http://localhost:3000");
  }
);

// // Handles any requests that don't match the ones above
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

// Start the serverconst PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
