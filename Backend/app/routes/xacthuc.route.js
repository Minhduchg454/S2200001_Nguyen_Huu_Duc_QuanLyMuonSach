const express = require("express");
const router = express.Router();

const xacthuc = require("../controllers/xacthuc.controller");


router.route("/dangky")
    .post(xacthuc.register)

router.route("/dangnhap")
    .post(xacthuc.login)


module.exports = router;
/*

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Đăng ký và đăng nhập
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
*/