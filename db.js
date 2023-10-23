const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

const db = connection;

module.exports = db;
