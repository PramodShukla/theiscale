const express = require("express");
const router = express.Router();

const { pptUpload } = require("../middlewares/uploadMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  addPPT,
  getAllPPT,
  updatePPT,
  deletePPT,
  changePPTStatus,
  getSinglePPT,
} = require("../controllers/pptController");

router.post("/add-ppt", authMiddleware, adminMiddleware, pptUpload, addPPT);

router.get("/get-ppts", authMiddleware, adminMiddleware, getAllPPT);

router.put(
  "/update-ppt/:id",
  authMiddleware,
  adminMiddleware,
  pptUpload,
  updatePPT,
);

router.delete("/delete-ppt/:id", authMiddleware, adminMiddleware, deletePPT);

router.patch("/status/:id", authMiddleware, adminMiddleware, changePPTStatus);

router.get("/:id", authMiddleware, adminMiddleware, getSinglePPT);

router.get("/public-get-ppts", getAllPPT);

module.exports = router;
