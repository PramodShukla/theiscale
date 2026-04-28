const express = require("express");
const router = express.Router();

const authAdminRoutes = require("./authAdminRoutes");
const categoryRoutes = require("./categoryRoutes");
const courseRoutes = require("./courseRoutes");
const instructorRoutes = require("./instructorRoutes");
const faqRoutes = require("./faqRoutes");
const featuresRoutes = require("./featuresRoutes");
const toolsRoutes = require("./toolsRoutes");
const subjectRoutes = require("./subjectRoutes");
const topicsRoutes = require("./topicsRoutes");
const testPackageRoutes = require("./testPackageRoutes");
const trainingRoutes = require("./trainingRoutes");

router.use("/auth", authAdminRoutes);
router.use("/category", categoryRoutes);
router.use("/course", courseRoutes);
router.use("/instructor", instructorRoutes);
router.use("/faq", faqRoutes);
router.use("/feature", featuresRoutes);
router.use("/tools", toolsRoutes);
router.use("/subject", subjectRoutes);
router.use("/topics", topicsRoutes);
router.use("/test-package", testPackageRoutes);
router.use("/training", trainingRoutes);

module.exports = router;