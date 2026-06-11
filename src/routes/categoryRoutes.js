const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/uploadMiddleware");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  appGetCategoryWiseCourses
} = require("../controllers/categoryController");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");

// multiple file upload
router.post(
  "/add-category",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    { name: "category_icon", maxCount: 1 },
    { name: "category_banner", maxCount: 1 },
  ]),
  createCategory,
);

// GET ALL CATEGORIES
router.get(
  "/all-categories",
  authMiddleware,
  adminMiddleware,
  getAllCategories,
);

router.put(
  "/update-category/:id",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    { name: "category_icon", maxCount: 1 },
    { name: "category_banner", maxCount: 1 },
  ]),
  updateCategory,
);

router.delete(
  "/delete-category/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategory,
);

router.get("/get_category_courses", appGetCategoryWiseCourses);

module.exports = router;
