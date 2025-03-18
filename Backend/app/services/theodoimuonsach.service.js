const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const DocgiaService = require('./docgia.service');
const SachService = require("./sach.service");
const NhanvienService = require("./nhanvien.service");

class TheodoimuonsachService {
    constructor(client) {
        this.client = client;
        this.Theodoimuonsach = client.db().collection("THEODOIMUONSACH");
    }

    extractTheodoimuonsachData(payload) {
        const theodoimuonsach = {
            NgayMuon: payload.NgayMuon,
            NgayTra: payload.NgayTra,
            DG_MaDocGia: payload.DG_MaDocGia,
            S_MaSach: payload.S_MaSach,
            NV_MaNV: payload.NV_MaNV,
        };

        Object.keys(theodoimuonsach).forEach(
            (key) => theodoimuonsach[key] === undefined && delete theodoimuonsach[key]
        );
        return theodoimuonsach;
    }

    // Tạo dữ liệu mới
    async create(payload) {
        const theodoimuonsach = this.extractTheodoimuonsachData(payload);

        // Kiểm tra trường trống
        if (!theodoimuonsach.NgayMuon ||
            !theodoimuonsach.S_MaSach ||
            !theodoimuonsach.DG_MaDocGia ||
            !theodoimuonsach.NV_MaNV) {
            throw new ApiError(400, "Missing required field");
        }


        // Kiểm tra xem dữ liệu đã tồn tại chưa
        const existingRecord = await this.Theodoimuonsach.findOne({
            NgayMuon: theodoimuonsach.NgayMuon,
            S_MaSach: theodoimuonsach.S_MaSach,
            DG_MaDocGia: theodoimuonsach.DG_MaDocGia,
        });
        if (existingRecord) {
            throw new ApiError(400, "This record already exists");
        }


       // Kiểm tra khóa ngoại
        const docgiaService = new DocgiaService(this.client);
        const sachService = new SachService(this.client);
        const nhanvienService = new NhanvienService(this.client);

        // Kiểm tra độc giả
        const maDocGia = await docgiaService.findById(theodoimuonsach.DG_MaDocGia);
        if (!maDocGia) {
            throw new ApiError(400, "Invalid DG_MaDocGia");
        }

        // Kiểm tra sách
        const maSach = await sachService.findById(theodoimuonsach.S_MaSach);
        if (!maSach) {
            throw new ApiError(400, "Invalid S_MaSach");
        }

        // Kiểm tra nhân viên
        const maNhanVien = await nhanvienService.findById(theodoimuonsach.NV_MaNV);
        if (!maNhanVien) {
            throw new ApiError(400, "Invalid NV_MaNV");
        }


        // Chèn dữ liệu mới
        const result = await this.Theodoimuonsach.insertOne(theodoimuonsach);
        return { insertedId: result.insertedId, ...theodoimuonsach };
    }

    // Tìm kiếm theo bộ lọc
    async find(filter) {
        const cursor = await this.Theodoimuonsach.find(filter);
        return await cursor.toArray();
    }

    // Tìm theo ID
    async findById(id) {
        if (!ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid ID format");
        }
        return await this.Theodoimuonsach.findOne({ _id: new ObjectId(id) });
    }

    // Tim theo mã Độc Giả
    async findByReaderId(DG_MaDocGia){
        return await this.find({DG_MaDocGia});
        //~ find{DG_MaDocGia: DG_MaDocGia}
    }

    // Cập nhật theo ID
    async update(id, payload) {
        if (!ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid ID format");
        }
        const filter = { _id: new ObjectId(id) };
        const update = this.extractTheodoimuonsachData(payload);
        const result = await this.Theodoimuonsach.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    // Xóa theo ID
    async delete(id) {
        if (!ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid ID format");
        }
        const filter = { _id: new ObjectId(id) };
        const result = await this.Theodoimuonsach.findOneAndDelete(filter);
        return result;
    }

    // Xóa toàn bộ bản ghi
    async deleteAll() {
        const result = await this.Theodoimuonsach.deleteMany({});
        return result.deletedCount;
    }



}

module.exports = TheodoimuonsachService;