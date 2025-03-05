const express = require("express");
const { register } = require("../controller/userController");
const router = express.Router();

// user controller
const { login, checkUser } = require("../controller/userController");

// register Routes
router.post("/register", register)

// login Routes
router.post("/login", login)

// check user Routes
router.get("/check", checkUser)

module.exports = router;
