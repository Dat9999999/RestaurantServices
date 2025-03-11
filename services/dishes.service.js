const pool = require('../config/db')

const getAll = async (reqPage, reqLimit) =>
{
    try
    {
        let page = parseInt(reqPage) || 1
        let limit = parseInt(reqLimit) || 12
        const offset = (page - 1) * limit

        // Lấy danh sách món ăn có phân trang
        // const [rows] = await pool.execute(`SELECT id, name, price, isAvailable, category, img FROM dishes LIMIT ? OFFSET ?`, [limit, offset]);
        const [rows] = await pool.execute(`SELECT id, name, price, isAvailable, category, img FROM dishes `);

        // Lấy tổng số món ăn để tính tổng số trang
        // const [countRows] = await pool.execute(`SELECT COUNT(*) as total FROM dishes`);
        // const totalItems = countRows[0].total;
        // const totalPages = Math.ceil(totalItems / limit);
        // const res =
        // {
        //     success: true,
        //     data: rows,
        //     pagination: {
        //         currentPage: page,
        //         totalPages: totalPages,
        //         totalItems: totalItems,
        //         perPage: limit
        //     }
        // };
        return rows.length > 0 ? rows : null
    } catch (error)
    {
        console.error(error);
        throw new Error("Lỗi lấy thực đơn");
    }
}

module.exports = {
    getAll
}