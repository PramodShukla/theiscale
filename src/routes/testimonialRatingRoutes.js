const express = require("express");

const router = express.Router();

const {
  addTestimonialRating,
  getAllTestimonialRatings,
  getSingleTestimonialRating,
  updateTestimonialRating,
  changeTestimonialRatingStatus,
  deleteTestimonialRating,
} = require("../controllers/testimonialRatingController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");


router.post("/add", authMiddleware,adminMiddleware, addTestimonialRating);
router.get("/all",authMiddleware,adminMiddleware, getAllTestimonialRatings);
router.get("/:id",authMiddleware,adminMiddleware, getSingleTestimonialRating);
router.put("/update/:id",authMiddleware,adminMiddleware, updateTestimonialRating);
router.patch("/status/:id",authMiddleware,adminMiddleware, changeTestimonialRatingStatus);
router.delete("/delete/:id",authMiddleware,adminMiddleware, deleteTestimonialRating);

module.exports = router;
