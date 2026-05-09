const Candidate = require("../models/candidates");
const Enrollment = require("../models/course_enrollment");
const Course = require("../models/course");

exports.getDashboard = async (req, res) => {
  try {

    const userId = req.user.id;

    // ===============================
    // USER
    // ===============================
    const user = await Candidate.findById(userId)
      .select("c_first_name c_last_name");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // ===============================
    // ENROLLMENTS
    // ===============================
    const enrollments = await Enrollment.find({
      user_id: userId,
      status: "active",
    }).select("course_id");

    const courseIds = enrollments.map(
      (e) => e.course_id
    );

    // ===============================
    // COURSES
    // ===============================
    const courses = await Course.find({
      _id: { $in: courseIds },
    }).select("m_course_type");

    // ===============================
    // COUNT
    // ===============================
    let freeCourses = 0;
    let premiumCourses = 0;

    courses.forEach((course) => {

      if (course.m_course_type === 1) {
        freeCourses++;
      }

      if (course.m_course_type === 2) {
        premiumCourses++;
      }

    });

    // ===============================
    // RESPONSE
    // ===============================
    res.status(200).json({
      status: true,
      data: {
        name:
          `${user.c_first_name} ${user.c_last_name}`,
        freeCourses,
        premiumCourses,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      status: false,
      message: error.message,
    });

  }
};