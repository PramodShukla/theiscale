const express = require("express");
const router = express.Router();
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  getCourseRegistrations,
  getCoursePurchaseDetails,
  getAllTestPackageEnrollments,
  getSingleTestPackageEnrollment,
  deleteTestPackageEnrollment,
  changeTestPackageAccessStatus,
} = require("../controllers/adminRegistrationsSectionController");


router.get(
  "/course-registrations",
  authMiddleware,
  adminMiddleware,
  getCourseRegistrations
);

router.get(
  "/course-purchase-details/:enrollment_id",
  authMiddleware,
  adminMiddleware,
  getCoursePurchaseDetails
);

// all enrollments
router.get(
  "/test-package-enrollments",
  authMiddleware,
  adminMiddleware,
  getAllTestPackageEnrollments,
);

// single enrollment details
router.get(
  "/single-test-package/:id",
  authMiddleware,
  adminMiddleware,
  getSingleTestPackageEnrollment,
);


router.delete(
  "/delete-test-package/:id",
  authMiddleware,
  adminMiddleware,
  deleteTestPackageEnrollment,
);

router.patch(
  "/change-access-status/:id",
  authMiddleware,
  adminMiddleware,
  changeTestPackageAccessStatus,
);

module.exports = router;