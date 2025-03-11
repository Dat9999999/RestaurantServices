
var dishService = require('../services/dishes.service')

const getAll = async (req, res) =>
{
    try
    {
        const { page, limit } = req.query
        const data = await dishService.getAll(page, limit)
        return res.status(200).json({ "success": true, data })
    } catch (error)
    {
        console.log(error)
        return res.status(400).json({ "success": false, "message": "Lỗi lấy thực đơn" })
    }
}
module.exports = {
    getAll
}