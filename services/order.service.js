const pool = require('../config/db')

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

module.exports = {
    createOrder,
    createOrderDetails
}