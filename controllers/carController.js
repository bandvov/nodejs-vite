class CarController {
  constructor(service) {
    this.service = service;
  }
  async getCars(req, res) {
    this.service.getAllCars((err, results) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.render('cars',{cars: results})
    });
  }
  async getCarById(req, res) {
    this.service.getCarById(req.params.id,(err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
console.log({result});
    res.render('one_car',{car: result[0]})
    });
  }
  createTable(req, res) {
    this.service.createTable((err, results) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      return res.json(results);
    });
  }
  createCar(req, res) {
    const { car } = req.body;
   
    this.service.createCar(car, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      return res.json(results);
    });
  }
}
// Add more controller methods here}
module.exports = CarController;
