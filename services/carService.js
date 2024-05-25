const {
  getAllCarsQuery,
  createTableQuery,
  createCarQuery,
  getCarByIdQuery,
} = require("../queries/carQueries");

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
    this.db.query(createTableQuery, [], callback);
  }
  createCar(car, callback) {
    this.db.query(
      createCarQuery,
      [
        car.user_id,
        car.make,
        car.model,
        car.year,
        car.type_id,
        car.color_id,
        car.category_id,
        car.price_per_hour,
      ],
      callback
    );
  }

  // Add more database operations here
}
module.exports = CarService;
