// exports.___ ham nay co the su dung trong file khac khi require()
// (req, res) => {...} day la mot ham xu ly yeu cau
// req: doi tuong yeu cau request tu client, res: doi tuong phan hoi tu server

const ApiError = require("../api-error")
const SachService = require("../services/sach.service")
const MongoDB = require("../utils/mongodb.util")

exports.create = async(req, res , next) => {
    try{
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.create(req.body);
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(error.statusCode, error.message)
        );
    }
}

exports.update = async (req, res, next) =>{
    if ( Object.keys(req.body).length ===0 ){
        return next( new ApiError (400, "Data to update can not be empty"))
    }
    try{
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.update(req.params.id, req.body);
        if (!document) {
            return next (new ApiError(404, "Book not found"));
        }
        return res.send({message: "Contact was update succesfully"});
    }catch (error){
        return next (
            new ApiError(500, `Error update book with id=${error} `)
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.delete(req.params.id);
        if (!document){
            return next(new ApiError(484, "Book not found"));
        }
        return res.send({message: "Book was deleted succesfully"})
    }catch (error){
        return next(
            new ApiError(
                500,
                `Cound not delete book with id=${req.params.id}`
            )
        )
    }
};

//Find By Name
exports.findAll =  async(req, res, next) => {
    let documents = [];

    try{
        // Lay du lieu tu databasse
        const sachService = new SachService(MongoDB.client)
        const { S_TenSach } = req.query;
        if (S_TenSach) {
            documents = await sachService.findByName(S_TenSach);
        }else{
            documents = await sachService.find({});
        }
    }catch (error){
        return next (
            new ApiError (500, "An error occurred while retrieving books")
        )
    }
    return res.send(documents);
}

//Find by ID
exports.findOne =  async(req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.findById(req.params.id);
        if (!document){
            return next(new ApiError(404, "Book no found"));
        }
        return res.send(document);
    }catch (error){
        return next(
            new ApiError ( 
                500, 
                `Error retrieving book with id=${req.params.id}`
            )
        );
    }
}

//delete All
exports.deleteAll = async (req, res, next) => {
    try{
        const sachService = new SachService(MongoDB.client);
        const deleteCount = await sachService.deleteAll();
        return res.send({
            message: `${deleteCount} books were deleted successfully`,
        });
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while removing all books")
        );
    }
}




