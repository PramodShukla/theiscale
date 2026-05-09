const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { courseUpload } = require("../middlewares/uploadMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");


const { addCourse,getAllCourses,getCategoryDropdown,updateCourse,deleteCourse,getPopularCourses,getRecommendedCourses,getCourseById, getFullCourseContent } = require("../controllers/courseController"); 

router.post("/add-course", authMiddleware, adminMiddleware, courseUpload, addCourse);
router.get("/all-courses", authMiddleware, adminMiddleware, getAllCourses);
router.get("/categories-dropdown", authMiddleware, adminMiddleware, getCategoryDropdown);
router.put("/update-course/:id", authMiddleware, adminMiddleware, courseUpload, updateCourse);
router.delete("/delete-course/:id", authMiddleware, adminMiddleware, deleteCourse);
router.get("/popular-courses",authMiddleware,adminMiddleware, getPopularCourses);
router.get("/recommended-courses",authMiddleware,adminMiddleware, getRecommendedCourses);
router.get("/course/:id", authMiddleware, adminMiddleware, getCourseById);





router.get("/public-all-courses", getAllCourses);
router.get("/public-course/:id", getCourseById);

module.exports = router;  