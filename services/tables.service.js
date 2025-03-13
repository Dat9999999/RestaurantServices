const pool = require('../config/db')

const getAll = async () =>
{
    const [rows] = await pool.execute('SELECT id, seats, status FROM tables')
    return rows.length > 0 ? rows : null
}
const showOrder = async (id) =>
{
    const [rows] = await pool.execute('SELECT orderID, notes FROM orders WHERE tableid =? AND status = "pending" ', [id])
    return rows.length > 0 ? rows[0] : null; // Return the first row or null if no results
}

module.exports = {
    getAll,
    showOrder
}