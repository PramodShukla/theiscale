// const Course = require("../models/course");
// const Enrollment = require("../models/course_enrollment");

// // ===============================
// //  ENROLL COURSE
// // ===============================
// const enrollCourse = async (req, res) => {
//   try {
//     const user_id = req.user.id; // auth middleware se aayega
//     const { course_id } = req.body;

//     if (!course_id) {
//       return res.status(400).json({
//         status: false,
//         message: "Course ID is required",
//       });
//     }

//     //  Check course exist
//     const course = await Course.findById(course_id);

//     if (!course) {
//       return res.status(404).json({
//         status: false,
//         message: "Course not found",
//       });
//     }

//     //  Duplicate check
//     const alreadyEnrolled = await Enrollment.findOne({
//       user_id,
//       course_id,
//     });

//     if (alreadyEnrolled) {
//       return res.status(400).json({
//         status: false,
//         message: "Already enrolled",
//       });
//     }

//     // ===============================
//     //  FREE COURSE
//     // ===============================
//     if (course.m_course_type === 1) {
//       const enroll = await Enrollment.create({
//         user_id,
//         course_id,
//         course_type: "free",
//         payment_status: "success",
//         amount: 0,
//         access_type: "lifetime",
//         expiry_date: null,
//       });

//       return res.json({
//         status: true,
//         message: "Enrolled successfully (Free)",
//         data: enroll,
//       });
//     }

//     // ===============================
//     //  PAID COURSE
//     // ===============================
//     if (course.m_course_type === 2) {
//       //  TEMP (payment gateway nahi hai)
//       const payment_status = "success";

//       let expiry_date = null;
//       let access_type = "lifetime";

//       if (course.m_course_duration_months) {
//         access_type = "limited";

//         const today = new Date();
//         expiry_date = new Date();
//         expiry_date.setMonth(
//           today.getMonth() + course.m_course_duration_months,
//         );
//       }

//       // if (course.m_course_access_type === "limited") {
//       //   const expiryDate = new Date();
//       //   expiryDate.setDate(expiryDate.getDate() + course.m_course_access_days);

//       //   enrollment.expiry_date = expiryDate;
//       // } else {
//       //   enrollment.expiry_date = null;
//       // }

//       if (course.m_course_access_type === "limited") {
//         access_type = "limited";

//         expiry_date = new Date();
//         expiry_date.setDate(
//           expiry_date.getDate() + course.m_course_access_days,
//         );
//       } else {
//         expiry_date = null;
//       }

//       const enroll = await Enrollment.create({
//         user_id,
//         course_id,
//         course_type: "paid",
//         payment_status,
//         amount: course.m_course_offer_price || course.m_course_price || 0,
//         access_type,
//         expiry_date,
//       });

//       return res.json({
//         status: true,
//         message: "Enrolled successfully (Paid)",
//         data: enroll,
//       });
//     }

//     return res.status(400).json({
//       status: false,
//       message: "Invalid course type",
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };

// module.exports = {
//   enrollCourse,
// };




const Course = require("../models/course");
const Enrollment = require("../models/course_enrollment");

// ===============================
// ENROLL COURSE
// ===============================
const enrollCourse = async (req, res) => {
  try {

    const user_id = req.user.id;

    const { course_id, coupon_code } = req.body;

    // ===============================
    // VALIDATION
    // ===============================

    if (!course_id) {
      return res.status(400).json({
        status: false,
        message: "Course ID is required",
      });
    }

    // ===============================
    // CHECK COURSE
    // ===============================

    const course = await Course.findById(course_id);

    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found",
      });
    }

    // ===============================
    // DUPLICATE CHECK
    // ===============================

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
    // FREE COURSE
    // ===============================

    if (course.m_course_type === 1) {

      const enroll = await Enrollment.create({
        user_id,
        course_id,

        course_type: "free",

        payment_status: "success",

        amount: 0,

        original_amount: 0,
        offer_amount: 0,
        discount_amount: 0,
        payable_amount: 0,

        coupon_code: coupon_code || null,

        access_type: "lifetime",

        expiry_date: null,

        progress: 0,

        status: "active",

        app_status: "active",
        android_status: "active",
        ios_status: "active",

        test_series_status: "inactive",
        live_class_status: "inactive",

        certificate_status: "pending",
      });

      return res.status(200).json({
        status: true,
        message: "Enrolled successfully (Free)",
        data: enroll,
      });
    }

    // ===============================
    // PAID COURSE
    // ===============================

    if (course.m_course_type === 2) {

      // TEMP PAYMENT STATUS
      const payment_status = "success";

      // ===============================
      // ACCESS LOGIC
      // ===============================

      let expiry_date = null;

      let access_type = "lifetime";

      if (course.m_course_access_type === "limited") {

        access_type = "limited";

        expiry_date = new Date();

        expiry_date.setDate(
          expiry_date.getDate() + course.m_course_access_days
        );
      }

      // ===============================
      // PRICE CALCULATION
      // ===============================

      const originalAmount =
        course.m_course_price || 0;

      const offerAmount =
        course.m_course_offer_price || originalAmount;

      const discountAmount =
        originalAmount - offerAmount;

      const payableAmount =
        offerAmount;

      // ===============================
      // CREATE ENROLLMENT
      // ===============================

      const enroll = await Enrollment.create({
        user_id,
        course_id,

        course_type: "paid",

        payment_status,

        amount: payableAmount,

        original_amount: originalAmount,

        offer_amount: offerAmount,

        discount_amount: discountAmount,

        payable_amount: payableAmount,

        coupon_code: coupon_code || null,

        access_type,

        expiry_date,

        progress: 0,

        status: "active",

        app_status: "active",
        android_status: "active",
        ios_status: "active",

        test_series_status: "inactive",
        live_class_status: "inactive",

        certificate_status: "pending",
      });

      return res.status(200).json({
        status: true,
        message: "Enrolled successfully (Paid)",
        data: enroll,
      });
    }

    // ===============================
    // INVALID COURSE TYPE
    // ===============================

    return res.status(400).json({
      status: false,
      message: "Invalid course type",
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      status: false,
      message: err.message,
    });

  }
};

module.exports = {
  enrollCourse,
};