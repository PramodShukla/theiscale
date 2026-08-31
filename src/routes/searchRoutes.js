const express = require("express");

const router = express.Router();

const {
  appSearch
} = require("../controllers/searchController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");

router.post("/app_search", authMiddleware, userMiddleware, appSearch);

module.exports=router;