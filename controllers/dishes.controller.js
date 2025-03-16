
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
const changeDishStatus = async (req, res) =>
{
    try
    {
        const id = req.params.id;
        await dishService.changeDishStatus(id)
        res.status(200).json({ "success": true, "message": "Thay đổi trạng thái món ăn thành công" })
    } catch (error)
    {
        console.log(error)
        res.status(400).json({ "success": false, "message": "Có lỗi hoặc không tồn tại món này" })
    }
}
module.exports = {
    getAll,
    changeDishStatus
}