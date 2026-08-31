const express = require("express");

const router = express.Router();

const {
  addBanner,
  getAllBanners,
  getSingleBanner,
  changeBannerStatus,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");

const { bannerUpload } = require("../middlewares/uploadMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.post("/add", authMiddleware, adminMiddleware, bannerUpload, addBanner);

router.get("/all",authMiddleware, adminMiddleware, getAllBanners);

router.get("/:id",authMiddleware, adminMiddleware, getSingleBanner);

router.patch("/status/:id",authMiddleware, adminMiddleware, changeBannerStatus);

router.put("/update/:id",authMiddleware, adminMiddleware, bannerUpload, updateBanner);

router.delete("/delete/:id",authMiddleware, adminMiddleware, deleteBanner);

module.exports = router;
