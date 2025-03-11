var tableService = require('../services/tables.service')


const showList = async (req, res) =>
{
    try
    {
        const tables = await tableService.getAll()
        return res.status(200).json({ "success": true, tables })
    } catch (error)
    {
        return res.status(404).json({ "success": false, "message": "Lỗi lấy thực đơn" })
    }

}
module.exports = {
    showList
}