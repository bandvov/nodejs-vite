const {
  getAllUsersQuery,
  getUserByIdQuery,
  userSearchQuery,
  createUserQuery,
} = require("../queries/userQueries");
const db = require("../database/database");
const { constructUpdateQuery } = require("../utils");
const bcrypt = require("bcrypt");

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
  searchUser(data, callback) {
    this.db.query(userSearchQuery, data, callback);
  }

  async createUser(
    { email, first_name, last_name, phone_number, login, image, password },
    callback
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.db.query(
      createUserQuery,
      [email, first_name, last_name, phone_number, login, image, hashedPassword],
      callback
    );
  }
}

// Create service instance
module.exports = new UserService(db);
