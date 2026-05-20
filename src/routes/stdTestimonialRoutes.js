const express = require("express");
const router = express.Router();

const {
  addTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial
} = require("../controllers/stdTestimonialController");

const { testimonialUpload } = require("../middlewares/uploadMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

// ADD
router.post("/add-stdtestimonial",authMiddleware, adminMiddleware, testimonialUpload, addTestimonial);

// GET ALL
router.get("/all-stdtestimonials",authMiddleware, adminMiddleware, getAllTestimonials);

// UPDATE
router.put("/update-stdtestimonial/:id",authMiddleware, adminMiddleware, testimonialUpload, updateTestimonial);

// DELETE
router.delete("/delete-stdtestimonial/:id",authMiddleware, adminMiddleware, deleteTestimonial);


// get all for user home page
router.get("/user-get-stdtestimonials", getAllTestimonials);



module.exports = router;