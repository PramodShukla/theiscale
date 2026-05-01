const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");
const { getDashboard } = require("../controllers/dashboardController");

router.get("/", authMiddleware,userMiddleware, getDashboard);

module.exports = router;