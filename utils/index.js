// utils.js
function constructUpdateQuery(table, updates, id) {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  if (fields.length === 0) {
    throw new Error('No fields to update.');
  }

  values.push(id);

  const query = `
    UPDATE ${table}
    SET ${fields.join(', ')}
    WHERE id = ?
  `;

  return { query, values };
}

module.exports = { constructUpdateQuery };
