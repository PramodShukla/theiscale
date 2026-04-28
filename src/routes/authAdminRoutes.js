const express = require("express");
const router = express.Router();

const authAdminController = require("../controllers/authAdminController");

// Register Admin
router.post("/register", authAdminController.registerAdmin);

// Login Admin
router.post("/login", authAdminController.loginAdmin);

module.exports = router;