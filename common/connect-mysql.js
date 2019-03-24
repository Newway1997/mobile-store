const mysql = require("mysql");

const db = require("../settings/dbsetting");
const connection = mysql.createConnection(db);
connection.connect();

module.exports = connection;