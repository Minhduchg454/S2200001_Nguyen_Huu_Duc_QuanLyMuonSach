const ApiError = require("../api-error");
const NhaxuatbanService = require("../services/nhaxuatban.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const document = await nhaxuatbanService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(error.statusCode, error.message)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update cannot be empty"));
    }
    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const document = await nhaxuatbanService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Publisher not found"));
        }
        return res.send({ message: "Publisher was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating publisher with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const document = await nhaxuatbanService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Publisher not found"));
        }
        return res.send({ message: "Publisher was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete publisher with id=${req.params.id}`
            )
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const { NXB_TenNXB } = req.query;
        if (NXB_TenNXB) {
            documents = await nhaxuatbanService.findByName(NXB_TenNXB);
        } else {
            documents = await nhaxuatbanService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving publishers")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const document = await nhaxuatbanService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Publisher not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving publisher with id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const deleteCount = await nhaxuatbanService.deleteAll();
        return res.send({
            message: `${deleteCount} publishers were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all publishers")
        );
    }
};
