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

const updateOrder = async (req, res) =>
{
    try
    {
        const orderID = req.params.id
        const { notes, orderDetails } = req.body
        await orderService.updateNotes(orderID, notes)


        await orderService.updateOrderDetails(orderDetails)
        res.status(200).json({ "success": true, "message": "Sửa đơn hàng thành công" })

    }
    catch (err)
    {
        console.log(err)
        res.status(400).json({ "success": false, "message": "Sửa đơn hàng thất bại" })

    }

}


module.exports = {
    createOrder,
    updateOrder
}