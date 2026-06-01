const Candidate = require("../models/candidates");
const Course = require("../models/course");
const Quiz = require("../models/quizs");
const CourseEnrollment = require("../models/course_enrollment");
const TestPackageEnrollment = require("../models/test_package_enrollment");
const NotesEnrollment = require("../models/notes_enrollment");

const getDashboardStats = async (req, res) => {
  try {
    const [totalRegistrations, totalCourses, totalQuizzes, totalNotesSale] =
      await Promise.all([
        Candidate.countDocuments(),

        Course.countDocuments({
          m_course_status: 1,
        }),

        Quiz.countDocuments({
          m_quiz_status: 1,
        }),

        NotesEnrollment.countDocuments(),
      ]);

    const courseData = await CourseEnrollment.aggregate([
      {
        $match: {
          payment_status: "success",
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: 1,
          },
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const packageData = await TestPackageEnrollment.aggregate([
      {
        $match: {
          payment_status: "success",
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: 1,
          },
          totalRevenue: {
            $sum: "$payable_amount",
          },
        },
      },
    ]);

    const totalCourseSale =
      courseData.length > 0 ? courseData[0].totalSales : 0;

    const courseRevenue =
      courseData.length > 0 ? courseData[0].totalRevenue : 0;

    const totalPackageSale =
      packageData.length > 0 ? packageData[0].totalSales : 0;

    const packageRevenue =
      packageData.length > 0 ? packageData[0].totalRevenue : 0;

    const totalEarnings = courseRevenue + packageRevenue;

    return res.status(200).json({
      success: true,
      data: {
        totalRegistrations,
        totalCourses,
        totalQuizzes,
        totalEarnings,
        totalCourseSale,
        totalPackageSale,
        totalNotesSale,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMonthWiseRegistrations = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const registrations = await Candidate.aggregate([
      {
        $match: {
          c_register_date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$c_register_date",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const graphData = months.map((month, index) => {
      const found = registrations.find((item) => item._id.month === index + 1);

      return {
        month,
        count: found ? found.count : 0,
      };
    });

    return res.status(200).json({
      success: true,
      data: graphData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getMonthWiseRegistrations,
};
