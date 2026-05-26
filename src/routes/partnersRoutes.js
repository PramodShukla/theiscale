const express = require("express");

const router = express.Router();

const {
  addPartner,
  getAllPartners,
  getSinglePartner,
  updatePartner,
  deletePartner,
} = require("../controllers/partnersController");

const { authMiddleware } = require("../middlewares/authMiddleware");

const { adminMiddleware } = require("../middlewares/adminMiddleware");

const { partnerUpload } = require("../middlewares/uploadMiddleware");

router.post("/add", authMiddleware, adminMiddleware, partnerUpload, addPartner);

router.get("/all", authMiddleware, adminMiddleware, getAllPartners);

router.get("/:id", authMiddleware, adminMiddleware, getSinglePartner);

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  partnerUpload,
  updatePartner,
);

router.delete("/delete/:id", authMiddleware, adminMiddleware, deletePartner);

module.exports = router;
