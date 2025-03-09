var authService = require('../services/auth.service')

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.json({ "success": false, "message": "Bạn cần nhập đầy đủ cả tên đăng nhập lẫn mật khẩu" })
    }
    else {
        const user = await authService.getUserByUserName(username);
        if (!user) {
            res.json({ "success": false, "message": "Sai tên đăng nhập hoặc mật khẩu" })
        }
        else res.json({ "success": true, "token": "token", "message": "Đăng nhập hợp lệ" })
    }
}

module.exports = {
    login
}