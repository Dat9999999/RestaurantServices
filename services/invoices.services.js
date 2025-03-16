const pool = require('../config/db')


const createInvoices = async (amount, orderId, userId) =>
{
    const [res] = await pool.execute(`INSERT INTO invoices(amount, orderid, userId) VALUES(?, ?, ?)`, [amount, orderId, userId])
    return res;

}
const showInvoicesByTime = async (day, month, year) =>
{
    let query = `SELECT * FROM invoices WHERE `;
    let params = [];

    if (year)
    {
        query += `YEAR(createAt) = ? `;
        params.push(year);
    }

    if (month)
    {
        query += `${year ? 'AND ' : ''}MONTH(createAt) = ? `;
        params.push(month);
    }

    if (day)
    {
        query += `${year || month ? 'AND ' : ''}DAY(createAt) = ? `;
        params.push(day);
    }

    if (!year && !month && !day)
    {
        query = `SELECT * FROM invoices`; // Get all invoices if no date filter is provided
    }
    const [rows] = await pool.execute(query, params)
    return rows.length > 0 ? rows : null;
}

const showInvoicesDetails = async (id) =>
{
    // Fetch orderID from invoices
    const [orderResult] = await pool.execute(
        "SELECT orderid FROM invoices WHERE id = ?",
        [id]
    );

    // Check if an orderID exists
    if (orderResult.length === 0)
    {
        return null; // No invoice found
    }

    const orderID = orderResult[0].orderid; // Extract orderID

    // Fetch order details
    const sql = `
        SELECT d.name, d.price, od.quantity 
        FROM orderDetails AS od 
        JOIN dishes AS d ON od.dishId = d.id 
        WHERE od.orderID = ?`;

    const [rows] = await pool.execute(sql, [orderID]);

    return rows.length > 0 ? rows : null;
}
const getInvoicesInShift = async (shiftTime) =>
{
    const today = new Date().toISOString().split("T")[0];
    const [rows] = await pool.execute("SELECT * FROM invoices WHERE TIME(createAt) = ? AND TIME(createAt) BETWEEN ? AND ?",
        [today, shiftTime.start, shiftTime.end])
    return rows.length > 0 ? rows : null;
}

module.exports = {
    createInvoices,
    showInvoicesByTime,
    showInvoicesDetails,
    getInvoicesInShift
}