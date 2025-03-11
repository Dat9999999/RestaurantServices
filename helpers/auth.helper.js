const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES || "1h";

const generateToken = (user) =>
{
    return jwt.sign({
        userid: user.id, username: user.username,
        role: user.role
    }, SECRET_KEY, { expiresIn: EXPIRES_IN });
}

const verifyToken = (req, res, next) =>
{
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" })
    try
    {
        const decode = jwt.verify(token, SECRET_KEY)
        req.user = decode;
        next();
    }
    catch (error)
    {
        return res.status(403).json({ message: "Invalid token" });
    }
}


module.exports = {
    generateToken,
    verifyToken
}
