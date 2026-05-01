const Feature = require("../models/course_feature");
const Course = require("../models/course");
const fs = require("fs");
const mongoose = require("mongoose");

// ===============================
// ADD FEATURE
// ===============================
const addFeature = async (req, res) => {
  try {
    const {
      m_course_id,
      m_feature_title,
      m_feature_desc,
      m_feature_status,
    } = req.body;

    // VALIDATION
    if (
      !m_course_id ||
      !m_feature_title ||
      !m_feature_desc ||
      m_feature_status === undefined
    ) {
      return res.status(400).json({
        status: false,
        message: "course_id, title, description and status are required",
      });
    }

    // CHECK COURSE
    const course = await Course.findById(m_course_id);
    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found",
      });
    }

    // IMAGE OPTIONAL
    let image = null;
    if (req.files?.["m_feature_image"]) {
      image = req.files["m_feature_image"][0].path;
    }

    const newFeature = new Feature({
      m_feature_course: m_course_id,
      m_feature_course_slug: course.m_course_slug,
      m_feature_title,
      m_feature_desc,
      m_feature_image: image,
      m_feature_status: Number(m_feature_status),
    });

    const saved = await newFeature.save();

    res.status(201).json({
      status: true,
      message: "Feature added successfully",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// GET FEATURES BY COURSE
// ===============================
const getFeaturesByCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid course ID",
      });
    }

    const data = await Feature.find({
      m_feature_course: id, 
    }).sort({ _id: -1 });

    res.json({
      status: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// UPDATE FEATURE
// ===============================
const updateFeature = async (req, res) => {
  try {
    const { id } = req.params;

    const feature = await Feature.findById(id);
    if (!feature) {
      return res.status(404).json({
        status: false,
        message: "Feature not found",
      });
    }

    const {
      m_feature_title,
      m_feature_desc,
      m_feature_status,
    } = req.body;

    if (m_feature_title) feature.m_feature_title = m_feature_title;
    if (m_feature_desc) feature.m_feature_desc = m_feature_desc;
    if (m_feature_status !== undefined)
      feature.m_feature_status = Number(m_feature_status);

    // IMAGE UPDATE
    if (req.files?.["m_feature_image"]) {
      if (
        feature.m_feature_image &&
        fs.existsSync(feature.m_feature_image)
      ) {
        fs.unlinkSync(feature.m_feature_image);
      }

      feature.m_feature_image =
        req.files["m_feature_image"][0].path;
    }

    const updated = await feature.save();

    res.json({
      status: true,
      message: "Feature updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// DELETE FEATURE
// ===============================
const deleteFeature = async (req, res) => {
  try {
    const { id } = req.params;

    const feature = await Feature.findById(id);
    if (!feature) {
      return res.status(404).json({
        status: false,
        message: "Feature not found",
      });
    }

    if (
      feature.m_feature_image &&
      fs.existsSync(feature.m_feature_image)
    ) {
      fs.unlinkSync(feature.m_feature_image);
    }

    await Feature.findByIdAndDelete(id);

    res.json({
      status: true,
      message: "Feature deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  addFeature,
  getFeaturesByCourse,
  updateFeature,
  deleteFeature,
};