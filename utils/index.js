const { carSearchQuery } = require("../queries/carQueries");
require("dotenv").config();

// utils.js
function constructUpdateQuery(table, updates, id) {
  const fields = [];
  const values = [];
  let paramIndex = 1;  // Start parameter index at 1 for SQL placeholders

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = $${paramIndex}`);
    values.push(value);
    paramIndex++;
  }

  if (fields.length === 0) {
    throw new Error("No fields to update.");
  }

  let query;
  if (id) {
    query = `
      UPDATE ${table}
      SET ${fields.join(", ")}
      WHERE id = $${paramIndex}
    `;
    values.push(id);
  } else {
    query = `
      UPDATE ${table}
      SET ${fields.join(", ")}
    `;
  }

  return { query, values };
}


function constructCarSearchQuery({ make, color, category, search }) {
  let query;
  let params = [];
  let paramIndex = 1;

  if (search) {
    query = `SELECT * FROM cars WHERE make ILIKE $${paramIndex} OR color ILIKE $${paramIndex + 1} OR category ILIKE $${paramIndex + 2}`;
    const searchPattern = `%${search}%`;
    params = [searchPattern, searchPattern, searchPattern];
  } else {
    query = "SELECT * FROM cars WHERE 1=1";

    if (make) {
      query += ` AND make = $${paramIndex}`;
      params.push(make);
      paramIndex++;
    }
    if (color) {
      query += ` AND color = $${paramIndex}`;
      params.push(color);
      paramIndex++;
    }
    if (category) {
      query += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }
  }

  console.log({ query, params });
  return { query, params };
}

module.exports = { constructUpdateQuery, constructCarSearchQuery };
