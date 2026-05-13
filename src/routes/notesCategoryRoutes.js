const express = require("express");

const router = express.Router();

const {
  addNotesCategory,
  getAllNotesCategories,
  getSingleNotesCategory,
  getNotesCategoryDropdown,
  changeNotesCategoryStatus,
  updateNotesCategory,
  deleteNotesCategory,
} = require("../controllers/notesCategoryController");

const {
  notesCategoryUpload,
} = require("../middlewares/uploadMiddleware");

const {
  authMiddleware,
} = require("../middlewares/authMiddleware");

const {
  adminMiddleware,
} = require("../middlewares/adminMiddleware");

// ======================================================
// ADD
// ======================================================

router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  notesCategoryUpload,
  addNotesCategory,
);

// ======================================================
// GET ALL
// ======================================================

router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  getAllNotesCategories,
);

// ======================================================
// GET SINGLE
// ======================================================

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getSingleNotesCategory,
);

// ======================================================
// DROPDOWN
// ======================================================

router.get(
  "/dropdown/list",
  authMiddleware,
  getNotesCategoryDropdown,
);

// ======================================================
// CHANGE STATUS
// ======================================================

router.patch(
  "/change-status/:id",
  authMiddleware,
  adminMiddleware,
  changeNotesCategoryStatus,
);

// ======================================================
// UPDATE
// ======================================================

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  notesCategoryUpload,
  updateNotesCategory,
);

// ======================================================
// DELETE
// ======================================================

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteNotesCategory,
);

module.exports = router;