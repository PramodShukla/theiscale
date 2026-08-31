const express = require("express");

const router = express.Router();

const {
  addNotes,
  getAllNotes,
  getSingleNotes,
  changeNotesStatus,
  deleteNotes,
  updateNotes,
  getAllUserNotes,

  getSingleUserNotes,

  enrollNotes,

  getMyEnrolledNotes,
} = require("../controllers/notesController");

const { authMiddleware } = require("../middlewares/authMiddleware");

const { adminMiddleware } = require("../middlewares/adminMiddleware");

const { userMiddleware } = require("../middlewares/userMiddleware");

const { notesUpload } = require("../middlewares/uploadMiddleware");

router.post("/add", authMiddleware, adminMiddleware, notesUpload, addNotes);

router.get("/all",authMiddleware,adminMiddleware, getAllNotes);

router.get("/:id",authMiddleware,adminMiddleware, getSingleNotes);

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  notesUpload,
  updateNotes,
);

router.put(
  "/change-status/:id",
  authMiddleware,
  adminMiddleware,
  changeNotesStatus,
);

router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteNotes);

router.get("/user/all", authMiddleware,userMiddleware, getAllUserNotes);

router.get("/user/:id", authMiddleware,userMiddleware, getSingleUserNotes);

router.post("/enroll/:notes_id", authMiddleware,userMiddleware, enrollNotes);

router.get("/user/my/enrollments", authMiddleware,userMiddleware, getMyEnrolledNotes);

module.exports = router;
