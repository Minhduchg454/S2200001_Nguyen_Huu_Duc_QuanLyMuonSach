const express = require("express");
const router = express.Router();

const xacthuc = require("../controllers/xacthuc.controller");


router.route("/dangky")
    .post(xacthuc.register)

router.route("/dangnhap")
    .post(xacthuc.login)


module.exports = router;