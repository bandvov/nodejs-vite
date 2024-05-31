const getAllUsersQuery = `
SELECT id, email, first_name, last_name, created_at, phone_number, image
FROM users WHERE blocked = false  AND deleted =  false `;
const createUserQuery =
  "INSERT INTO users (email, first_name, last_name, phone_number, login, image, password) VALUES (?, ?, ?, ?, ?, ?, ?)";

const getUserByIdQuery =
  "SELECT id, email, first_name, last_name, created_at, phone_number FROM users WHERE id = ?;";
const getUserByLoginQuery =
  "SELECT id, email, first_name, last_name, created_at, phone_number,password FROM users WHERE login = ?;";
const userSearchQuery = `
SELECT id, email, first_name, last_name, created_at, phone_number, image 
FROM users
WHERE LOWER(email) LIKE ? 
OR LOWER(first_name) LIKE ? 
OR LOWER(last_name) LIKE ?;`;

module.exports = {
  getAllUsersQuery,
  getUserByIdQuery,
  getUserByLoginQuery,
  userSearchQuery,
  createUserQuery,
};
