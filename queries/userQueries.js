const getAllUsersQuery = `
SELECT id, email, first_name, last_name, created_at, phone_number, image FROM users
WHERE blocked = 0
   AND deleted = 0;`;
const getUserByIdQuery =
  "SELECT id, email, first_name, last_name, created_at, phone_number FROM users WHERE id = ?;";
const getUserByEmailQuery =
  "SELECT id, email, first_name, last_name, created_at, phone_number,password FROM users WHERE email = ?;";
const userSearchQuery = `
SELECT id, email, first_name, last_name, created_at, phone_number, image 
FROM users
WHERE LOWER(email) LIKE ? 
OR LOWER(first_name) LIKE ? 
OR LOWER(last_name) LIKE ?;`;

module.exports = {
  getAllUsersQuery,
  getUserByIdQuery,
  getUserByEmailQuery,
  userSearchQuery,
};
