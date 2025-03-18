const express = require("express");
const nhaxuatban = require("../controllers/nhaxuatban.controller");

const router = express.Router();

router.route("/")
    .get(nhaxuatban.findAll)
    .post(nhaxuatban.create)
    .delete(nhaxuatban.deleteAll)

// Dinh nghia: khi client gui yeu cau den /123, gia tri 123 se duoc truyen vao req.params.id
router.route("/:id")
    .get(nhaxuatban.findOne)
    .put(nhaxuatban.update)
    .delete(nhaxuatban.delete)


module.exports = router;