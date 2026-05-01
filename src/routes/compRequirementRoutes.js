const express = require("express");
const router = express.Router();

const jobController = require("../controllers/compRequirementController");
const { jobUpload } = require("../middlewares/uploadMiddleware");

const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");


// ===============================
// ADMIN ROUTES
// ===============================

// Add Job
router.post("/add-jobs", authMiddleware, adminMiddleware, jobUpload, jobController.addJob);

// Update Job
router.put("/update-job/:id", authMiddleware, adminMiddleware, jobUpload, jobController.updateJob);

// Delete Job
router.delete("/delete-job/:id", authMiddleware, adminMiddleware, jobController.deleteJob);

// Get All Jobs (admin)
router.get("/get-all-jobs", authMiddleware, adminMiddleware, jobController.getAllJobs);

// Get Single Job (admin)
router.get("/get-job/:id", authMiddleware, adminMiddleware, jobController.getJobById);


// ===============================
// USER ROUTES
// =============================== 

// Get All Jobs (public)
router.get("/user-get-all-jobs", jobController.getAllJobs);

// Get Single Job (public)
router.get("/user-get-job/:id", jobController.getJobById);

// Apply Job (login required)
router.post("/user-apply-job/:jobId", authMiddleware, userMiddleware, jobController.applyJob);

module.exports = router;