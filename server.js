const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const cors = require("cors");
const carRouter = require("./routes/carRouter");
const userRouter = require("./routes/userRouter");

// Enable all CORS requests
app.use(cors());

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cars", carRouter);
app.use("/users", userRouter);

// Start the serverconst PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
