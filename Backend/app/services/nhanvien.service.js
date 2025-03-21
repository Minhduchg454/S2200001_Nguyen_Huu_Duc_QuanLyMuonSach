const bcrypt = require("bcryptjs");
const ApiError = require("../api-error");

class NhanvienService {
    constructor(client) {
        this.Nhanvien = client.db().collection("NhanVien");
    }

    async extractNhanvienData(payload) {
        const nhanvien = {
            _id: payload.NV_MaNV,
            NV_Password: payload.NV_Password,
            NV_HoTenNV: payload.NV_HoTenNV,
            NV_ChucVu: payload.NV_ChucVu,
            NV_DiaChi: payload.NV_DiaChi,
            NV_SoDienThoai: payload.NV_SoDienThoai,
        };

        Object.keys(nhanvien).forEach(
            (key) => nhanvien[key] === undefined && delete nhanvien[key]
        );
        return nhanvien;
    }

    async create(payload) {
        const nhanvien = await this.extractNhanvienData(payload);
        
        // Chỉ hash mật khẩu nếu payload có NV_Password
        if (nhanvien.NV_Password) {
            nhanvien.NV_Password = await bcrypt.hash(nhanvien.NV_Password, 10);
        }

        if (
            !nhanvien._id || !nhanvien.NV_Password ||
            !nhanvien.NV_HoTenNV || !nhanvien.NV_ChucVu || !nhanvien.NV_DiaChi || !nhanvien.NV_SoDienThoai) {
            throw new ApiError(400, "Missing required field(s)");
        }


         // Kiểm tra xem ID có tồn tại không
        const existingNhanvien = await this.Nhanvien.findOne({ _id: nhanvien._id });
        if (existingNhanvien) {
            throw new ApiError(400, "Employee ID already exists");
        }

        const result = await this.Nhanvien.insertOne(nhanvien);
        return { insertedId: nhanvien._id, ...nhanvien };
    }

    async find(filter) {
        const cursor = await this.Nhanvien.find(filter);
        return await cursor.toArray();
    }

    async findOne(filter){
        return await this.Nhanvien.findOne(filter);
    }

    async findByName(NV_HoTenNV) {
        return await this.find({
            NV_HoTenNV: { $regex: new RegExp(NV_HoTenNV, "i")},
        });
    }

    async findById(id) {
        return await this.Nhanvien.findOne({
            _id: id
        });
    }

    async update(id, payload) {
        // Lấy dữ liệu cũ từ database
        const filter = { _id: id };

        const oldData = await this.Nhanvien.findOne(filter);
        if (!oldData) {
            throw new Error("Nhân viên không tồn tại!");
        }

        // Chỉ giữ lại những trường có sự thay đổi
        let update = {};
        for (let key in payload) {
            if (payload[key] !== oldData[key]) {
                update[key] = payload[key];
            }
        }

        // Nếu có trường NV_Password mới thì mới mã hóa
        if (update.NV_Password) {
            update.NV_Password = await bcrypt.hash(update.NV_Password, 10);
        }

        // Nếu không có gì thay đổi, không cần update
        if (Object.keys(update).length === 0) {
            return oldData;
        }  
       
        const result = await this.Nhanvien.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        console.log(result)
        return result;
    }

    async delete(id) {
        const filter = {
            _id: id
        };
        const result = await this.Nhanvien.findOneAndDelete(filter);
        return result;
    }

    async deleteAll() {
        const result = await this.Nhanvien.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = NhanvienService;
