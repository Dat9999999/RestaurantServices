var orderService = require('../services/order.service')
var invoicesService = require('../services/invoices.services')
const createOrder = async (req, res) =>
{
    const reqOrder = req.body;
    // create orderDetails
    const orderDetails = reqOrder.orderDetails
    try
    {
        const orderID = await orderService.createOrder(reqOrder);
        await orderService.createOrderDetails(orderID, orderDetails)

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

const completeOrder = async (req, res) =>
{
    try
    {
        const orderid = req.params.id
        // Get list item 
        const listItem = await orderService.getOrderDetailv2(orderid)

        //Get dishId & quantity to calculate amount
        const { amount } = await orderService.getTotalAmount(orderid)

        //Get order by id
        const order = await orderService.getOrderById(orderid)

        //Set status of order to completed
        await orderService.completeOrder(orderid)

        //create an invoices 
        await invoicesService.createInvoices(amount, orderid, order.userID)

        const invoices = {
            orderid,
            listItem,
            amount,
            createAt: Date.now
        }

        return res.status(200).json({ "success": true, "message": "Kết thúc đơn hàng thành công", invoices })
    } catch (error)
    {
        console.log(error)
        return res.status(400).json({ "success": false, "message": "Kết thúc đơn hàng thất bại" })
    }

}
const canceledOrder = async (req, res) =>
{
    try
    {
        const orderid = req.params.id
        await orderService.canceledOrder(orderid)
        return res.status(200).json({ "success": true, "message": "Hủy đơn hàng thành công" })
    } catch (error)
    {
        console.log(error)
        return res.status(400).json({ "success": false, "message": "Hủy đơn hàng thất bại" })
    }
}
module.exports = {
    createOrder,
    updateOrder,
    completeOrder,
    canceledOrder
}