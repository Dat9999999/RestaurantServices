const multer = require('multer');
const path = require('path');

// Cấu hình lưu ảnh vào thư mục 'uploads/'
const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) =>
    {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
