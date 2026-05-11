const express = require("express");

const router = express.Router();

const multer = require("multer");

const upload = multer({
  dest: "uploads/certificates/",
});

const {
  getCertificateStatus,
  requestCertificate,
  getCertificateRequests,
  updateCertificateStatus,
  downloadCertificate,
} = require("../controllers/certificateController");

const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { certificateUpload } = require("../middlewares/uploadMiddleware");

// USER
router.get(
  "/status/:course_id",
  authMiddleware,
  userMiddleware,
  getCertificateStatus,
);

router.post("/request", authMiddleware, userMiddleware, requestCertificate);

router.get("/download/:course_id",authMiddleware, userMiddleware, downloadCertificate);

// ADMIN
router.get(
  "/all-requests",
  authMiddleware,
  adminMiddleware,
  getCertificateRequests,
);

router.put(
  "/update-status/:enrollment_id",
  authMiddleware,
  adminMiddleware,
  certificateUpload,
  updateCertificateStatus,
);

module.exports = router;
