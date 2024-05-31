const carService = require("../services/carService");
class CarController {
  constructor(service) {
    this.service = service;
  }
  async getCars(req, res) {
    this.service.getAllCars((err, results) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      res.json(results.rows);
    });
  }
  async getCarById(req, res) {
    this.service.getCarById(req.params.id, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      res.json(result.rows[0]);
    });
  }
  createCar(req, res) {
    this.service.createCar(req.body, (err, results) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      return res.json(results);
    });
  }
  deleteCar(req, res) {
    const { id } = req.params;
    this.service.deleteCar(id, (err, results) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      return res.json(results);
    });
  }
  searchCar(req, res) {
    this.service.searchCar(req.query, (err, results) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      return res.json(results.rows);
    });
  }
  favoriteCar(req, res) {
    this.service.addFavorite(req.query, (err, results) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      return res.json(results.rows);
    });
  }
}
// Add more controller methods here}

// Create controller instance
module.exports = new CarController(carService);
