const ApiError = require("../api-error");
const TheodoimuonsachService = require("../services/theodoimuonsach.service");
const MongoDB = require("../utils/mongodb.util");

// Tạo mới bản ghi
exports.create = async (req, res, next) => {
    try {
        const service = new TheodoimuonsachService(MongoDB.client);
        const document = await service.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(error.statusCode || 500, error.message));
    }
};

// Cập nhật bản ghi theo ID
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update cannot be empty"));
    }
    try {
        const service = new TheodoimuonsachService(MongoDB.client);
        const document = await service.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Record not found"));
        }
        return res.send({ message: "Record was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating record with id=${req.params.id}`));
    }
};

// Xóa một bản ghi theo ID
exports.delete = async (req, res, next) => {
    try {
        const service = new TheodoimuonsachService(MongoDB.client);
        const document = await service.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Record not found"));
        }
        return res.send({ message: "Record was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete record with id=${req.params.id}`));
    }
};

// Tìm tất cả bản ghi hoặc tìm theo mã độc giả
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const service = new TheodoimuonsachService(MongoDB.client);
        const { DG_MaDocGia } = req.query;
        // In ra console để kiểm tra request query
        console.log("Received query:", req.query);
        if (DG_MaDocGia) {
            documents = await service.findByReaderId(DG_MaDocGia);
        } else {
            documents = await service.find({});
        }
        return res.send(documents);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving records"));
    }
};




// Tìm bản ghi theo ID
exports.findOne = async (req, res, next) => {
    try {
        const service = new TheodoimuonsachService(MongoDB.client);
        const document = await service.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Record not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving record with id=${req.params.id}`));
    }
};

// Xóa tất cả bản ghi
exports.deleteAll = async (req, res, next) => {
    try {
        const service = new TheodoimuonsachService(MongoDB.client);
        const deleteCount = await service.deleteAll();
        return res.send({
            message: `${deleteCount} records were deleted successfully`,
        });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while removing all records"));
    }
};

