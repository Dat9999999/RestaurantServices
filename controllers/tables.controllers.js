var tableService = require('../services/tables.service')
var orderService = require('../services/order.service')

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
const showOrder = async (req, res) =>
{
    try
    {
        const id = req.params.id

        const { orderID, notes } = await tableService.showOrder(id)

        const orderDetails = await orderService.getOrderDetails(orderID)
        const amount = await orderService.getTotalAmount(orderID)
        res.status(200).json({
            "success": true, "message": "Lấy chi tiết đơn hàng thành công",
            "data": { orderDetails, notes, amount }
        })
    } catch (error)
    {
        res.status(400).json({
            "success": false, "message": "Lấy chi tiết đơn hàng thất bại"
        })
    }


}
module.exports = {
    showList,
    showOrder
}