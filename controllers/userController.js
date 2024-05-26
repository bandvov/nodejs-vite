const userService = require("../services/userService");

class UserController {
  constructor(service) {
    this.service = service;
  }
  async getUsers(req, res) {
    this.service.getAllUsers((err, results) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    });
  }
  async getUserById(req, res) {
    this.service.getUserById(req.params.id, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(result[0]);
    });
  }
  // createTable(req, res) {
  //   this.service.createTable((err, results) => {
  //     if (err) {
  //       res.status(500).json({ error: "Internal Server Error" });
  //       return;
  //     }
  //     return res.json(results);
  //   });
  // }
  // createCar(req, res) {
  //   const { car } = req.body;

  //   this.service.createCar(car, (err, results) => {
  //     if (err) {
  //       res.status(500).json({ error: "Internal Server Error" });
  //       return;
  //     }
  //     return res.json(results);
  //   });
  // }
  // deleteCar(req, res) {
  //   const { id } = req.params;
  //   this.service.deleteCar(id, (err, results) => {
  //     if (err) {
  //       res.status(500).json({ error: "Internal Server Error" });
  //       return;
  //     }
  //     return res.json(results);
  //   });
  // }
  // searchCar(req, res) {
  //   const { search } = req.query;
  //   const searchTerm = search.toLowerCase();
  //   this.service.searchCar(
  //     [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`],
  //     (err, results) => {
  //       if (err) {
  //         res.status(500).json({ error: "Internal Server Error" });
  //         return;
  //       }
  //       return res.json(results);
  //     }
  //   );
  // }
}
// Create controller instance
module.exports = new UserController(userService);
