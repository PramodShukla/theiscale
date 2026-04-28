const express = require("express");
const router = express.Router();


const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const profileRoutes = require("./profileRoutes");
const updateProfileRoutes = require("./updateProfileRoutes");


router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/myprofile", profileRoutes);
router.use("/update-profile", updateProfileRoutes);

module.exports = router;