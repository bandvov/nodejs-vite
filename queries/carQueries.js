
const createCarQuery =
  "INSERT INTO cars (user_id, make, model, year, type, color, category, price_per_hour, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const getAllCarsQuery = `
SELECT id, make, model, image, year, price_per_hour, type, color, category FROM cars`;

const getCarByIdQuery = "SELECT * FROM cars WHERE id = ?;";
const deleteCarQuery = "DELETE FROM cars WHERE id = ?;";
const carSearchQuery = `
SELECT id, make, model, image, year, price_per_hour, type, color, category
FROM cars
WHERE LOWER(color) LIKE ? 
OR LOWER(make) LIKE ? 
OR LOWER(model) LIKE ?;`;

module.exports = {
  createCarQuery,
  getAllCarsQuery,
  getCarByIdQuery,
  deleteCarQuery,
  carSearchQuery,
};
