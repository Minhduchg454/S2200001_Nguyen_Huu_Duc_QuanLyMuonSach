const ApiError = require("../api-error");
const XacthucService = require("../services/xacthuc.service");
const MongoDB = require("../utils/mongodb.util");


//Dang ky
exports.register = async (req , res, next) => {
    try {
        const xacthucService = new XacthucService(MongoDB.client)
        const user = await xacthucService.register(req.body);
        return res.status(201).json({message: "Register complete!", user})
    }catch (error){
        return next(new ApiError(error.statusCode || 500, error.message));
    }
}

//Dang nhap
exports.login = async (req , res, next) => {
    try {
        const xacthucService = new XacthucService(MongoDB.client)
        const token = await xacthucService.login(req.body);
        return res.status(200).json({token});
    }catch (error){
        return next(new ApiError(error.statusCode || 500, error.message));
    }
}