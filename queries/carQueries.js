const createTableQuery = `
CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    type_id INT,
    color_id INT,
    category_id INT,
    price_per_hour DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (type_id) REFERENCES types(id),
    FOREIGN KEY (color_id) REFERENCES colors(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);`;
const createCarQuery =
  "INSERT INTO cars (user_id, make, model, year, type_id, color_id, category_id, price_per_hour) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
const getAllCarsQuery = `
SELECT cars.id, cars.make,cars.model,cars.image, cars.year,cars.price_per_hour, types.type_name as type, colors.color_name as color, categories.category_name as category
FROM cars
JOIN types ON cars.type_id = types.id
JOIN colors ON cars.color_id = colors.id
JOIN categories ON cars.category_id = categories.id;`;

const getCarByIdQuery = "SELECT * FROM cars WHERE id = ?;";
const deleteCarQuery = "DELETE FROM cars WHERE id = ?;";

module.exports = {
  createTableQuery,
  createCarQuery,
  getAllCarsQuery,
  getCarByIdQuery,
  deleteCarQuery,
};
