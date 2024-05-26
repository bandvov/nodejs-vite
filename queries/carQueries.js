const createTableQuery = `
CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    color VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    price_per_hour DECIMAL(10, 2),
    image VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);`;
const createCarQuery =
  "INSERT INTO cars (user_id, make, model, year, type, color, category, price_per_hour) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
const getAllCarsQuery = `
SELECT id, cars.make,cars.model, image, year, price_per_hour, type, color, category FROM cars`;

const getCarByIdQuery = "SELECT * FROM cars WHERE id = ?;";
const deleteCarQuery = "DELETE FROM cars WHERE id = ?;";
const carSearchQuery = `
SELECT id, make, model, image, year, price_per_hour, type, color, category
FROM cars
WHERE LOWER(color) LIKE ? 
OR LOWER(make) LIKE ? 
OR LOWER(model) LIKE ?;`;

module.exports = {
  createTableQuery,
  createCarQuery,
  getAllCarsQuery,
  getCarByIdQuery,
  deleteCarQuery,
  carSearchQuery,
};
