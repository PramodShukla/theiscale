const Event = require("../models/event");
const EventEnrollment = require("../models/event_enrollment");
const mongoose = require("mongoose");

// ====================================
// ENROLL EVENT
// ====================================
const enrollEvent = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { event_id } = req.body;

    // validation
    if (!event_id) {
      return res.status(400).json({
        status: false,
        message: "event_id is required",
      });
    }

    // check event exists
    const event = await Event.findById(event_id);

    if (!event) {
      return res.status(404).json({
        status: false,
        message: "Event not found",
      });
    }

    // duplicate check
    const alreadyEnrolled = await EventEnrollment.findOne({
      user_id,
      event_id,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        status: false,
        message: "Already enrolled in this event",
      });
    }

    // create enrollment
    const enrollment = await EventEnrollment.create({
      user_id,
      event_id,
    });

    // optional -> increase enroll count
    await Event.findByIdAndUpdate(event_id, {
      $inc: { m_event_no_of_enroll: 1 },
    });

    res.status(201).json({
      status: true,
      message: "Event enrolled successfully",
      data: enrollment,
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};


/// ====================================
// GET MY ENROLLED EVENTS
// CATEGORY FILTER SUPPORTED
// ====================================
const getMyEnrolledEvents = async (req, res) => {
  try {

    const user_id = req.user.id;

    const { category } = req.query;

    // =========================
    // FILTER OBJECT
    // =========================
    let eventFilter = {};

    // category filter
    if (category) {

      // ObjectId validation
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({
          status: false,
          message: "Invalid category id",
        });
      }

      eventFilter.m_event_category = category;
    }

    // =========================
    // FETCH
    // =========================
    const enrolledEvents = await EventEnrollment.find({
      user_id,
    })
      .populate({
        path: "event_id",

        match: eventFilter,

        populate: {
          path: "m_event_category",
          select: "m_ec_title m_ec_slug",
        },
      })

      .sort({ createdAt: -1 });

    // =========================
    // REMOVE NULL EVENTS
    // =========================
    const filteredData = enrolledEvents.filter(
      (item) => item.event_id !== null
    );

    // =========================
    // RESPONSE
    // =========================
    res.status(200).json({
      status: true,
      total: filteredData.length,
      data: filteredData,
    });

  } catch (err) {

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  enrollEvent,
  getMyEnrolledEvents,
};