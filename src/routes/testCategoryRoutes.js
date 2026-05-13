const express = require("express");
const router = express.Router();

const {
  addTestCategory,
  updateTestCategory,
  getAllTestCategories,
  deleteTestCategory,
  getSingleTestCategory,
  getTestCategoryDropdown,
} = require("../controllers/testCategoryController");

const { testCategoryUpload } = require("../middlewares/uploadMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");

router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  testCategoryUpload,
  addTestCategory,
);

router.get("/all", authMiddleware, adminMiddleware, getAllTestCategories);

router.get(
  "/test-category-dropdown",
  authMiddleware,
  userMiddleware,
  getTestCategoryDropdown,
);

router.get(
  "/dropdown",
  authMiddleware,
  adminMiddleware,
  getTestCategoryDropdown,
);

router.get("/:id", authMiddleware, adminMiddleware, getSingleTestCategory);

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  testCategoryUpload,
  updateTestCategory,
);

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteTestCategory,
);

module.exports = router;
