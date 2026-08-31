const express = require("express");
const router = express.Router();

const {
  addClass,
  updateClass,
  getAllClasses,
  getSingleClass,
  deleteClass,
} = require("../controllers/classesController");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/add", authMiddleware, adminMiddleware, addClass);

router.get("/all", authMiddleware, adminMiddleware, getAllClasses);

router.get("/single/:id", authMiddleware, adminMiddleware, getSingleClass);

router.put("/update/:id", authMiddleware, adminMiddleware, updateClass);

router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteClass);

module.exports = router;
