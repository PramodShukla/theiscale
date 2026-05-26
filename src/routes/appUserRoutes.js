const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  editUser,
  searchUsersForDropdown
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

module.exports = router;
