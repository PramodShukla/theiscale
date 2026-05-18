const express = require("express");

const router = express.Router();

const {
  addBatch,
  updateBatch,
  getAllBatches,
  getSingleBatch,
  deleteBatch,
} = require("../controllers/batchController");

const { authMiddleware } = require("../middlewares/authMiddleware");

const { adminMiddleware } = require("../middlewares/adminMiddleware");

const { batchUpload } = require("../middlewares/uploadMiddleware");

// ADD
router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  batchUpload,
  addBatch,
);

// UPDATE
router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  batchUpload,
  updateBatch,
);

// GET ALL
router.get("/all", authMiddleware, adminMiddleware, getAllBatches);

// GET SINGLE
router.get(
  "/get/:id",
  authMiddleware,
  adminMiddleware,
  getSingleBatch,
);

// DELETE
router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteBatch,
);

module.exports = router;
