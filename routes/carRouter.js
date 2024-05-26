const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.get("/", (req, res) => {
  carController.getCars(req, res);
});
router.get("/search", (req, res) => {
  carController.searchCar(req, res);
});

router.post("/create-table", (req, res) => {
  carController.createTable(req, res);
});

router.post("/create", (req, res) => {
  carController.createCar(req, res);
});

router.get("/:id", (req, res) => {
  carController.getCarById(req, res);
});

router.delete("/:id", (req, res) => {
  carController.deleteCar(req, res);
});

module.exports = router;
