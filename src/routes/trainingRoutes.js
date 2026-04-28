const express = require("express");
const router = express.Router();

const {
  addTH,
  getAllTH,
  getTHByCourse,
  updateTH,
  deleteTH
} = require("../controllers/trainingController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { thUpload } = require("../middlewares/uploadMiddleware");

// ADD
router.post("/add-th", authMiddleware, adminMiddleware, thUpload, addTH);

// GET ALL
router.get("/get-all-th", authMiddleware, adminMiddleware, getAllTH);

// GET BY COURSE
router.get("/get-th/:course_id", authMiddleware, adminMiddleware, getTHByCourse);

// UPDATE
router.put("/update-th/:id", authMiddleware, adminMiddleware, thUpload, updateTH);

// DELETE
router.delete("/delete-th/:id", authMiddleware, adminMiddleware, deleteTH);

module.exports = router;