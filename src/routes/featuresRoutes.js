const express = require("express");
const router = express.Router();
const { addFeature, getFeaturesByCourse, updateFeature, deleteFeature } = require("../controllers/featuresController");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { featureUpload } = require("../middlewares/uploadMiddleware");

router.post("/add-feature",authMiddleware,adminMiddleware, featureUpload, addFeature);
router.get("/get-all-features/:id",authMiddleware,adminMiddleware, getFeaturesByCourse);
router.put("/update-feature/:id", authMiddleware, adminMiddleware, featureUpload, updateFeature);
router.delete("/delete-feature/:id", authMiddleware, adminMiddleware, deleteFeature);


router.get("/public-get-all-features/:id", getFeaturesByCourse);


module.exports = router;