const pool = require('../config/db')


const createInvoices = async (amount, orderId, userId) =>
{
    const [res] = await pool.execute(`INSERT INTO invoices(amount, orderid, userId) VALUES(?, ?, ?)`, [amount, orderId, userId])
    return res;

}

module.exports = {
    createInvoices
}