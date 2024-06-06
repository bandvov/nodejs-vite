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
require("dotenv").config();

// Enable all CORS requests
app.use(
  cors({
    origin: process.env.ORIGIN || "*", // Replace with the URL of your React app
    credentials: true,
        exposedHeaders: ["set-cookie"],
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
    store: new (require('express-session').MemoryStore)(),
    
  })
);

app.use("/api/cars", carRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use(passport.initialize());
app.use(passport.session());

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, "frontend/build")));

// // Handles any requests that don't match the ones above
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
// });

// Start the serverconst PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
