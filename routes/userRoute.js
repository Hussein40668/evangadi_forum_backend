const express = require("express");
const router = express.Router();
const { register } = require("../controller/userController");


//authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// user controller
const { login, checkUser } = require("../controller/userController");

// register Routes
router.post("/register", register)

// login Routes
router.post("/login", login)

// check user Routes
router.get("/check" ,authMiddleware,checkUser)

module.exports = router;
