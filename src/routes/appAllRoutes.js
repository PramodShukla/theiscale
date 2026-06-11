const express = require("express");
const router = express.Router();



const courseRoutes = require("../routes/courseRoutes");
const categoryRoutes = require("../routes/categoryRoutes");


router.use("/course", courseRoutes);
router.use("/category", categoryRoutes);




module.exports = router;