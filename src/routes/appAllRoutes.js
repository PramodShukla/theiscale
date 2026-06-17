const express = require("express");
const router = express.Router();



const courseRoutes = require("../routes/courseRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const toolsRoutes = require("../routes/toolsRoutes");
const compRequirementRoutes = require("../routes/compRequirementRoutes");
const dashboardRoutes = require("../routes/dashboardRoutes");
const eventRoutes = require("../routes/eventRoutes");
const successStoryRoutes = require("../routes/successStoryRoutes");


router.use("/course", courseRoutes);
router.use("/category", categoryRoutes);
router.use("/tools", toolsRoutes);
router.use("/jobs", compRequirementRoutes);
router.use("/user/dashboard", dashboardRoutes);
router.use("/events", eventRoutes);
router.use("/ss", successStoryRoutes);





module.exports = router;