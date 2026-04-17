const mysql = require('mysql2/promise');

let instance = null;

async function getConnection() {
    if (!instance) {
        instance = await mysql.createConnection({
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        });
    }

    return instance;
}

module.exports = { getConnection };