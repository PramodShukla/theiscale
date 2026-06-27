const Enrollment = require("../models/course_enrollment");

const Lecture = require("../models/lecture");

const LectureProgress = require("../models/lecture_progress");

const {
  generateCertificatePDF,
  generateUniqueCertNo,
} = require("../utils/certificateGenerator");

const fs = require("fs");

const path = require("path");

// =======================================================
// CALCULATE COURSE PROGRESS
// =======================================================

const calculateProgress = async (userId, courseId) => {
  const totalLectures = await Lecture.countDocuments({
    ml_course: courseId,
  });

  const completedLectures = await LectureProgress.countDocuments({
    user_id: userId,
    course_id: courseId,
    is_completed: true,
  });

  const progress =
    totalLectures === 0
      ? 0
      : Math.round((completedLectures / totalLectures) * 100);

  return progress;
};

// =======================================================
// GET CERTIFICATE STATUS
// =======================================================

const getCertificateStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const courseId = req.params.course_id;

    const enrollment = await Enrollment.findOne({
      user_id: userId,
      course_id: courseId,
    });

    if (!enrollment) {
      return res.status(404).json({
        status: false,
        message: "Enrollment not found",
      });
    }

    const progress = await calculateProgress(userId, courseId);

    return res.status(200).json({
      status: true,

      course_progress: progress,

      certificate_eligible: progress >= 90,

      certificate_status: enrollment.certificate_status,

      certificate_no: enrollment.certificate_no,

      certificate_pdf: enrollment.certificate_pdf,

      declined_reason: enrollment.certificate_declined_reason,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// =======================================================
// REQUEST CERTIFICATE
// =======================================================

const requestCertificate = async (req, res) => {
  try {
    const userId = req.user.id;

    const { course_id } = req.body;

    const enrollment = await Enrollment.findOne({
      user_id: userId,
      course_id,
    });

    if (!enrollment) {
      return res.status(404).json({
        status: false,
        message: "Enrollment not found",
      });
    }

    const progress = await calculateProgress(userId, course_id);

    // minimum 90%
    // if (progress < 90) {

    //   return res.status(400).json({
    //     status: false,
    //     message:
    //       "Minimum 90% course completion required",
    //   });

    // }

    // already pending
    if (enrollment.certificate_status === 1) {
      return res.status(400).json({
        status: false,
        message: "Certificate request already submitted",
      });
    }

    enrollment.certificate_status = 1;

    enrollment.certificate_declined_reason = null;

    await enrollment.save();

    return res.status(200).json({
      status: true,

      message: "Certificate request submitted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// =======================================================
// GET ALL CERTIFICATE REQUESTS
// =======================================================

const getCertificateRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const status = req.query.status;

    const course_id = req.query.course_id;

    const from_date = req.query.from_date;

    const to_date = req.query.to_date;

    const filter = {
      certificate_status: {
        $ne: 0,
      },
    };

    // =========================================
    // STATUS FILTER
    // =========================================

    if (status) {
      filter.certificate_status = Number(status);
    }

    // =========================================
    // COURSE FILTER
    // =========================================

    if (course_id) {
      filter.course_id = course_id;
    }

    // =========================================
    // DATE FILTER
    // =========================================

    if (from_date || to_date) {
      filter.createdAt = {};

      // only from date
      if (from_date) {
        filter.createdAt.$gte = new Date(from_date);
      }

      // only to date
      if (to_date) {
        const endDate = new Date(to_date);

        endDate.setHours(23, 59, 59, 999);

        filter.createdAt.$lte = endDate;
      }
    }

    let enrollments = await Enrollment.find(filter)

      .populate({
        path: "user_id",
        select: `
            c_first_name
            c_last_name
            c_email
          `,
      })

      .populate({
        path: "course_id",
        select: `
            m_course_title
          `,
      })

      .sort({
        createdAt: -1,
      })

      .skip(skip)

      .limit(limit)

      .lean();

    // search
    if (search) {
      const text = search.toLowerCase();

      enrollments = enrollments.filter((item) => {
        const student =
          `${item.user_id?.c_first_name || ""} ${item.user_id?.c_last_name || ""}`.toLowerCase();

        const course = item.course_id?.m_course_title?.toLowerCase() || "";

        return student.includes(text) || course.includes(text);
      });
    }

    const finalData = await Promise.all(
      enrollments.map(async (item) => {
        const progress = await calculateProgress(
          item.user_id?._id,
          item.course_id?._id,
        );

        return {
          enrollment_id: item._id,

          student_name: `${item.user_id?.c_first_name || ""} ${item.user_id?.c_last_name || ""}`,

          student_email: item.user_id?.c_email || null,

          course_name: item.course_id?.m_course_title || null,

          registration_date: item.enrolled_on,

          course_progress: progress,

          certificate_status: item.certificate_status || 1,

          certificate_no: item.certificate_no || null,

          certificate_pdf: item.certificate_pdf || null,

          declined_reason: item.certificate_declined_reason || null,
        };
      }),
    );

    return res.status(200).json({
      status: true,

      current_page: page,

      total_records: await Enrollment.countDocuments(filter),

      data: finalData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// =======================================================
// UPDATE CERTIFICATE STATUS
// =======================================================

// const updateCertificateStatus = async (req, res) => {
//   try {
//     const enrollmentId = req.params.enrollment_id;

//     const { status, certificate_no, declined_reason } = req.body;

//     const enrollment = await Enrollment.findById(enrollmentId);

//     if (!enrollment) {
//       return res.status(404).json({
//         status: false,
//         message: "Enrollment not found",
//       });
//     }

//     // APPROVED
//     if (status === 2) {
//       // certificate number required
//       if (!certificate_no) {
//         return res.status(400).json({
//           status: false,
//           message: "Certificate number required",
//         });
//       }

//       // pdf required
//       if (!req.files || !req.files.certificate_pdf) {
//         return res.status(400).json({
//           status: false,
//           message: "Certificate PDF required",
//         });
//       }

//       // uploaded pdf path
//       const certificatePdf = req.files.certificate_pdf[0].path;

//       enrollment.certificate_status = 2;

//       enrollment.certificate_no = certificate_no;

//       enrollment.certificate_pdf = certificatePdf;

//       enrollment.certificate_approved_at = new Date();

//       enrollment.certificate_declined_reason = null;
//     }

//     // DECLINED
//     else if (Number(status) === 3) {
//       enrollment.certificate_status = 3;

//       enrollment.certificate_declined_reason = declined_reason || null;

//       enrollment.certificate_no = null;

//       enrollment.certificate_pdf = null;
//     }

//     // PENDING
//     else {
//       enrollment.certificate_status = 1;

//       enrollment.certificate_no = null;

//       enrollment.certificate_pdf = null;

//       enrollment.certificate_declined_reason = null;
//     }

//     await enrollment.save();

//     return res.status(200).json({
//       status: true,

//       message: "Certificate status updated successfully",
//     });
//   } catch (error) {
//     // delete uploaded certificate pdf if error occurs
//     if (
//       req.files &&
//       req.files.certificate_pdf &&
//       req.files.certificate_pdf[0]
//     ) {
//       const filePath = req.files.certificate_pdf[0].path;

//       // check file exists
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//       }
//     }
//     return res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

// const updateCertificateStatus = async (req, res) => {
//   try {
//     const enrollmentId = req.params.enrollment_id;
//     const { status, declined_reason } = req.body; // Ab certificate_no body se lene ki zarurat nahi

//     const enrollment = await Enrollment.findById(enrollmentId)
//       .populate("user_id")
//       .populate("course_id");

//     if (!enrollment) {
//       return res
//         .status(404)
//         .json({ status: false, message: "Enrollment not found" });
//     }

//     // APPROVED
//     if (Number(status) === 2) {
//       // 1. Unique No Generate karein
//       const uniqueCertNo = generateUniqueCertNo();

//       // 2. Data nikaalein
//       const userName = `${enrollment.user_id.c_first_name} ${enrollment.user_id.c_last_name}`;
//       const courseTitle = enrollment.course_id.m_course_title;

//       // 3. PDF Generate karein
//       const filePath = await generateCertificatePDF(
//         userName,
//         courseTitle,
//         uniqueCertNo,
//       );

//       // 4. DB Update
//       enrollment.certificate_status = 2;
//       enrollment.certificate_no = uniqueCertNo;
//       enrollment.certificate_pdf = filePath;
//       enrollment.certificate_approved_at = new Date();
//       enrollment.certificate_declined_reason = null;
//     }

//     // DECLINED
//     else if (Number(status) === 3) {
//       enrollment.certificate_status = 3;
//       enrollment.certificate_declined_reason =
//         declined_reason || "Criteria not met";
//       enrollment.certificate_no = null;
//       enrollment.certificate_pdf = null;
//     }

//     // PENDING (Status 1)
//     else {
//       enrollment.certificate_status = 1;
//       enrollment.certificate_no = null;
//       enrollment.certificate_pdf = null;
//     }

//     await enrollment.save();

//     return res.status(200).json({
//       status: true,
//       message: "Certificate status updated and PDF generated successfully",
//       data: {
//         cert_no: enrollment.certificate_no,
//         pdf_url: enrollment.certificate_pdf,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       status: false,
//       message: "Error: " + error.message,
//     });
//   }
// };

const updateCertificateStatus = async (req, res) => {
  try {
    const enrollmentId = req.params.enrollment_id;
    const { status, declined_reason } = req.body;

    // Deep Population का उपयोग करें ताकि course के अंदर category मिल सके
    const enrollment = await Enrollment.findById(enrollmentId)
      .populate("user_id")
      .populate({
        path: "course_id",
        populate: {
          path: "m_course_category", // यह field name है आपके courseSchema में
          model: "category", // यह model name है
        },
      });

    if (!enrollment) {
      return res
        .status(404)
        .json({ status: false, message: "Enrollment not found" });
    }

    // APPROVED
    if (Number(status) === 2) {
      // 1. Unique No Generate karein (Pass Enrollment model)
      const uniqueCertNo = await generateUniqueCertNo(Enrollment);

      // 2. Data nikaalein
      const userName = `${enrollment.user_id.c_first_name} ${enrollment.user_id.c_last_name}`;
      const courseTitle = enrollment.course_id.m_course_title;

      // Category Name extract karein (Safe access)
      const categoryName =
        enrollment.course_id.m_course_category?.m_category_name || "bootcamp";

      // 3. PDF Generate karein (Category Name ke saath)
      const filePath = await generateCertificatePDF(
        userName,
        courseTitle,
        categoryName, // यहाँ categoryName भेजा जा रहा है
        uniqueCertNo,
      );

      // 4. DB Update
      enrollment.certificate_status = 2;
      enrollment.certificate_no = uniqueCertNo;
      enrollment.certificate_pdf = filePath;
      enrollment.certificate_approved_at = new Date();
      enrollment.certificate_declined_reason = null;
    }

    // DECLINED
    else if (Number(status) === 3) {
      enrollment.certificate_status = 3;
      enrollment.certificate_declined_reason =
        declined_reason || "Criteria not met";
      enrollment.certificate_no = null;
      enrollment.certificate_pdf = null;
    }

    // PENDING (Status 1)
    else {
      enrollment.certificate_status = 1;
      enrollment.certificate_no = null;
      enrollment.certificate_pdf = null;
    }

    await enrollment.save();

    return res.status(200).json({
      status: true,
      message: "Certificate status updated and PDF generated successfully",
      data: {
        cert_no: enrollment.certificate_no,
        pdf_url: enrollment.certificate_pdf,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Error: " + error.message,
    });
  }
};

// =======================================================
// DOWNLOAD CERTIFICATE
// =======================================================

const downloadCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.course_id;

    const enrollment = await Enrollment.findOne({
      user_id: userId,
      course_id: courseId,
    });

    if (!enrollment) {
      return res.status(404).json({
        status: false,
        message: "Enrollment not found",
      });
    }

    if (enrollment.certificate_status !== 2) {
      return res.status(400).json({
        status: false,
        message: "Certificate not approved yet",
      });
    }

    const filePath = enrollment.certificate_pdf;

    if (!filePath || !fs.existsSync(filePath)) {
      return res.status(404).json({
        status: false,
        message: "Certificate file not found",
      });
    }

    res.download(filePath); //  actual download starts here
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCertificateStatus,

  requestCertificate,

  getCertificateRequests,

  updateCertificateStatus,

  downloadCertificate,
};
