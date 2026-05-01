const Subject = require("../models/subject");
const Course = require("../models/course");
const fs = require("fs");
const mongoose = require("mongoose");

// ===============================
// ADD SUBJECT
// ===============================
const addSubject = async (req, res) => {
  try {
    const {
      m_subject_title,
      m_subject_course,
      m_subject_desc,
      m_subject_status,
      m_subject_seq,
      m_subject_for,
    } = req.body;

    // REQUIRED VALIDATION
    if (!m_subject_title || !m_subject_course) {
      return res.status(400).json({
        status: false,
        message: "Subject title and course are required",
      });
    }

    // CHECK COURSE EXISTS
    const course = await Course.findById(m_subject_course);
    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found",
      });
    }

    // IMAGE
    let icon = null;
    if (req.files?.m_subject_icon) {
      icon = req.files.m_subject_icon[0].path;
    }

    const subject = new Subject({
      m_subject_title,
      m_subject_course,
      m_subject_course_slug: course.slug,
      m_subject_icon: icon,
      m_subject_desc,
      m_subject_status: m_subject_status ? Number(m_subject_status) : 1,
      m_subject_seq: m_subject_seq ? Number(m_subject_seq) : null,
      m_subject_for: m_subject_for ? Number(m_subject_for) : 1,
    });

    const saved = await subject.save();

    res.status(201).json({
      status: true,
      message: "Subject added successfully",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// GET ALL SUBJECTS
// ===============================
const getAllSubjects = async (req, res) => {
  try {
    const data = await Subject.find()
      .populate("m_subject_course", "title slug")
      .sort({ m_subject_seq: 1, _id: -1 });

    res.json({
      status: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// GET BY COURSE ID
// ===============================
const getSubjectsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid course ID",
      });
    }

    const data = await Subject.find({
      m_subject_course: courseId,
    }).sort({ m_subject_seq: 1 });

    res.json({
      status: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// UPDATE SUBJECT
// ===============================
const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({
        status: false,
        message: "Subject not found",
      });
    }

    const {
      m_subject_title,
      m_subject_desc,
      m_subject_status,
      m_subject_seq,
    } = req.body;

    if (m_subject_title) subject.m_subject_title = m_subject_title;
    if (m_subject_desc) subject.m_subject_desc = m_subject_desc;
    if (m_subject_status !== undefined)
      subject.m_subject_status = Number(m_subject_status);
    if (m_subject_seq !== undefined)
      subject.m_subject_seq = Number(m_subject_seq);

    // IMAGE UPDATE
    if (req.files?.m_subject_icon) {
      if (subject.m_subject_icon && fs.existsSync(subject.m_subject_icon)) {
        fs.unlinkSync(subject.m_subject_icon);
      }
      subject.m_subject_icon = req.files.m_subject_icon[0].path;
    }

    const updated = await subject.save();

    res.json({
      status: true,
      message: "Subject updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// DELETE SUBJECT
// ===============================
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({
        status: false,
        message: "Subject not found",
      });
    }

    if (subject.m_subject_icon && fs.existsSync(subject.m_subject_icon)) {
      fs.unlinkSync(subject.m_subject_icon);
    }

    await Subject.findByIdAndDelete(id);

    res.json({
      status: true,
      message: "Subject deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// GET SUBJECT DROPDOWN BY COURSE
// ===============================
const getSubjectDropdownByCourse = async (req, res) => {
  try {
    const { m_course_id } = req.query;

    // 🔴 validation
    if (!m_course_id) {
      return res.status(400).json({
        status: false,
        message: "course_id is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(m_course_id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid course ID",
      });
    }

    // ✅ fetch subjects of that course
    const subjects = await Subject.find({
      m_subject_course: m_course_id,
      m_subject_status: 1, // only active
    }).select("_id m_subject_title");

    res.status(200).json({
      status: true,
      message: "Subjects fetched successfully",
      data: subjects,
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  addSubject,
  getAllSubjects,
  getSubjectsByCourse,
  updateSubject,
  deleteSubject,
  getSubjectDropdownByCourse
};