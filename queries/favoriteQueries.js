export const addFavoriteQuery = `INSERT INTO favorites (user_id, car_id)`;
export const deleteFavoriteQuery = `DELETE FROM favorites WHERE user_id = $1 AND car_id= $2`;

module.exports = {
  addFavoriteQuery,
  deleteFavoriteQuery,
};
