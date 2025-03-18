const ApiError = require('../api-error');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const DocgiaService = require('./docgia.service');
const NhanvienService = require("./nhanvien.service");
const bcrypt = require("bcrypt");


class XacthucService {
    constructor(client){
        this.client = client
        this.NhanvienService = new NhanvienService(client);
        this.DocgiaService = new DocgiaService(client);
    
    }

    async register (payload) {
        const role = payload.Role;
        let username;
        if (role === "docgia"){
            const existDocgia = await this.DocgiaService.findOne({_id: payload.DG_UserName});
            if(existDocgia){
                throw new ApiError(400,"User already exists");
            }
            const result = await this.DocgiaService.create(payload);
            username = payload.DG_UserName;
        }else{
            const existUser = await this.NhanvienService.findOne({_id: payload.NV_MaNV});
            if(existUser){
                throw new ApiError(400,"User already exists");
            }
            const result = await this.NhanvienService.create(payload);
            username = payload.NV_MaNV;
        }
        return {username, role}
    }

    async login (payload){
        console.log("Loi", payload);
        let user = await this.NhanvienService.findOne({ _id: payload.userName});
        let role = "nhanvien";
        
        if(!user){
            user = await this.DocgiaService.findOne({_id: payload.userName});
            role="docgia";
        }
        if (!user){
            throw new ApiError(400,"Account not exists");
        }

        let isMatch;
        if (role === "docgia"){
            isMatch = await bcrypt.compare(payload.password, user.DG_Password);
        }else {
            isMatch = await bcrypt.compare(payload.password, user.NV_Password);
        }


        if(!isMatch) throw new ApiError (400, "Password is wrong!");

        const token = jwt.sign(
            {
                id: user._id,
                role: role //lưu role vào token
            },
            process.env.JWT_SECRET, //Khoa bi mat
            { expiresIn: "1h"} //Token het han sau 1h
        )

        return token;
    }


}

module.exports = XacthucService;


/*

http://localhost:4000/api/xacthuc/dangky


Mau tin dang ky
{
    "DG_UserName": "dg001",
    "DG_Password": "123456789",
    "DG_HoLot": "Nguyễn Văn",
    "DG_Ten": "An",
    "DG_NgaySinh": "2000-05-20",
    "DG_Phai": "Nam",
    "DG_DiaChi": "123 Đường ABC, Quận 1, TP.HCM",
    "DG_DienThoai": "0909123456",
    "Role": "docgia"
}


Mau tin dang nhap
{
    "userName": "dg001",
    "password": "123456789"
}

*/