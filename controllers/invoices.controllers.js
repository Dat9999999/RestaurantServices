var invoicesService = require('../services/invoices.services')
const showInvoicesByTime = async (req, res) =>
{
    try
    {
        const { day, month, year } = req.query;
        const invoices = await invoicesService.showInvoicesByTime(day, month, year)
        res.status(200).json({ "success": true, "data": invoices })
    } catch (error)
    {
        console.log(error)
        res.status(400).json({ "success": false, "message": "Lấy hóa đơn thất bại" })
    }
}

const showInvoicesDetails = async (req, res) =>
{
    try
    {
        const id = req.params.id
        console.log(id)
        const listItem = await invoicesService.showInvoicesDetails(id)
        const amount = listItem.reduce((sum, item) => sum + parseFloat(item.price), 0);

        res.status(200).json({ "success": true, "data": listItem, amount })
    } catch (error)
    {
        console.log(error)
        res.status(400).json({ "success": false, "message": "Lấy chi tiết hóa đơn thất bại" })
    }
}
const showInvoicesInShift = async (req, res) =>
{
    const q = req.params.q
    const shiftTime = getShiftTime(q)
    if (!shiftTime)
    {
        return res.status(400).json({ message: "Ca trực không hợp lệ. Vui lòng chọn 1, 2 hoặc 3." });
    }

    try
    {
        const invoices = await invoicesService.getInvoicesInShift(shiftTime)
        return res.status(200).json({ "success": true, "data": invoices })
    } catch (error)
    {
        console.log(error)
        return res.status(400).json({ message: "Lỗi khi lấy hóa đơn" });
    }

}
const getShiftTime = (shiftId) =>
{
    const shifts = {
        1: { start: "08:00:00", end: "12:00:00" },
        2: { start: "13:00:00", end: "17:00:00" },
        3: { start: "17:00:00", end: "21:00:00" },
    };
    return shifts[shiftId] || null;
};
module.exports = {
    showInvoicesByTime,
    showInvoicesDetails,
    showInvoicesInShift
}