const express = require("express");

const router = express.Router();

const {
  addLeadGenerate,
  getAllLeadGenerate,
  getSingleLeadGenerate,
  updateLeadGenerate,
  changeLeadGenerateStatus,
  deleteLeadGenerate,
} = require("../controllers/leadGenerateController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

// add lead generate
router.post("/add", authMiddleware, adminMiddleware, addLeadGenerate);

// get all lead generate
router.get("/all", authMiddleware, adminMiddleware, getAllLeadGenerate);

// get single lead generate
router.get("/:id", authMiddleware, adminMiddleware, getSingleLeadGenerate);

// update lead generate
router.put("/update/:id", authMiddleware, adminMiddleware, updateLeadGenerate);

// change status
router.patch(
  "/status/:id",
  authMiddleware,
  adminMiddleware,
  changeLeadGenerateStatus,
);

// delete lead generate
router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteLeadGenerate,
);

module.exports = router;
