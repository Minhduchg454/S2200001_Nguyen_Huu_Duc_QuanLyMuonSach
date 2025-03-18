// ApiError ke thua tat ca thuoc tinh cua Error, co tat ca thuoc tinh, phuong thuc cua error


class ApiError extends Error {
    constructor (statusCode, massage) {
        super();
        this.message = massage;
        this.statusCode = statusCode;
    }
}

module.exports = ApiError;



/*
    ✔ this giúp gán thuộc tính cho đối tượng được tạo từ class. Không phải biến cục bộ và thuộc tính của đối tượng
    ✔ Nếu không có this, biến chỉ là cục bộ và sẽ không tồn tại sau khi constructor kết thúc.
    ✔ this cho phép truy cập thuộc tính và phương thức bên trong cùng một đối tượng.
    ✔ this giúp phân biệt giữa biến cục bộ và thuộc tính của đối tượng.
*/