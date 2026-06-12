const express = require("express");
const router = express.Router();



const courseRoutes = require("../routes/courseRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const toolsRoutes = require("../routes/toolsRoutes");


router.use("/course", courseRoutes);
router.use("/category", categoryRoutes);
router.use("/tools", toolsRoutes);




module.exports = router;