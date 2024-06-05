const getAllUsersQuery = `
SELECT id, email, first_name, last_name, created_at, phone_number, image
FROM users WHERE blocked = false  AND deleted =  false `;
const createUserQuery =
  "INSERT INTO users (email, first_name, last_name, phone_number, login, image, password) VALUES ($1, $2, $3, $4, $5, $6, $7)";

const getUserByIdQuery =
  "SELECT id, email, first_name, last_name, created_at, phone_number FROM users WHERE id = $1;";
const getUserByLoginQuery =
  "SELECT id, email, first_name, last_name, created_at, phone_number,password, image FROM users WHERE login = $1;";
const userSearchQuery = `
SELECT id, email, first_name, last_name, created_at, phone_number, image 
FROM users
WHERE LOWER(email) LIKE  $1
OR LOWER(first_name) LIKE $2 
OR LOWER(last_name) LIKE $3;`;
module.exports = {
  getAllUsersQuery,
  getUserByIdQuery,
  getUserByLoginQuery,
  userSearchQuery,
  createUserQuery,
};
