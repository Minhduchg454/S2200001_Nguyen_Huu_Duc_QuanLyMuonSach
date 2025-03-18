const express = require("express");
const sach = require("../controllers/sach.controller");
const { authMiddleware, adminMiddleware } = require("../middlewares/xacthuc");

const router = express.Router();

router.route("/")
    .get(sach.findAll)
    .post(sach.create)
    .delete(sach.deleteAll)

// Dinh nghia: khi client gui yeu cau den /123, gia tri 123 se duoc truyen vao req.params.id
router.route("/:id")
    .get(sach.findOne)
    .put(sach.update)
    .delete(sach.delete)

module.exports = router;