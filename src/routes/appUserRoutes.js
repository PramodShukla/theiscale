const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  editUser,
  searchUsersForDropdown,
  deleteUser,
} = require("../controllers/appUserController");
const { candidateUpload } = require("../middlewares/uploadMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.get("/all", authMiddleware, adminMiddleware, getAllUsers);

router.get("/single/:id", authMiddleware, adminMiddleware, getSingleUser);

router.put(
  "/edit/:id",
  authMiddleware,
  adminMiddleware,
  candidateUpload,
  editUser,
);

router.get("/search", authMiddleware, adminMiddleware, searchUsersForDropdown);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
