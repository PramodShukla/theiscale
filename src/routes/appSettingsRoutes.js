const express = require("express");

const router = express.Router();

const {
  addSetting,
  updateSetting,
  getAllSettings,
  getGeneralSettings,
  getSocialMediaSettings,
  getSeoSettings,
  getEmailSettings,
  getSmsSettings,
  getPaymentSettings,
  getLiveClassSettings,
  getVisualSettings,
} = require("../controllers/appSettingsController");

const { settingUpload } = require("../middlewares/uploadMiddleware");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.post("/add", authMiddleware, adminMiddleware, settingUpload, addSetting);

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  settingUpload,
  updateSetting,
);

router.get("/", authMiddleware, adminMiddleware, getAllSettings);

router.get("/general", authMiddleware, adminMiddleware, getGeneralSettings);

router.get(
  "/social-media",
  authMiddleware,
  adminMiddleware,
  getSocialMediaSettings,
);

router.get("/seo", authMiddleware, adminMiddleware, getSeoSettings);

router.get("/email", authMiddleware, adminMiddleware, getEmailSettings);

router.get("/sms", authMiddleware, adminMiddleware, getSmsSettings);

router.get("/payment", authMiddleware, adminMiddleware, getPaymentSettings);

router.get(
  "/live-class",
  authMiddleware,
  adminMiddleware,
  getLiveClassSettings,
);

router.get("/visual", authMiddleware, adminMiddleware, getVisualSettings);

module.exports = router;
