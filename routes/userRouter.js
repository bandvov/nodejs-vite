const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  userController.getUsers(req, res);
});
// router.get("/search", (req, res) => {
//   carController.searchCar(req, res);
// });

// router.post("/create-table", (req, res) => {
//   carController.createTable(req, res);
// });

// router.post("/create", (req, res) => {
//   carController.createCar(req, res);
// });

router.get("/:id", (req, res) => {
  userController.getUserById(req, res);
});

router.delete("/:id", (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = router;
