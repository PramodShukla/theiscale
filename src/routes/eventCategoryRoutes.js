const express = require("express");
const router = express.Router();

const { eventCategoryUpload } = require("../middlewares/uploadMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  addEventCategory,
  updateEventCategory,
  getAllEventCategory,
  getEventCategoryDropdown,
  deleteEventCategory,
} = require("../controllers/eventCategoryController");

router.post(
  "/add-event-category",authMiddleware,adminMiddleware,eventCategoryUpload,addEventCategory,);

router.put(
  "/update-event-category/:id",authMiddleware,adminMiddleware,eventCategoryUpload,updateEventCategory,);

router.get(
  "/get-event-categories",
  authMiddleware,
  adminMiddleware,
  getAllEventCategory,
);

router.get(
  "/event-category-dropdown",
  authMiddleware,
  adminMiddleware,
  getEventCategoryDropdown,
);

router.delete(
  "/delete-event-category/:id",
  authMiddleware,
  adminMiddleware,
  deleteEventCategory,
);

router.get("/public-event-category-dropdown", getEventCategoryDropdown);

module.exports = router;
