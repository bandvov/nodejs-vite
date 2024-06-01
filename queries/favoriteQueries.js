const addFavoriteQuery = `INSERT INTO favorites (user_id, car_id) VALUES (CAST($1 AS INT), CAST($2 AS INT))`;
const deleteFavoriteQuery = `DELETE FROM favorites WHERE user_id = $1 AND car_id= $2`;

module.exports = {
  addFavoriteQuery,
  deleteFavoriteQuery,
};
