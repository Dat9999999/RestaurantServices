const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,  // Số lượng kết nối tối đa
    queueLimit: 0
});

(async () => {
    console.log("Kết nối db")
    try {
        const conn = await pool.getConnection();
        console.log("Connect successfully");
        conn.release();
    }
    catch (err) {
        console.error('MySQL connection failed:', err.message)
    }
}
)();

module.exports = pool;
