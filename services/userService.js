const { getAllUsersQuery, getUserByIdQuery } = require("../queries/userQueries");
const db = require("../database/database");

class UserService {
  constructor(db) {
    this.db = db;
  }
  getAllUsers(callback) {
    return this.db.query(getAllUsersQuery, [], callback);
  }
  getUserById(id, callback) {
    return this.db.query(getUserByIdQuery, [id], callback);
  }
  // createTable(callback) {
  //   this.db.query(createTableQuery, [], callback);
  // }
  // createCar(car, callback) {
  //   this.db.query(
  //     createCarQuery,
  //     [
  //       car.user_id,
  //       car.make,
  //       car.model,
  //       car.year,
  //       car.type_id,
  //       car.color_id,
  //       car.category_id,
  //       car.price_per_hour,
  //     ],
  //     callback
  //   );
  // }
  // deleteCar(id, callback) {
  //   this.db.query(deleteCarQuery, [id], callback);
  // }
  // searchCar(data, callback) {
  //   console.log({data});
  //   this.db.query(carSearchQuery, data, callback);
  // }

  // Add more database operations here
}
// Create service instance
module.exports = new UserService(db);
