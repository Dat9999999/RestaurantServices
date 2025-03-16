const pool = require('../config/db');

const createOrder = async (reqOrder) =>
{
    const { tableId, userId, notes } = reqOrder
    const [result] = await pool.execute('INSERT INTO orders(tableid, userID, notes) VALUES (?, ?, ?)',
        [tableId, userId, notes])
    return result.insertId;
}
const createOrderDetails = async (orderID, orderDetails) =>
{
    // Chuẩn bị câu SQL INSERT
    const values = orderDetails.map(item => [orderID, item.dishId, item.quantity]);
    const sql = "INSERT INTO orderDetails (orderID, dishId, quantity) VALUES ?";

    // Thực hiện chèn dữ liệu hàng loạt
    await pool.query(sql, [values]);
}
const updateNotes = async (orderId, notes) =>
{
    await pool.execute(`UPDATE orders SET notes =? WHERE orderID =?`,
        [notes, orderId])
}
const updateOrderDetails = async (reqOrderDetails) =>
{
    const promises = reqOrderDetails.map(item =>
    {
        const sql = "UPDATE orderDetails SET dishId = ?, quantity = ? WHERE id = ?";
        return pool.query(sql, [item.dishId, item.quantity, item.id]);
    });
    await Promise.all(promises);
}
const getOrderDetails = async (orderId) =>
{
    const [rows] = await pool.execute('SELECT * FROM orderDetails WHERE orderID = ?', [orderId]);
    return rows.length > 0 ? rows : null;
}
const getOrderDetailv2 = async (orderId) =>
{
    const [rows] = await pool.execute('SELECT dishId, quantity FROM orderDetails WHERE orderID = ?', [orderId]);
    return rows.length > 0 ? rows : null;
}
const canceledOrder = async (orderId) =>
{
    const sql = `UPDATE orders SET status = "canceled" WHERE orderID = ?`;
    await pool.query(sql, [orderId]);
}
const getTotalAmount = async (id) =>
{
    const [row] = await pool.execute('SELECT SUM(od.quantity * d.price) AS amount FROM VNRestaurantDB.orderDetails od JOIN VNRestaurantDB.dishes d ON od.dishId = d.id WHERE od.orderID = ?',
        [id]
    )
    return row.length > 0 ? row[0] : null;
}

const completeOrder = async (id) =>
{
    await pool.execute(`UPDATE orders SET status = "complete" WHERE orderID =?`, [id])
    console.log("Chuyển đổi trạng thái đơn hàng sang -> hoàn thành")
}

const getOrderById = async (id) =>
{
    const [row] = await pool.execute(`SELECT * FROM orders WHERE orderID = ?`, [id])
    return row.length > 0 ? row[0] : null;
}

const getPendingOrders = async () =>
{
    const [rows] = await pool.execute("SELECT * FROM orders WHERE status= 'pending'")
    return rows.length > 0 ? rows : null
}

const orderPrepared = async (id) =>
{
    await pool.execute("UPDATE orders SET status = 'prepared' WHERE orderID =?", [id])
}
module.exports = {
    createOrder,
    createOrderDetails,
    updateNotes,
    updateOrderDetails,
    getOrderDetails,
    canceledOrder,
    getTotalAmount,
    getOrderDetailv2,
    completeOrder,
    getOrderById,
    getPendingOrders,
    orderPrepared
}