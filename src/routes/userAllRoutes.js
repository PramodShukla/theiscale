const express = require("express");
const router = express.Router();


const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const profileRoutes = require("./profileRoutes");
const updateProfileRoutes = require("./updateProfileRoutes");
const stdTestimonialRoutes = require("./stdTestimonialRoutes");
const compRequirementRoutes = require("./compRequirementRoutes");
const courseRoutes = require("./courseRoutes");
const faqRoutes = require("./faqRoutes");
const subjectRoutes = require("./subjectRoutes");
const featuresRoutes = require("./featuresRoutes");
const trainingRoutes = require("./trainingRoutes");
const toolsRoutes = require("./toolsRoutes");
const instructorRoutes = require("./instructorRoutes");
const eventCategoryRoutes = require("./eventCategoryRoutes");
const eventRoutes = require("./eventRoutes");
const pptRoutes = require("./pptRoutes");
const clientRoutes = require("./clientRoutes");
const successStoryRoutes = require("./successStoryRoutes");
const alliedRoutes = require("./alliedRoutes");





router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/myprofile", profileRoutes);
router.use("/update-profile", updateProfileRoutes);
router.use("/stdtestimonials", stdTestimonialRoutes);
router.use("/comp-requirement", compRequirementRoutes);
router.use("/course", courseRoutes);
router.use("/faq", faqRoutes);
router.use("/subject", subjectRoutes);
router.use("/features", featuresRoutes);
router.use("/training", trainingRoutes);
router.use("/tools", toolsRoutes);
router.use("/instructors", instructorRoutes);
router.use("/event-category", eventCategoryRoutes);
router.use("/event", eventRoutes);
router.use("/ppt", pptRoutes);
router.use("/client", clientRoutes);
router.use("/success-story", successStoryRoutes);
router.use("/allied", alliedRoutes);


module.exports = router; 