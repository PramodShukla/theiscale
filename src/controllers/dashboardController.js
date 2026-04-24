const Candidate = require("../models/master_candidates_tbl");
const Course = require("../models/master_course_tbl");
const UserCourses = require("../models/user_courses_tbl");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware

    // 1. Get user
    const user = await Candidate.findById(userId);

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    // 2. Get enrolled courses
    const enrollments = await UserCourses.find({
      t_reg_user: userId,
    });

    const courseIds = enrollments.map(e => e.t_reg_course);

    // 3. Get course details
    const courses = await Course.find({
      _id: { $in: courseIds },
    });

    // 4. Count logic
    let freeCount = 0;
    let premiumCount = 0;

    courses.forEach((c) => {
      if (c.m_course_type === 1) freeCount++;
      if (c.m_course_type === 2) premiumCount++;
    });

    // 5. Response
    res.status(200).send({
      status: true,
      data: {
        name: `${user.c_first_name} ${user.c_last_name}`,
        freeCourses: freeCount,
        premiumCourses: premiumCount,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};