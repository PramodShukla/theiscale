const Package = require("../models/test_package");
const Course = require("../models/course");
const fs = require("fs");

// ===============================
// ADD PACKAGE
// ===============================
const addPackage = async (req, res) => {
  try {
    const {
      m_package_course,
      m_package_title,
      m_package_language,
      m_package_order,
      m_package_intro,
      m_package_description,
      m_package_status
    } = req.body;

    if (!m_package_course || !m_package_title || !m_package_language) {
      return res.status(400).json({
        status: false,
        message: "course, title and language are required"
      });
    }

    const course = await Course.findById(m_package_course);
    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found"
      });
    }

    const image = req.files?.m_package_image
      ? req.files.m_package_image[0].path
      : null;

    const newPackage = new Package({
      m_package_course,
      m_package_title,
      m_package_language,
      m_package_image: image,
      m_package_order,
      m_package_intro,
      m_package_description,
      m_package_status: m_package_status ? Number(m_package_status) : 1
    });

    const saved = await newPackage.save();

    res.status(201).json({
      status: true,
      message: "Package added successfully",
      data: saved
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


// ===============================
// GET ALL PACKAGES
// ===============================
const getAllPackages = async (req, res) => {
  try {
    const data = await Package.find().sort({ _id: -1 });

    res.json({
      status: true,
      data
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


// ===============================
// GET BY COURSE ID
// ===============================
const getPackagesByCourse = async (req, res) => {
  try {
    const { course_id } = req.params;

    const data = await Package.find({
      m_package_course: course_id
    }).sort({ _id: -1 });

    res.json({
      status: true,
      data
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


// ===============================
// UPDATE PACKAGE
// ===============================
const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const pkg = await Package.findById(id);
    if (!pkg) {
      return res.status(404).json({
        status: false,
        message: "Package not found"
      });
    }

    const {
      m_package_title,
      m_package_language,
      m_package_order,
      m_package_intro,
      m_package_description,
      m_package_status
    } = req.body;

    if (m_package_title) pkg.m_package_title = m_package_title;
    if (m_package_language) pkg.m_package_language = m_package_language;
    if (m_package_order) pkg.m_package_order = m_package_order;
    if (m_package_intro) pkg.m_package_intro = m_package_intro;
    if (m_package_description) pkg.m_package_description = m_package_description;
    if (m_package_status !== undefined)
      pkg.m_package_status = Number(m_package_status);

    // image update
    if (req.files?.m_package_image) {
      if (pkg.m_package_image && fs.existsSync(pkg.m_package_image)) {
        fs.unlinkSync(pkg.m_package_image);
      }
      pkg.m_package_image = req.files.m_package_image[0].path;
    }

    const updated = await pkg.save();

    res.json({
      status: true,
      message: "Package updated successfully",
      data: updated
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


// ===============================
// DELETE PACKAGE
// ===============================
const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const pkg = await Package.findById(id);
    if (!pkg) {
      return res.status(404).json({
        status: false,
        message: "Package not found"
      });
    }

    if (pkg.m_package_image && fs.existsSync(pkg.m_package_image)) {
      fs.unlinkSync(pkg.m_package_image);
    }

    await Package.findByIdAndDelete(id);

    res.json({
      status: true,
      message: "Package deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  addPackage,
  getAllPackages,
  getPackagesByCourse,
  updatePackage,
  deletePackage
};