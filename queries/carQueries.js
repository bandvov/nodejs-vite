const createCarQuery =
  "INSERT INTO cars (user_id, make, model, year, type, color, category, price_per_hour, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

const getAllCarsQuery = `
SELECT c.*, JSON_ARRAYAGG(f.user_id) as favorite_user_ids
FROM cars c
LEFT JOIN favorites f
ON c.id = f.car_id
GROUP BY c.id;

`;

const getCarByIdQuery = "SELECT * FROM cars WHERE id = $1;";
const deleteCarQuery = "DELETE FROM cars WHERE id = $1;";
const carSearchQuery = `
SELECT id, make, model, image, year, price_per_hour, type, color, category
FROM cars
WHERE LOWER(color) LIKE $1 
OR LOWER(make) LIKE $2 
OR LOWER(model) LIKE $3`;

const toggleFavoriteQuery = `BEGIN;

DELETE FROM favorites
WHERE user_id = $1 AND car_id = $2;

IF FOUND THEN
    COMMIT;
ELSE
    INSERT INTO favorites (user_id, car_id)
    VALUES ($1, $2);
    COMMIT;
END IF;

END;
`;
module.exports = {
  createCarQuery,
  getAllCarsQuery,
  getCarByIdQuery,
  deleteCarQuery,
  carSearchQuery,
  toggleFavoriteQuery,
};
