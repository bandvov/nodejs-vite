const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  userController.getUsers(req, res);
});
router.get("/search", (req, res) => {
  userController.searchUser(req, res);
});

router.post("/register", (req, res) => {
  userController.createUser(req, res);
});
router.get("/profile", (req, res) => {
  console.log(req);
  res.json(req); // Send user data to the client
});

router.get("/:id", (req, res) => {
  userController.getUserById(req, res);
});

router.patch("/:id", (req, res) => {
  userController.updateUser(req, res);
});

router.delete("/:id", (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = router;
