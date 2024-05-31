const {
  getAllCarsQuery,
  createCarQuery,
  getCarByIdQuery,
  deleteCarQuery,
  toggleFavoriteQuery,
} = require("../queries/carQueries");
const db = require("../database/database");
const { constructCarSearchQuery } = require("../utils");

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
    const { query, params } = constructCarSearchQuery(data);
    this.db.query(query, params, callback);
  }
  toggleFavorite(data, callback) {
    this.db.query(toggleFavoriteQuery, [data.user_id, data.car_id], callback);
  }
  // Add more database operations here
}
// Create service instance
module.exports = new CarService(db);
