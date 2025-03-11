const pool = require('../config/db')


const getAll = async () =>
{
    const [rows] = await pool.execute('SELECT id, seats, status FROM tables')
    return rows.length > 0 ? rows : null
}
module.exports = {
    getAll
}