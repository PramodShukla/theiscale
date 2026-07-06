const express = require("express");
const router = express.Router();

const {
  addBrandVideo,
  updateBrandVideo,
  getAllBrandVideos,
  getSingleBrandVideo,
  deleteBrandVideo,
} = require("../controllers/brandVideoController");

const { brandVideoUpload } = require("../middlewares/uploadMiddleware");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  (req,res,next)=>{
      console.log("Before Multer");
      next();
  },
  brandVideoUpload,
   (req, res, next) => {
    console.log("Upload Success");
    console.log(req.files);
    next();
  },
  addBrandVideo,
);

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  brandVideoUpload,
  updateBrandVideo,
);

router.get("/all", authMiddleware, adminMiddleware, getAllBrandVideos);

router.get("/:id", authMiddleware, adminMiddleware, getSingleBrandVideo);

router.delete("/:id", authMiddleware, adminMiddleware, deleteBrandVideo);


// public api

router.get("/public/all", getAllBrandVideos);

module.exports = router;
