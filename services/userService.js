const {
  getAllUsersQuery,
  getUserByIdQuery,
  userSearchQuery,
  createUserQuery,
  getUserByLoginQuery,
  deleteUserQuery,
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
  getUserByLogin(email, callback) {
    return this.db.query(getUserByLoginQuery, [email], callback);
  }

  updateUser(id, data, callback) {
    const { query, values } = constructUpdateQuery("users", data, id);
    console.log({query});
    this.db.query(query, values, callback);
  }

  deleteUser(id, callback) {
    this.db.query(deleteUserQuery, [id], callback);
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
      [
        email,
        first_name,
        last_name,
        phone_number,
        login,
        image,
        hashedPassword,
      ],
      callback
    );
  }
}

// Create service instance
module.exports = new UserService(db);
