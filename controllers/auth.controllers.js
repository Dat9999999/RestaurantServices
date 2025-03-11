var authService = require('../services/auth.service')
const { generateToken, verifyToken } = require("../helpers/auth.helper")

const login = async (req, res) =>
{
    const { username, password } = req.body;
    if (!username || !password)
    {
        return res.json({ "success": false, "message": "Bạn cần nhập đầy đủ cả tên đăng nhập lẫn mật khẩu" })
    }
    else
    {
        const user = await authService.getUserByUserName(username);
        if (!user)
        {
            return res.json({ "success": false, "message": "Sai tên đăng nhập hoặc mật khẩu" })
        }
        const token = generateToken(user)
        res.status(200).json({ "success": true, token })
    }
}

module.exports = {
    login
}