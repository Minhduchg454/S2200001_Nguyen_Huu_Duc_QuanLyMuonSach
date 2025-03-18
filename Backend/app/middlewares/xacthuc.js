const jwt = require("jsonwebtoken"); //Thu vien giup to va xac thuc jwt
require("dotenv").config(); //Doc bien moi truong tu .env

//Dam bao nguoi dung dang nhap moi co the truy cap api
exports.authMiddleware = (req, res, next) => {
    //Lấy token tu headers cua req
    const authHeader = req.headers.authorization;
    //Neu khong co tra ve loi
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not logged in!" });
    }

    //Chia chuoi "Bearer <token>" thanh mang ["bearer", "<token>"] va lay phan tu thu 2 la token
    const token = authHeader.split(" ")[1];


    try {
        //Giai ma token va kiem tra tinh hop le
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Lưu thông tin user vào request
        next(); //Chuyen quen xu ly den middleware ke tiep
    } catch (error) {
        res.status(401).json({ message: "Invalid token!" });
    }
};

// Chỉ cho phép Admin và Nhân viên
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin" && req.user.role !== "nhanvien") {
        return res.status(403).json({ message: "You do not have permission to access this resource!" });
    }
    next();
};