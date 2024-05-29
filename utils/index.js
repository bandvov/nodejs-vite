const { carSearchQuery } = require("../queries/carQueries");
require("dotenv").config();

// utils.js
function constructUpdateQuery(table, updates, id) {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update.");
  }
  if (id) {
    values.push(id);
  }

  let query;
  if (id) {
    query = `
    UPDATE ${table}
    SET ${fields.join(", ")}
    WHERE id = ?
    `;
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
  let params;

  if (search) {
    query = carSearchQuery;

    const searchPattern = `%${search}%`;
    params = [searchPattern, searchPattern, searchPattern];
  } else {
    query = "SELECT * FROM cars WHERE 1=1";

    if (make) query += ` AND make = '${make}'`;
    if (color) query += ` AND color = '${color}'`;
    if (category) query += ` AND category = '${category}'`;

    params = [];
  }
  console.log({ query, params });
  return { query, params };
}
module.exports = { constructUpdateQuery, constructCarSearchQuery };
