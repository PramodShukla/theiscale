const express = require("express");

const router = express.Router();

const {
   getPurchasedCoursesByUser,
  getSinglePurchasedCourse,
  deletePurchasedCourse,
  updatePurchasedCourseDuration
} = require("../controllers/appUserEnrollmentsWishlistsDetailsController");

const { authMiddleware } = require("../middlewares/authMiddleware");

const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.get(
  "/course/all/:userId",authMiddleware,adminMiddleware,
  getPurchasedCoursesByUser
);

router.get(
  "/course/:id",authMiddleware,adminMiddleware,
  getSinglePurchasedCourse
);

router.delete(
  "/course/:id",authMiddleware,adminMiddleware,
  deletePurchasedCourse
);

router.put(
  "/course/duration/:id",authMiddleware,adminMiddleware,
  updatePurchasedCourseDuration
);

module.exports = router;