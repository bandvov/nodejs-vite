const { getAllCarsQuery, createTableQuery, createCarQuery, getCarByIdQuery } = require("../queries/carQueries");

class CarService {
  constructor(db) {
    this.db = db;
  }
  getAllCars(callback) {
    return this.db.query(getAllCarsQuery, [], callback);
  }
  getCarById(id, callback) {
    return this.db.query(getCarByIdQuery, [id], callback);
  }
  createTable(callback) {
    this.db.query(createTableQuery, [], callback)
  }
  createCar(data,callback) {
    this.db.query(createCarQuery, data, callback)
  }
  
  // Add more database operations here
}
module.exports = CarService;
