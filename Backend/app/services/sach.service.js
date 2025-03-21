const { ObjectId } = require("mongodb");
const ApiError = require('../api-error');
const NhaXuatBanService = require('./nhaxuatban.service');

// Lop quan ly cac thao tac voi collection books
    //Nhan mot the hien de ket noi voi csdl MongoDB
class SachService {
    constructor (client) {
        this.client = client;
        this.Sach = client.db().collection("SACH");
    }

    //Loc du liẹu
    async extractSachData(payload){

        //Kiem tra NXB ton tai
        const nhaxuatbanService = await new NhaXuatBanService(this.client)
        const maNXB = await nhaxuatbanService.findById(payload.S_MaNXB);
        console.log(`${payload.S_MaNXB}`);

        if(!maNXB){
            throw new ApiError(400, "Publisher ID does not exist");
        }
       
    
        //Tao doi tuong book, lay du lieu tu payload
        const sach = {
            _id: payload.S_MaSach,
            S_TenSach: payload.S_TenSach,
            S_DonGia: payload.S_DonGia,
            S_SoQuyen: payload.S_SoQuyen,
            S_NamXuatBan: payload.S_NamXuatBan,
            S_TacGiaNguonGoc: payload.S_TacGiaNguonGoc,
            S_MaNXB: payload.S_MaNXB
        };

        //Lap qua tat ca cac key trong book, neu gia tri cua key la undefined thi xoa key do ra khoi object
        //Loai bo cac truong khong có gia tri, tranh luu du lieu rong vao database
        Object.keys(sach).forEach(
            (key) => sach[key] === undefined && delete sach[key]
        );
        return sach;
    }

    //Tao du lieu moi
    async create(payload) {
        
        //Tao mot bien nhan gia tri loc tu extractBookData
        const sach = await this.extractSachData(payload);
        
        //Kiem tra truong trong
        if (!sach._id || 
            !sach.S_TenSach ||  
            !sach.S_DonGia ||
            !sach.S_SoQuyen|| 
            !sach.S_NamXuatBan || 
            !sach.S_TacGiaNguonGoc ||
            !sach.S_MaNXB
            ){
            throw new ApiError(400, "Missing require field");
        }

        //Kiem tra id ton tai chua
        const existingSach = await this.Sach.findOne({ _id: sach._id });
        if (existingSach) {
            throw new ApiError(400, "Book ID already exists");
        }
        const result = await this.Sach.insertOne(sach);
        return { 
            insertedId: result.insertedId, ...sach };
    }

    //Tim kiem
    async find(filter){
        const cursor = await this.Sach.find(filter);
        return await cursor.toArray();
    }

    async findByName(S_TenSach){
        return await this.find({
             S_TenSach: { $regex: new RegExp(S_TenSach, "i") }
        });
    }

    //Tim kiem theo id
    async findById(id){
        return await this.Sach.findOne({
            _id: id
            })
    }

    //Cap nhat theo id va noi dung
    async update(id, payload)  {
        const filter = { _id: id };
        const updateData = {};

       if (payload.hasOwnProperty("action")) {
            if (payload.action === "borrow") {
                updateData.$inc = { S_SoQuyen: -1 }; // Giảm số lượng khi mượn
            } else if (payload.action === "return") {
                updateData.$inc = { S_SoQuyen: 1 }; // Tăng số lượng khi trả
            } else {
                throw new ApiError(400, "Invalid action value. Use 'borrow' or 'return'");
            }
        } 
        // Nếu không có action, cập nhật S_SoQuyen trực tiếp
        else if (payload.hasOwnProperty("S_SoQuyen")) {
            updateData.$set = { S_SoQuyen: payload.S_SoQuyen };
        }



        const result = await this.Sach.findOneAndUpdate(
            filter,
            updateData,
            { returnDocument: "after" } // Trả về document sau khi cập nhật
        );

        if (!result) {
            throw new ApiError(404, "Book not found");
        }

        return result;

        // Kiem tra bang postman PUT: ID và payload truyen noi dung can cap nhat
    }

    //Xoa theo id
    async delete(id){
        const filter = {
            _id: id,
        };
        const result = await this.Sach.findOneAndDelete(filter);
        return result;
    }
   
    //Xoa toan bo
    async deleteAll(){
        const result = await this.Sach.deleteMany({});
        return result.deletedCount;
    }
}


module.exports = SachService;