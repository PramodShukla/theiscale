const Subject = require("../models/subject");
const Enrollment = require("../models/course_enrollment");
const mongoose = require("mongoose");

exports.checkCourseAccessMiddleware = async (req, res, next) => {
  try {
    const { subject_id } = req.params;

    // 1. VALIDATION
    if (!mongoose.Types.ObjectId.isValid(subject_id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid subject id",
      });
    }

    // 2. SUBJECT → COURSE FIND ✅
    const subject = await Subject.findById(subject_id)
      .select("m_subject_course");

    if (!subject) {
      return res.status(404).json({
        status: false,
        message: "Subject not found",
      });
    }

    if (!subject.m_subject_course) {
      return res.status(400).json({
        status: false,
        message: "Course not linked with this subject",
      });
    }

    const courseId = subject.m_subject_course;

    // 3. ENROLLMENT CHECK
    const enrollment = await Enrollment.findOne({
      user_id: req.user.id,
      course_id: courseId,
      status: 1,
    }).lean();

    if (!enrollment) {
      return res.status(403).json({
        status: false,
        message: "You are not enrolled in this course",
      });
    }

    // 4. PAID CHECK
    if (
      enrollment.course_type === 2 &&
      enrollment.payment_status !== 1
    ) {
      return res.status(403).json({
        status: false,
        message: "Payment not completed",
      });
    }

    // 5. EXPIRY CHECK
    if (
      enrollment.access_type === "limited" &&
      enrollment.expiry_date &&
      new Date() > new Date(enrollment.expiry_date)
    ) {
      return res.status(403).json({
        status: false,
        message: "Course access expired",
      });
    }

    // 6. ATTACH
    req.courseId = courseId;
    req.enrollment = enrollment;

    next();

  } catch (error) {
    console.error("Middleware Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};