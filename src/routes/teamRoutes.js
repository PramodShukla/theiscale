const express = require("express");

const router = express.Router();

const {
  addTeam,
  updateTeam,
  getAllTeam,
  getSingleTeam,
  getTeamDropdown,
  deleteTeam,
} = require("../controllers/teamController");

const { teamUpload } = require("../middlewares/uploadMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

// add
router.post("/add",authMiddleware,adminMiddleware, teamUpload, addTeam);

// update
router.put("/update/:id", authMiddleware, adminMiddleware, teamUpload, updateTeam);

// get all
router.get("/all",authMiddleware,adminMiddleware, getAllTeam);

// get single
router.get("/single/:id", authMiddleware, adminMiddleware, getSingleTeam);

// dropdown
router.get("/dropdown",authMiddleware,adminMiddleware, getTeamDropdown);

// delete
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteTeam);

module.exports = router;
