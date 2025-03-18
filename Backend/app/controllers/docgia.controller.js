const ApiError = require("../api-error");
const DocgiaService = require("../services/docgia.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const docgiaService = new DocgiaService(MongoDB.client);
      
        const document = await docgiaService.create(req.body);
        
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
        const docgiaService = new DocgiaService(MongoDB.client);
        const document = await docgiaService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Reader not found"));
        }
        return res.send({ message: "Reader was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating reader with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const docgiaService = new DocgiaService(MongoDB.client);
        const document = await docgiaService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Reader not found"));
        }
        return res.send({ message: "Reader was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete reader with id=${req.params.id}`));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const docgiaService = new DocgiaService(MongoDB.client);
        const { DG_UserName } = req.query;
        if (DG_UserName) {
            documents = await docgiaService.findByName(DG_UserName);
        } else {
            documents = await docgiaService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving readers"));
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const docgiaService = new DocgiaService(MongoDB.client);
        const document = await docgiaService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Reader not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving reader with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const docgiaService = new DocgiaService(MongoDB.client);
        const deleteCount = await docgiaService.deleteAll();
        return res.send({
            message: `${deleteCount} readers were deleted successfully`,
        });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while removing all readers"));
    }
};

