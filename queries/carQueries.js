const createTableQuery = `
  CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL
  )
`;
const createCarQuery = "INSERT INTO cars (name, age) VALUES (?, ?)";
const getAllCarsQuery = "SELECT * FROM cars";
const getCarByIdQuery = "SELECT * FROM cars WHERE id = ?";

module.exports = {
  createTableQuery,
  createCarQuery,
  getAllCarsQuery,
  getCarByIdQuery,
};
