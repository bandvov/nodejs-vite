export const addFavoriteQuery = `BEGIN;

WITH deleted AS (
    DELETE FROM favorites
    WHERE user_id = $1 AND car_id = $2
    RETURNING *
)
INSERT INTO favorites (user_id, car_id)
SELECT $1, $2
WHERE NOT EXISTS (SELECT 1 FROM deleted);

COMMIT`;
