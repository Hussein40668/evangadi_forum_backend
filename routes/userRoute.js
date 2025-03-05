const express = require("express");
const router = express.Router();

// register Routes
router.post("/register", (req, res) => {
  res.send("user registered");
});

// login Routes
router.post("/login", (req, res) => {
  res.send("user loggedin");
});

// check user Routes
router.get("/check", (req, res) => {
  res.send("user checked");
});

module.exports = router;
