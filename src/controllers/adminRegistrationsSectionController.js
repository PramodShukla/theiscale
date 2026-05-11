const Enrollment = require("../models/course_enrollment");
const Lecture = require("../models/lecture");
const LectureProgress = require("../models/lecture_progress");

// =======================================================
// GET COURSE REGISTRATIONS
// =======================================================

const getCourseRegistrations = async (req, res) => {
  try {
    // =======================================================
    // QUERY PARAMS
    // =======================================================

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const course_id = req.query.course_id;

    const from_date = req.query.from_date;

    const to_date = req.query.to_date;

    const sortBy = req.query.sortBy || "createdAt";

    const order = req.query.order === "asc" ? 1 : -1;

    // =======================================================
    // FILTER
    // =======================================================

    const filter = {};

    // course filter
    if (course_id) {
      filter.course_id = course_id;
    }

    // =======================================================
    // DATE FILTER
    // =======================================================

    if (from_date || to_date) {
      filter.createdAt = {};

      // from date
      if (from_date) {
        filter.createdAt.$gte = new Date(from_date);
      }

      // to date
      if (to_date) {
        const endDate = new Date(to_date);

        endDate.setHours(23, 59, 59, 999);

        filter.createdAt.$lte = endDate;
      }
    }

    // =======================================================
    // GET ENROLLMENTS
    // =======================================================

    let enrollments = await Enrollment.find(filter)

      .populate({
        path: "user_id",
        select: `
            c_first_name
            c_last_name
            c_email
            c_contact
          `,
      })

      .populate({
        path: "course_id",
        select: `
            m_course_title
            m_course_price
            m_course_offer_price
            m_course_duration_app
            m_course_duration_web
          `,
      })

      .sort({
        [sortBy]: order,
      })

      .skip(skip)

      .limit(limit)

      .lean();

    // =======================================================
    // SEARCH FILTER
    // =======================================================

    if (search) {
      const searchText = search.toLowerCase();

      enrollments = enrollments.filter((item) => {
        const studentName =
          `${item.user_id?.c_first_name || ""} ${item.user_id?.c_last_name || ""}`.toLowerCase();

        const email = item.user_id?.c_email?.toLowerCase() || "";

        const phone = String(item.user_id?.c_contact || "");

        const courseName = item.course_id?.m_course_title?.toLowerCase() || "";

        return (
          studentName.includes(searchText) ||
          email.includes(searchText) ||
          phone.includes(searchText) ||
          courseName.includes(searchText)
        );
      });
    }

    // =======================================================
    // DYNAMIC PROGRESS
    // =======================================================

    const finalData = await Promise.all(
      enrollments.map(async (enrollment) => {
        // total lectures
        const totalLectures = await Lecture.countDocuments({
          ml_course: enrollment.course_id?._id,
        });

        // completed lectures
        const completedLectures = await LectureProgress.countDocuments({
          user_id: enrollment.user_id?._id,

          course_id: enrollment.course_id?._id,

          is_completed: true,
        });

        // progress %
        const progress =
          totalLectures === 0
            ? 0
            : Math.round((completedLectures / totalLectures) * 100);

        return {
          enrollment_id: enrollment._id,

          // =====================================
          // STUDENT
          // =====================================

          student_name: `${enrollment.user_id?.c_first_name || ""} ${enrollment.user_id?.c_last_name || ""}`,

          student_email: enrollment.user_id?.c_email || null,

          student_phone: enrollment.user_id?.c_contact || null,

          // =====================================
          // COURSE
          // =====================================

          course_id: enrollment.course_id?._id || null,

          course_name: enrollment.course_id?.m_course_title || null,

          registration_date: enrollment.enrolled_on,

          // =====================================
          // PAYMENT
          // =====================================

          course_amount:
            enrollment.original_amount ||
            enrollment.course_id?.m_course_price ||
            0,

          offer_amount:
            enrollment.offer_amount ||
            enrollment.course_id?.m_course_offer_price ||
            0,

          discount_amount: enrollment.discount_amount || 0,

          payable_amount: enrollment.payable_amount || enrollment.amount || 0,

          // =====================================
          // PROGRESS
          // =====================================

          total_lectures: totalLectures,

          completed_lectures: completedLectures,

          course_progress: progress,

          // =====================================
          // CERTIFICATE
          // =====================================

          certificate_status: enrollment.certificate_status || "pending",

          // =====================================
          // ACCESS
          // =====================================

          access_type: enrollment.access_type || "lifetime",

          expiry_date: enrollment.expiry_date || null,

          days_left:
            enrollment.access_type === "limited" && enrollment.expiry_date
              ? Math.max(
                  0,
                  Math.ceil(
                    (new Date(enrollment.expiry_date) - new Date()) /
                      (1000 * 60 * 60 * 24),
                  ),
                )
              : null,

          // =====================================
          // STATUS
          // =====================================

          enrollment_status: enrollment.status,

          createdAt: enrollment.createdAt,
        };
      }),
    );

    // =======================================================
    // TOTAL COUNT
    // =======================================================

    const total = await Enrollment.countDocuments(filter);

    // =======================================================
    // RESPONSE
    // =======================================================

    return res.status(200).json({
      status: true,

      message: "Course registrations fetched successfully",

      current_page: page,

      total_pages: Math.ceil(total / limit),

      total_records: total,

      data: finalData,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCourseRegistrations,
};
