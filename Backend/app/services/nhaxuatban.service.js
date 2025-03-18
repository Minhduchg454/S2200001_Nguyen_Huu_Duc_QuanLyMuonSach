const ApiError = require("../api-error");

class NhaxuatbanService {
    constructor(client) {
        this.Nhaxuatban = client.db().collection("NHAXUATBAN");
    }

    // Lọc dữ liệu
    extractNXBData(payload) {
        return {
            _id: payload.NXB_Ma,
            NXB_TenNXB: payload.NXB_TenNXB,
            NXB_DiaChi: payload.NXB_DiaChi,
        };
    }

    // Tạo dữ liệu mới
    async create(payload) {
        const nhaxuatban = this.extractNXBData(payload);
        if (!nhaxuatban._id || !nhaxuatban.NXB_TenNXB || !nhaxuatban.NXB_DiaChi) {
            throw new ApiError(400, "Missing required field");
        }

        // Kiểm tra xem ID có tồn tại không
        const existingNXB = await this.Nhaxuatban.findOne({ _id: nhaxuatban._id });

        if (existingNXB) {
            throw new ApiError(400, "Publisher ID already exists");
        }
        const result = await this.Nhaxuatban.insertOne(nhaxuatban);
        return { insertedId: nhaxuatban._id, ...nhaxuatban };
    }

    // Tìm kiếm
    async find(filter) {
        return await this.Nhaxuatban.find(filter).toArray();
    }

    async findByName(NXB_TenNXB) {
        return await this.find({
            NXB_TenNXB: { $regex: new RegExp(NXB_TenNXB, "i") },
        });
    }

    // Tìm kiếm theo ID (chỉ dùng chuỗi)
    async findById(id) {
        return await this.Nhaxuatban.findOne({ _id: id});
    }

    // Cập nhật theo ID
    async update(id, payload) {
        const filter = { _id: String(id) };
        const update = this.extractNXBData(payload);

        return await this.Nhaxuatban.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
    }

    // Xóa theo ID
    async delete(id) {
        return await this.Nhaxuatban.findOneAndDelete({ _id: id });
    }

    // Xóa toàn bộ dữ liệu
    async deleteAll() {
        return await this.Nhaxuatban.deleteMany({});
    }
}

module.exports = NhaxuatbanService;