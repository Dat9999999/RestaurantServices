const pool = require('../config/db')

const getUserByUserName = async (username) => {
    const [rows] = await pool.execute('SELECT id, username, passwordHash, role FROM users WHERE username = ?', [username]);
    return rows.length > 0 ? rows[0] : null;
}

module.exports = {
    getUserByUserName
}

