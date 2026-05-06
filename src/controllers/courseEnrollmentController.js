const Course = require("../models/course");
const Enrollment = require("../models/course_enrollment");

// ===============================
//  ENROLL COURSE
// ===============================
const enrollCourse = async (req, res) => {
  try {
    const user_id = req.user.id; // auth middleware se aayega
    const { course_id } = req.body;

    if (!course_id) {
      return res.status(400).json({
        status: false,
        message: "Course ID is required",
      });
    }

    //  Check course exist
    const course = await Course.findById(course_id);

    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found",
      });
    }

    //  Duplicate check
    const alreadyEnrolled = await Enrollment.findOne({
      user_id,
      course_id,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        status: false,
        message: "Already enrolled",
      });
    }

    // ===============================
    //  FREE COURSE
    // ===============================
    if (course.m_course_type === 1) {
      const enroll = await Enrollment.create({
        user_id,
        course_id,
        course_type: "free",
        payment_status: "success",
        amount: 0,
        access_type: "lifetime",
        expiry_date: null,
      });

      return res.json({
        status: true,
        message: "Enrolled successfully (Free)",
        data: enroll,
      });
    }

    // ===============================
    //  PAID COURSE
    // ===============================
    if (course.m_course_type === 2) {
      //  TEMP (payment gateway nahi hai)
      const payment_status = "success";

      let expiry_date = null;
      let access_type = "lifetime";

      if (course.m_course_duration_months) {
        access_type = "limited";

        const today = new Date();
        expiry_date = new Date();
        expiry_date.setMonth(
          today.getMonth() + course.m_course_duration_months,
        );
      }

      if (course.m_course_access_type === "limited") {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + course.m_course_access_days);

        enrollment.expiry_date = expiryDate;
      } else {
        enrollment.expiry_date = null;
      }

      const enroll = await Enrollment.create({
        user_id,
        course_id,
        course_type: "paid",
        payment_status,
        amount: course.m_course_offer_price || course.m_course_price || 0,
        access_type,
        expiry_date,
      });

      return res.json({
        status: true,
        message: "Enrolled successfully (Paid)",
        data: enroll,
      });
    }

    return res.status(400).json({
      status: false,
      message: "Invalid course type",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  enrollCourse,
};
