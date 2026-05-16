const express = require("express");
const router = express.Router();

const {
  addPackage,
  getAllPackages,
  getPackagesByCourse,
  updatePackage,
  deletePackage,
  getTestPackageDropdown
} = require("../controllers/testPackageController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { packageUpload } = require("../middlewares/uploadMiddleware");

// ADD
router.post("/add-package", authMiddleware, adminMiddleware, packageUpload, addPackage);

// GET ALL
router.get("/get-all-packages", authMiddleware, adminMiddleware, getAllPackages);

// GET BY COURSE
router.get("/get-packages/:course_id", authMiddleware, adminMiddleware, getPackagesByCourse);

// UPDATE
router.put("/update-package/:id", authMiddleware, adminMiddleware, packageUpload, updatePackage);

// DELETE
router.delete("/delete-package/:id", authMiddleware, adminMiddleware, deletePackage);

// GET ALL FOR DROPDOWN
router.get("/dropdown", authMiddleware,adminMiddleware, getTestPackageDropdown);

module.exports = router;    