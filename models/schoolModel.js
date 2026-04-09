const db = require("../config/db");

const insertSchool = async ({ name, address, latitude, longitude }) => {
  const [result] = await db.execute(
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
    [name, address, latitude, longitude]
  );
  return result.insertId;
};

const fetchAllSchools = async () => {
  const [rows] = await db.execute(
    "SELECT id, name, address, latitude, longitude FROM schools"
  );
  return rows;
};

module.exports = { insertSchool, fetchAllSchools };
