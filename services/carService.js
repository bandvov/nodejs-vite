const {
  getAllCarsQuery,
  createTableQuery,
  createCarQuery,
  getCarByIdQuery,
  deleteCarQuery,
  carSearchQuery,
} = require("../queries/carQueries");
const db = require("../database/database");

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

  createCar(car, callback) {
    this.db.query(
      createCarQuery,
      [
        car.user_id,
        car.make,
        car.model,
        car.year,
        car.type,
        car.color,
        car.category,
        car.price_per_hour,
        car.image,
      ],
      callback
    );
  }
  deleteCar(id, callback) {
    this.db.query(deleteCarQuery, [id], callback);
  }
  searchCar(data, callback) {
    console.log({ data });
    this.db.query(carSearchQuery, data, callback);
  }

  // Add more database operations here
}
// Create service instance
module.exports = new CarService(db);
