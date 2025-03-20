const ApiError = require("../api-error");
const NhanvienService = require("../services/nhanvien.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {  
    try {
        const nhanvienService = new NhanvienService(MongoDB.client);
        const document = await nhanvienService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(error.statusCode, error.message)
        )    
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update cannot be empty"));
    }
    try {
        const nhanvienService = new NhanvienService(MongoDB.client);

        const document = await nhanvienService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Employee not found"));
        }
        return res.send({ message: "Employee was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating employee with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const nhanvienService = new NhanvienService(MongoDB.client);
        const document = await nhanvienService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Employee not found"));
        }
        return res.send({ message: "Employee was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete employee with id=${req.params.id}`));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const nhanvienService = new NhanvienService(MongoDB.client);
        const { NV_HoTenNV } = req.query;
        if (NV_HoTenNV) {
            documents = await nhanvienService.findByName(NV_HoTenNV);
        } else {
            documents = await nhanvienService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving employees"));
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const nhanvienService = new NhanvienService(MongoDB.client);
        const document = await nhanvienService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Employee not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving employee with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const nhanvienService = new NhanvienService(MongoDB.client);
        const deleteCount = await nhanvienService.deleteAll();
        return res.send({ message: `${deleteCount} employees were deleted successfully` });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while removing all employees"));
    }
};
