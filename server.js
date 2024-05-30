const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const carRouter = require("./routes/carRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const session = require("express-session");
const passport = require("./passport");
const cookieParser = require("cookie-parser");

// Enable all CORS requests
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the URL of your React app
    credentials: true,
  })
);
const PORT = process.env.PORT || 4000;

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
app.use("/auth", authRouter);

app.use(passport.initialize());
app.use(passport.session());


// Serve static files from the React app
app.use(express.static("/frontend/build"));


// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile("./frontend/build/index.html");
});

// Start the serverconst PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
