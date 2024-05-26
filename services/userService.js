const {
  getAllUsersQuery,
  getUserByIdQuery,
  userSearchQuery,
} = require("../queries/userQueries");
const db = require("../database/database");
const { constructUpdateQuery } = require("../utils");

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

  updateUser(id, data, callback) {
    const { query, values } = constructUpdateQuery("users", data, id);
    this.db.query(query, values, callback);
  }
  searchCar(data, callback) {
    this.db.query(userSearchQuery, data, callback);
  }

  // Add more database operations here
}
// Create service instance
module.exports = new UserService(db);
