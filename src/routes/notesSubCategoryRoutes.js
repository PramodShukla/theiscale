const express = require("express");

const router = express.Router();

const {
  addNotesSubCategory,
  getAllNotesSubCategory,
  getSingleNotesSubCategory,
  getNotesSubCategoryDropdown,
  changeNotesSubCategoryStatus,
  updateNotesSubCategory,
  deleteNotesSubCategory,
} = require("../controllers/notesSubCategoryController");

const { authMiddleware } = require("../middlewares/authMiddleware");

const { adminMiddleware } = require("../middlewares/adminMiddleware");

const { notesSubCategoryUpload } = require("../middlewares/uploadMiddleware");

router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  notesSubCategoryUpload,
  addNotesSubCategory,
);

router.get("/all", authMiddleware, adminMiddleware, getAllNotesSubCategory);

router.get(
  "/dropdown/list",
  authMiddleware,
  adminMiddleware,
  getNotesSubCategoryDropdown,
);

router.get("/:id", authMiddleware, adminMiddleware, getSingleNotesSubCategory);

router.patch(
  "/change-status/:id",
  authMiddleware,
  adminMiddleware,
  changeNotesSubCategoryStatus,
);

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  notesSubCategoryUpload,
  updateNotesSubCategory,
);

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteNotesSubCategory,
);

module.exports = router;
