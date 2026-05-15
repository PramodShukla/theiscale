const express = require("express");
const router = express.Router();

const { eventUpload } = require("../middlewares/uploadMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  addEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getAllEventsDropdown,
} = require("../controllers/eventController");

router.post("/add-event",authMiddleware,adminMiddleware, eventUpload, addEvent);

router.get("/get-events",authMiddleware,adminMiddleware, getAllEvents);

router.put("/update-event/:id",authMiddleware,adminMiddleware, eventUpload, updateEvent);

router.delete("/delete-event/:id",authMiddleware,adminMiddleware, deleteEvent);

router.get("/get-events-dropdown",authMiddleware,adminMiddleware, getAllEventsDropdown);





router.get("/public-get-events", getAllEvents);


module.exports = router;
