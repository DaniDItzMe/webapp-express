const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "movies_db"
})

module.exports = connection;