var orderService = require('../services/order.service')
const createOrder = async (req, res) =>
{
    const reqOrder = req.body;
    // create orderDetails
    const orderDetails = reqOrder.orderDetails
    try
    {
        const orderID = await orderService.createOrder(reqOrder);
        const resultCreateOrderDetails = await orderService.createOrderDetails(orderID, orderDetails)

        return res.status(200).json({ "success": true, "message": "Tạo đơn hàng thành công", data: reqOrder })
    }
    catch (error)
    {
        console.log(error)
        return res.status(400).json({ "success": false, "message": "Lỗi tạo đơn hàng" })
    }
}

module.exports = {
    createOrder
}