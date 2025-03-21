const bcrypt = require("bcryptjs");
const ApiError = require("../api-error");

// Lớp quản lý các thao tác với collection Độc Giả
class DocgiaService {
    constructor(client) {
        this.Docgia = client.db().collection("DOCGIA");
    }

    // Lọc dữ liệu
    async extractDocgiaData(payload) {
        
        const docgia = {
            _id: payload.DG_UserName,
            DG_Password: payload.DG_Password,
            DG_HoLot: payload.DG_HoLot,
            DG_Ten: payload.DG_Ten,
            DG_NgaySinh: payload.DG_NgaySinh,
            DG_Phai: payload.DG_Phai,
            DG_DiaChi: payload.DG_DiaChi,
            DG_DienThoai: payload.DG_DienThoai,
        };

        // Loại bỏ các trường không có giá trị
        Object.keys(docgia).forEach(
            (key) => docgia[key] === undefined && delete docgia[key]
        );
        return docgia;
    }

    // Tạo độc giả mới
    async create(payload) {
        const docgia = await this.extractDocgiaData(payload);
        if( !docgia._id || 
            !docgia.DG_Password ||
            !docgia.DG_HoLot ||
            !docgia.DG_Ten ||
            !docgia.DG_NgaySinh ||
            !docgia.DG_Phai||
            !docgia.DG_DiaChi ||
            !docgia.DG_DienThoai)
            {
                throw new ApiError(400, "Missing required field(s)");   
            }
           
        docgia.DG_Password= await bcrypt.hash(payload.DG_Password, 10);

        const existDocgia = await this.find({_id: docgia._id});
        if (existDocgia.lengt >0){
            throw new ApiError(400, "Employee ID already exists");
        }

        const result = await this.Docgia.findOneAndUpdate(
            docgia,
            { $set: docgia },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    // Tìm kiếm độc giả
    async find(filter) {
        const cursor = await this.Docgia.find(filter);
        return await cursor.toArray();
    }

    async findByName(DG_UserName) {
        return await this.find({
            DG_UserName: { $regex: new RegExp(DG_UserName), $options: "i" },
        });
    }

    // Tìm kiếm theo ID
    async findById(id) {
        return await this.Docgia.findOne({
            _id: id,
        });
    }

    // Cập nhật độc giả theo ID
    async update(id, payload) {
        const filter = { _id: id };

        // Lấy dữ liệu hiện tại của độc giả từ database
        const oldData = await this.findById(id);
        if (!oldData) {
            throw new Error("Độc giả không tồn tại");
        }
    

        // Chỉ lấy các trường có thay đổi
        const update = {};
        for (const key in payload) {
            if (payload[key] !== oldData[key]) {
                update[key] = payload[key];
            }
        }

        // Nếu không có dữ liệu nào thay đổi, không cần cập nhật
        if (Object.keys(update).length === 0) {
            return oldData;
        }

        // Kiểm tra mật khẩu có được cập nhật hay không
        if (update.DG_Password) {
            update.DG_Password = await bcrypt.hash(update.DG_Password, 10);
        }
        console.log("Du lieu loc",update)

        // Cập nhật dữ liệu
        const result = await this.Docgia.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result;
    }

    // Xóa độc giả theo ID
    async delete(id) {
        const filter = {
            _id: id,
        };
        const result = await this.Docgia.findOneAndDelete(filter);
        return result;
    }

    // Xóa toàn bộ độc giả
    async deleteAll() {
        const result = await this.Docgia.deleteMany({});
        return result.deletedCount;
    }

    async findOne(filter){
        return await this.Docgia.findOne(filter);
    }
}

module.exports = DocgiaService;