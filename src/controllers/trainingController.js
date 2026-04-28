const Training = require("../models/master_course_training");
const Course = require("../models/master_course_tbl");
const fs = require("fs");

// ===============================
// ADD TRAINING HIGHLIGHT
// ===============================
const addTH = async (req, res) => {
  try {
    const { course_id, title, description, active } = req.body;

    if (!course_id || !title) {
      return res.status(400).json({
        status: false,
        message: "course_id and title required"
      });
    }

    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found"
      });
    }

    const image = req.files?.th_icon
      ? req.files.th_icon[0].path
      : null;

    const newTH = new Training({
      type: 1, // course
      course_id,
      course_slug: course.slug,

      icon: image,
      title,
      description,
      active: active ? Number(active) : 1,

      created: new Date()
    });

    const saved = await newTH.save();

    res.status(201).json({
      status: true,
      message: "Training Highlight added",
      data: saved
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


// ===============================
// GET ALL
// ===============================
const getAllTH = async (req, res) => {
  try {
    const data = await Training.find({ type: 1 }).sort({ _id: -1 });

    res.json({ status: true, data });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


// ===============================
// GET BY COURSE
// ===============================
const getTHByCourse = async (req, res) => {
  try {
    const { course_id } = req.params;

    const data = await Training.find({
      course_id,
      type: 1
    }).sort({ _id: -1 });

    res.json({ status: true, data });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


// ===============================
// UPDATE
// ===============================
const updateTH = async (req, res) => {
  try {
    const { id } = req.params;

    const th = await Training.findById(id);
    if (!th) {
      return res.status(404).json({
        status: false,
        message: "Not found"
      });
    }

    const { title, description, active } = req.body;

    if (title) th.title = title;
    if (description) th.description = description;
    if (active !== undefined) th.active = Number(active);

    if (req.files?.th_icon) {
      if (th.icon && fs.existsSync(th.icon)) {
        fs.unlinkSync(th.icon);
      }
      th.icon = req.files.th_icon[0].path;
    }

    const updated = await th.save();

    res.json({
      status: true,
      message: "Updated successfully",
      data: updated
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


// ===============================
// DELETE
// ===============================
const deleteTH = async (req, res) => {
  try {
    const { id } = req.params;

    const th = await Training.findById(id);
    if (!th) {
      return res.status(404).json({
        status: false,
        message: "Not found"
      });
    }

    if (th.icon && fs.existsSync(th.icon)) {
      fs.unlinkSync(th.icon);
    }

    await Training.findByIdAndDelete(id);

    res.json({
      status: true,
      message: "Deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  addTH,
  getAllTH,
  getTHByCourse,
  updateTH,
  deleteTH
};