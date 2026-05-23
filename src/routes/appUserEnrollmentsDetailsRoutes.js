const express = require("express");

const router = express.Router();

const {
  getPurchasedCoursesByUser,
  getSinglePurchasedCourse,
  deletePurchasedCourse,
  updatePurchasedCourseDuration,

  getPurchasedTestSeriesByUser,
  getSinglePurchasedTestSeries,
  deletePurchasedTestSeries,
  updatePurchasedTestSeriesStatus,

  getPurchasedNotesByUser,
  getSinglePurchasedNotes,
  deletePurchasedNotes,
  updatePurchasedNotesStatus,
} = require("../controllers/appUserEnrollmentsDetailsController");

const { authMiddleware } = require("../middlewares/authMiddleware");

const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.get(
  "/course/all/:userId",
  authMiddleware,
  adminMiddleware,
  getPurchasedCoursesByUser,
);

router.get(
  "/course/:id",
  authMiddleware,
  adminMiddleware,
  getSinglePurchasedCourse,
);

router.delete(
  "/course/:id",
  authMiddleware,
  adminMiddleware,
  deletePurchasedCourse,
);

router.put(
  "/course/duration/:id",
  authMiddleware,
  adminMiddleware,
  updatePurchasedCourseDuration,
);

router.get(
  "/test-series/all/:userId",
  authMiddleware,
  adminMiddleware,
  getPurchasedTestSeriesByUser,
);

router.get(
  "/test-series/:id",
  authMiddleware,
  adminMiddleware,
  getSinglePurchasedTestSeries,
);

router.patch(
  "/test-series/status/:id",
  authMiddleware,
  adminMiddleware,
  updatePurchasedTestSeriesStatus
);

router.delete(
  "/test-series/:id",
  authMiddleware,
  adminMiddleware,
  deletePurchasedTestSeries,
);

router.get(
  "/notes/all/:userId",
  authMiddleware,
  adminMiddleware,
  getPurchasedNotesByUser,
);

router.get(
  "/notes/:id",
  authMiddleware,
  adminMiddleware,
  getSinglePurchasedNotes,
);

router.delete(
  "/notes/:id",
  authMiddleware,
  adminMiddleware,
  deletePurchasedNotes,
);

router.patch(
  "/notes/status/:id",
  authMiddleware,
  adminMiddleware,
  updatePurchasedNotesStatus,
);

module.exports = router;
