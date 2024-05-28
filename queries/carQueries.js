const createCarQuery =
  "INSERT INTO cars (user_id, make, model, year, type, color, category, price_per_hour, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

const getAllCarsQuery = `
SELECT c.*, JSON_ARRAYAGG(f.user_id) as favorite_user_ids
FROM cars c
LEFT JOIN favorites f
ON c.id = f.car_id
GROUP BY c.id;

`;

const getCarByIdQuery = "SELECT * FROM cars WHERE id = ?;";
const deleteCarQuery = "DELETE FROM cars WHERE id = ?;";
const carSearchQuery = `
SELECT id, make, model, image, year, price_per_hour, type, color, category
FROM cars
WHERE LOWER(color) LIKE ? 
OR LOWER(make) LIKE ? 
OR LOWER(model) LIKE ?`;

async function saveFavoriteCarQuery(userId, carId) {
  await pool.query("INSERT INTO favorites (user_id, car_id) VALUES (?, ?)", [
    userId,
    carId,
  ]);
}
module.exports = {
  createCarQuery,
  getAllCarsQuery,
  getCarByIdQuery,
  deleteCarQuery,
  carSearchQuery,
  saveFavoriteCarQuery,
};
