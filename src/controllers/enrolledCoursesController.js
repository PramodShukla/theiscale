const mongoose = require("mongoose");

const Enrollment = require("../models/course_enrollment");
const Course = require("../models/course");
const Subject = require("../models/subject");
const Lecture = require("../models/lecture");
const LectureProgress = require("../models/lecture_progress");

// const CourseEnrollment = require("../models/courseEnrollment");
// const Subject = require("../models/subject");
// const Lecture = require("../models/lecture");
// const LectureProgress = require("../models/lectureProgress");

// GET ENROLLED FREE COURSES
const getEnrolledFreeCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const enrollments = await Enrollment.find({
      user_id: userId,
      course_type: "free",
      status: "active",
    })

      // FULL COURSE DETAILS
      .populate({
        path: "course_id",

        populate: [
          {
            path: "m_course_category",
            model: "category",
          },
          {
            path: "m_course_trainee",
            model: "instructor",
          },
        ],
      })

      .sort({ enrolled_on: -1 });

    // remove deleted/null courses
    const filteredCourses = enrollments.filter((item) => item.course_id);

    return res.status(200).json({
      status: true,
      message: "Free enrolled courses fetched successfully",
      total: filteredCourses.length,
      data: filteredCourses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// GET ENROLLED PREMIUM COURSES
const getEnrolledPremiumCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const enrollments = await Enrollment.find({
      user_id: userId,
      course_type: "paid",
      status: "active",
    })

      // FULL COURSE DETAILS
      .populate({
        path: "course_id",

        populate: [
          {
            path: "m_course_category",
            model: "category",
          },
          {
            path: "m_course_trainee",
            model: "instructor",
          },
        ],
      })

      .sort({ enrolled_on: -1 });

    // remove deleted/null courses
    const filteredCourses = enrollments.filter((item) => item.course_id);

    return res.status(200).json({
      status: true,
      message: "Premium enrolled courses fetched successfully",
      total: filteredCourses.length,
      data: filteredCourses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// GET FULL ENROLLED COURSE DETAILS
const getEnrolledCourseFullDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const { course_id } = req.params;

    // VALIDATION

    if (!course_id) {
      return res.status(400).json({
        status: false,
        message: "Course ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(course_id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid course ID",
      });
    }

    // CHECK ENROLLMENT
    const enrollment = await Enrollment.findOne({
      user_id: userId,
      course_id: course_id,
      status: "active",
    }).lean();

    if (!enrollment) {
      return res.status(403).json({
        status: false,
        message: "You are not enrolled in this course",
      });
    }

    // PAID COURSE PAYMENT CHECK
    if (
      enrollment.course_type === "paid" &&
      enrollment.payment_status !== "success"
    ) {
      return res.status(403).json({
        status: false,
        message: "Payment not completed",
      });
    }

    // EXPIRY CHECK
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

    // COURSE DETAILS
    const course = await Course.findById(course_id)
      .populate("m_course_category")
      .populate("m_course_trainee")
      .lean();

    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found",
      });
    }

    // SUBJECTS
    const subjects = await Subject.find({
      m_subject_course: course_id,
    })
      .sort({ created_at: 1 })
      .lean();

    const subjectIds = subjects.map((subject) => subject._id);

    // LECTURES
    const lectures = await Lecture.find({
      ml_subject: { $in: subjectIds },
    })
      .sort({ ml_seq: 1, _id: 1 })
      .lean();

    // COMPLETED LECTURES
    const completedLectures = await LectureProgress.find({
      user_id: userId,
      lecture_id: {
        $in: lectures.map((lecture) => lecture._id),
      },
      is_completed: true,
    }).select("lecture_id");

    // COMPLETED SET
    const completedSet = new Set(
      completedLectures.map((item) => item.lecture_id.toString()),
    );

    // SUBJECT WISE DATA
    const subjectWiseData = subjects.map((subject) => {
      const subjectLectures = lectures
        .filter(
          (lecture) => lecture.ml_subject.toString() === subject._id.toString(),
        )
        .map((lecture) => ({
          lecture_id: lecture._id,

          lecture_title: lecture.ml_title,

          lecture_code: lecture.ml_code,

          lecture_type: lecture.ml_type,

          lecture_subtype: lecture.ml_stype,

          lecture_video_id: lecture.ml_video_id,

          lecture_file: lecture.ml_file,

          lecture_pdf: lecture.ml_pdffile,

          lecture_sequence: lecture.ml_seq,

          lecture_status: lecture.ml_status,

          lecture_added_on: lecture.ml_added_on,

          is_completed: completedSet.has(lecture._id.toString()),
        }));

      return {
        subject_id: subject._id,

        subject_title: subject.m_subject_title,

        subject_description: subject.m_subject_desc,

        total_lectures: subjectLectures.length,

        lectures: subjectLectures,
      };
    });

    // COUNTS
    const totalLectures = lectures.length;

    const completedCount = completedLectures.length;

    const progress =
      totalLectures === 0
        ? 0
        : Math.round((completedCount / totalLectures) * 100);

    // RESPONSE
    return res.status(200).json({
      status: true,
      message: "Enrolled course full details fetched successfully",

      progress,

      total_subjects: subjects.length,

      total_lectures: totalLectures,

      completed_lectures: completedCount,

      course,

      subjects: subjectWiseData,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getCourseAccessDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const { course_id } = req.body;

    if (!course_id) {
      return res.status(400).json({
        status: false,
        message: "course_id is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(course_id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid course id",
      });
    }

    const enrollment = await Enrollment.findOne({
      user_id: userId,
      course_id,
    }).populate("course_id", "m_course_title");

    if (!enrollment) {
      return res.status(200).json({
        status: true,
        is_enrolled: false,
        message: "User not enrolled in this course",
      });
    }

    let remainingDays = null;

    if (enrollment.access_type === "limited" && enrollment.expiry_date) {
      const today = new Date();

      const expiry = new Date(enrollment.expiry_date);

      remainingDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

      if (remainingDays < 0) {
        remainingDays = 0;
      }
    }

    return res.status(200).json({
      status: true,

      is_enrolled: true,

      course_id: enrollment.course_id?._id,

      course_name: enrollment.course_id?.m_course_title,

      access_type: enrollment.access_type,

      expiry_date: enrollment.expiry_date,

      remaining_days: remainingDays,

      test_series_status: enrollment.test_series_status,

      live_class_status: enrollment.live_class_status,

      certificate_status: enrollment.certificate_status,

      certificate_no: enrollment.certificate_no,

      certificate_pdf: enrollment.certificate_pdf,

      certificate_date: enrollment.certificate_date,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Mobile Apis=============================================================================================================================



const appGetMyCourses = async (req, res) => {
  try {
    const user_id = req.user.id;

    const enrollments = await Enrollment.find({
      user_id,
      status: 1,
    })
      .populate("course_id")
      .sort({ enrolled_on: -1 });

    const user_courses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = enrollment.course_id;

        if (!course) return null;

        // Total Subjects
        const totalSubjects = await Subject.countDocuments({
          m_subject_course: course._id,
        });

        // Total Lectures
        const totalLectures = await Lecture.countDocuments({
          ml_course: course._id,
        });

        // Completed Lectures
        const completedLectures = await LectureProgress.countDocuments({
          user_id,
          course_id: course._id,
          is_completed: true,
        });

        // Progress %
        const progress =
          totalLectures > 0
            ? Math.round((completedLectures / totalLectures) * 100)
            : 0;

        // Remaining Days
        let remainingDays = 0;

        if (enrollment.access_type === "limited" && enrollment.expiry_date) {
          const diff = new Date(enrollment.expiry_date).getTime() - Date.now();

          remainingDays =
            diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
        }

        return {
          course_id: course._id,
          course_name: course.m_course_title || "",
          course_image: course.m_course_banner || "",
          course_price: course.m_course_price || 0,
          course_offerprice: course.m_course_offer_price || 0,
          course_views: course.m_course_view || 0,
          course_rating: course.m_course_rating || 0,
          course_reviews: course.m_course_reviews || 0,
          course_duration: course.m_course_duration_app || 0,

          registration_date: enrollment.enrolled_on
            ? enrollment.enrolled_on.toISOString().split("T")[0]
            : "",

          remaining_days: remainingDays,

          total_subjects: totalSubjects,

          progress: progress,
        };
      }),
    );

    return res.status(200).json({
      response: "success",
      user_courses: user_courses.filter(Boolean),
    });
  } catch (error) {
    return res.status(500).json({
      response: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  getEnrolledFreeCourses,
  getEnrolledPremiumCourses,
  getEnrolledCourseFullDetails,
  getCourseAccessDetails,
  appGetMyCourses
};
