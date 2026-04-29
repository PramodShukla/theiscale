const express = require("express");
const router = express.Router();

// const upload = require("../middlewares/uploadMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { instructorUpload } = require("../middlewares/uploadMiddleware");
const { addInstructor,getAllInstructors,updateInstructor,deleteInstructor,getInstructorDropdown } = require("../controllers/instructorController"); 

router.post("/add-instructor",authMiddleware,adminMiddleware,instructorUpload, addInstructor);
router.get("/get-all-instructors", authMiddleware, adminMiddleware, getAllInstructors);
router.put("/update-instructor/:id", authMiddleware, adminMiddleware,instructorUpload, updateInstructor);
router.delete("/delete-instructor/:id", authMiddleware, adminMiddleware, deleteInstructor);
router.get("/instructors-dropdown", authMiddleware, adminMiddleware, getInstructorDropdown);

module.exports = router;