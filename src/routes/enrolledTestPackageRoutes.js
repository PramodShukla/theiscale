const express = require("express");

const router = express.Router();

const {
  enrollTestPackage,
  myPurchasedPackages,
  getSinglePurchasedPackage,
} = require("../controllers/enrolledTestPackageController");

const {
  authMiddleware,
} = require("../middlewares/authMiddleware");

const {
  userMiddleware,
} = require("../middlewares/userMiddleware");

const {
  adminMiddleware,
} = require("../middlewares/adminMiddleware");

// ======================================================
// USER ROUTES
// ======================================================

// enroll / buy package
router.post(
  "/enroll",
  authMiddleware,
  userMiddleware,
  enrollTestPackage,
);

// my purchased packages
router.get(
  "/my-packages",
  authMiddleware,
  userMiddleware,
  myPurchasedPackages,
);

// single purchased package
router.get(
  "/my-package/:id",
  authMiddleware,
  userMiddleware,
  getSinglePurchasedPackage,
);

// ======================================================
// ADMIN ROUTES
// ======================================================

// // all enrollments
// router.get(
//   "/admin/all",
//   authMiddleware,
//   adminMiddleware,
//   getAllTestPackageEnrollments,
// );

// single enrollment details
// router.get(
//   "/admin/:id",
//   authMiddleware,
//   adminMiddleware,
//   getSingleTestPackageEnrollment,
// );

module.exports = router;