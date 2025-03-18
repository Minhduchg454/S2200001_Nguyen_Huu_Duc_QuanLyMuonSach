const express = require("express");
const theodoimuonsach = require("../controllers/theodoimuonsach.controller");

const router = express.Router();

router.route("/")
    .get(theodoimuonsach.findAll)   // Lấy danh sách tất cả các bản ghi
    .post(theodoimuonsach.create)   // Tạo bản ghi mới
    .delete(theodoimuonsach.deleteAll); // Xóa tất cả bản ghi

router.route("/:id")
    .get(theodoimuonsach.findOne)   // Tìm bản ghi theo ID
    .put(theodoimuonsach.update)    // Cập nhật bản ghi theo ID
    .delete(theodoimuonsach.delete); // Xóa bản ghi theo ID



module.exports = router;