const express = require("express");

const router = express.Router();

const {
  addSubjectRating,
  getAllSubjectRatings,
  getSingleSubjectRating,
  updateSubjectRating,
  changeSubjectRatingStatus,
  deleteSubjectRating,
} = require("../controllers/subjectRatingController");

const {authMiddleware} = require("../middlewares/authMiddleware");
const {adminMiddleware} = require("../middlewares/adminMiddleware");

router.post("/add", authMiddleware, adminMiddleware, addSubjectRating);

router.get("/all", authMiddleware, adminMiddleware, getAllSubjectRatings);

router.get("/:id", authMiddleware, adminMiddleware, getSingleSubjectRating);

router.put("/update/:id", authMiddleware, adminMiddleware, updateSubjectRating);

router.patch("/status/:id", authMiddleware, adminMiddleware, changeSubjectRatingStatus);

router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteSubjectRating);

module.exports = router;
