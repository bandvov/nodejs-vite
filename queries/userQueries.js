const getAllUsersQuery = `
SELECT id, email, first_name, last_name, created_at, phone_number FROM users;`;

module.exports = { getAllUsersQuery };
