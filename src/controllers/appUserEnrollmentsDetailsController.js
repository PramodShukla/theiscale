const mongoose = require("mongoose");
const CourseEnrollment = require("../models/course_enrollment");
const TestPackageEnrollment = require("../models/test_package_enrollment");
const NotesEnrollment = require("../models/notes_enrollment");

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const getPurchasedCoursesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    let { page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    // ==========================================
    // VALIDATE USER ID
    // ==========================================

    if (!isValidObjectId(userId)) {
      return res.status(400).send({
        status: false,
        message: "Invalid user id",
      });
    }

    // ==========================================
    // TOTAL COUNT
    // ==========================================

    const totalCount = await CourseEnrollment.countDocuments({
      user_id: userId,
    });

    // ==========================================
    // GET DATA
    // ==========================================

    const data = await CourseEnrollment.find({
      user_id: userId,
    })
      .populate(
        "course_id",
        "m_course_title m_course_banner m_course_access_type",
      )
      .sort({ enrolled_on: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // ==========================================
    // REMAINING DAYS
    // ==========================================

    const finalData = data.map((item) => {
      let remaining_days = null;

      if (item.expiry_date) {
        remaining_days = Math.ceil(
          (new Date(item.expiry_date) - new Date()) / (1000 * 60 * 60 * 24),
        );

        if (remaining_days < 0) {
          remaining_days = 0;
        }
      }

      return {
        _id: item._id,

        course_name: item.course_id?.m_course_title || null,

        registration_date: item.enrolled_on,

        amount: item.amount,

        payable_amount: item.payable_amount,

        pay_mode: item.payment_status,

        access_type: item.access_type,

        expiry_date: item.expiry_date,

        remaining_days,

        course_data: item.course_id,

        enrollment_data: item,
      };
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).send({
      status: true,

      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalRecords: totalCount,
        perPage: limit,
      },

      data: finalData,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getSinglePurchasedCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid purchased course id",
      });
    }

    // ==========================================
    // GET DATA
    // ==========================================

    const data = await CourseEnrollment.findById(id)

      .populate("user_id", "-c_password")

      .populate("course_id");

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Purchased course not found",
      });
    }

    // ==========================================
    // REMAINING DAYS
    // ==========================================

    let remaining_days = null;

    if (data.expiry_date) {
      remaining_days = Math.ceil(
        (new Date(data.expiry_date) - new Date()) / (1000 * 60 * 60 * 24),
      );

      if (remaining_days < 0) {
        remaining_days = 0;
      }
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).send({
      status: true,

      remaining_days,

      data,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const deletePurchasedCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid purchased course id",
      });
    }

    // ==========================================
    // CHECK DATA
    // ==========================================

    const data = await CourseEnrollment.findById(id);

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Purchased course not found",
      });
    }

    // ==========================================
    // DELETE
    // ==========================================

    await CourseEnrollment.findByIdAndDelete(id);

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).send({
      status: true,
      message: "Purchased course deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const updatePurchasedCourseDuration = async (req, res) => {
  try {
    const { id } = req.params;

    const { remaining_days } = req.body;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid purchased course id",
      });
    }

    // ==========================================
    // VALIDATE DAYS
    // ==========================================

    if (remaining_days === undefined || remaining_days === null) {
      return res.status(400).send({
        status: false,
        message: "Remaining days is required",
      });
    }

    if (isNaN(remaining_days) || Number(remaining_days) < 0) {
      return res.status(400).send({
        status: false,
        message: "Remaining days must be valid number",
      });
    }

    // ==========================================
    // CHECK DATA
    // ==========================================

    const data = await CourseEnrollment.findById(id);

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Purchased course not found",
      });
    }

    // ==========================================
    // NEW EXPIRY DATE
    // ==========================================

    const expiryDate = new Date();

    expiryDate.setDate(expiryDate.getDate() + Number(remaining_days));

    data.expiry_date = expiryDate;

    // ==========================================
    // SAVE
    // ==========================================

    await data.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).send({
      status: true,
      message: "Course duration updated successfully",

      expiry_date: expiryDate,

      remaining_days: Number(remaining_days),
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getPurchasedTestSeriesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    let { page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    // =====================================
    // VALIDATE USER ID
    // =====================================

    if (!isValidObjectId(userId)) {
      return res.status(400).send({
        status: false,
        message: "Invalid user id",
      });
    }

    // =====================================
    // TOTAL COUNT
    // =====================================

    const totalCount = await TestPackageEnrollment.countDocuments({
      user_id: userId,
    });

    // =====================================
    // GET DATA
    // =====================================

    const data = await TestPackageEnrollment.find({
      user_id: userId,
    })
      .populate(
        "test_package_id",
        `
            m_package_title
            m_package_image
            m_package_type
            m_package_price
            m_package_offer_price
            `,
      )
      .sort({ enrolled_on: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // =====================================
    // REMAINING DAYS
    // =====================================

    const finalData = data.map((item) => {
      let remaining_days = null;

      if (item.expiry_date) {
        remaining_days = Math.ceil(
          (new Date(item.expiry_date) - new Date()) / (1000 * 60 * 60 * 24),
        );

        if (remaining_days < 0) {
          remaining_days = 0;
        }
      }

      return {
        _id: item._id,

        test_series_name: item.test_package_id?.m_package_title || null,

        registration_date: item.enrolled_on,

        payable_amount: item.payable_amount,

        payment_status: item.payment_status,

        payment_mode: item.payment_mode,

        access_type: item.access_type,

        expiry_date: item.expiry_date,

        remaining_days,

        package_data: item.test_package_id,

        enrollment_data: item,
      };
    });

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(200).send({
      status: true,

      pagination: {
        currentPage: page,

        totalPages: Math.ceil(totalCount / limit),

        totalRecords: totalCount,

        perPage: limit,
      },

      data: finalData,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getSinglePurchasedTestSeries = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALIDATE ID
    // =====================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid purchased test-series id",
      });
    }

    // =====================================
    // GET DATA
    // =====================================

    const data = await TestPackageEnrollment.findById(id)
      .populate("user_id")
      .populate("test_package_id");

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Purchased test-series not found",
      });
    }

    // =====================================
    // REMAINING DAYS
    // =====================================

    let remaining_days = null;

    if (data.expiry_date) {
      remaining_days = Math.ceil(
        (new Date(data.expiry_date) - new Date()) / (1000 * 60 * 60 * 24),
      );

      if (remaining_days < 0) {
        remaining_days = 0;
      }
    }

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(200).send({
      status: true,

      remaining_days,

      data,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const updatePurchasedTestSeriesStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALIDATE ID
    // =====================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid purchased test-series id",
      });
    }

    // =====================================
    // CHECK ENROLLMENT
    // =====================================

    const enrollment = await TestPackageEnrollment.findById(id);

    if (!enrollment) {
      return res.status(404).send({
        status: false,
        message: "Purchased test-series not found",
      });
    }

    // =====================================
    // TOGGLE STATUS
    // =====================================

    enrollment.access_status =
      enrollment.access_status === 1 ? 0 : 1;

    // =====================================
    // SAVE
    // =====================================

    await enrollment.save();

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(200).send({
      status: true,

      message: "Purchased test-series status updated successfully",

      current_status: enrollment.access_status,

      data: enrollment,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const deletePurchasedTestSeries = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALIDATE ID
    // =====================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid purchased test-series id",
      });
    }

    // =====================================
    // CHECK DATA
    // =====================================

    const data = await TestPackageEnrollment.findById(id);

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Purchased test-series not found",
      });
    }

    // =====================================
    // DELETE
    // =====================================

    await TestPackageEnrollment.findByIdAndDelete(id);

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(200).send({
      status: true,
      message: "Purchased test-series deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getPurchasedNotesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    let { page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    // =====================================
    // VALIDATE USER ID
    // =====================================

    if (!isValidObjectId(userId)) {
      return res.status(400).send({
        status: false,
        message: "Invalid user id",
      });
    }

    // =====================================
    // TOTAL COUNT
    // =====================================

    const totalCount = await NotesEnrollment.countDocuments({
      user_id: userId,
    });

    // =====================================
    // GET DATA
    // =====================================

    const data = await NotesEnrollment.find({
      user_id: userId,
    })
      .sort({ enrolled_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // =====================================
    // REMAINING DAYS
    // =====================================

    const finalData = data.map((item) => {
      let remaining_days = null;

      if (item.expiry_date) {
        remaining_days = Math.ceil(
          (new Date(item.expiry_date) - new Date()) / (1000 * 60 * 60 * 24),
        );

        if (remaining_days < 0) {
          remaining_days = 0;
        }
      }

      return {
        _id: item._id,

        notes_name: item.notes_id?.notes_name || null,

        registration_date: item.enrolled_at,

        access_type: item.access_type,

        expiry_date: item.expiry_date,

        remaining_days,

        notes_data: item.notes_id,

        enrollment_data: item,
      };
    });

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(200).send({
      status: true,

      pagination: {
        currentPage: page,

        totalPages: Math.ceil(totalCount / limit),

        totalRecords: totalCount,

        perPage: limit,
      },

      data: finalData,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getSinglePurchasedNotes = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALIDATE ID
    // =====================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid purchased notes id",
      });
    }

    // =====================================
    // GET DATA
    // =====================================

    const data = await NotesEnrollment.findById(id)
      .populate("user_id")
      .populate("notes_id");

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Purchased notes not found",
      });
    }

    // =====================================
    // REMAINING DAYS
    // =====================================

    let remaining_days = null;

    if (data.expiry_date) {
      remaining_days = Math.ceil(
        (new Date(data.expiry_date) - new Date()) / (1000 * 60 * 60 * 24),
      );

      if (remaining_days < 0) {
        remaining_days = 0;
      }
    }

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(200).send({
      status: true,

      remaining_days,

      data,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const deletePurchasedNotes = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALIDATE ID
    // =====================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid purchased notes id",
      });
    }

    // =====================================
    // CHECK DATA
    // =====================================

    const data = await NotesEnrollment.findById(id);

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Purchased notes not found",
      });
    }

    // =====================================
    // DELETE
    // =====================================

    await NotesEnrollment.findByIdAndDelete(id);

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(200).send({
      status: true,
      message: "Purchased notes deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const updatePurchasedNotesStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALIDATE ID
    // =====================================
    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid notes enrollment id",
      });
    }

    // =====================================
    // CHECK ENROLLMENT
    // =====================================
    const enrollment = await NotesEnrollment.findById(id);

    if (!enrollment) {
      return res.status(404).send({
        status: false,
        message: "Notes enrollment not found",
      });
    }

    // =====================================
    // TOGGLE STATUS
    // =====================================
    enrollment.enrollment_status = enrollment.enrollment_status === 1 ? 0 : 1;

    await enrollment.save();

    // =====================================
    // RESPONSE
    // =====================================
    return res.status(200).send({
      status: true,
      message: "Notes enrollment status updated successfully",
      current_status: enrollment.enrollment_status,
      data: enrollment,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPurchasedCoursesByUser,
  getSinglePurchasedCourse,
  deletePurchasedCourse,
  updatePurchasedCourseDuration,

  getPurchasedTestSeriesByUser,
  getSinglePurchasedTestSeries,
  deletePurchasedTestSeries,
  updatePurchasedTestSeriesStatus,

  getPurchasedNotesByUser,
  getSinglePurchasedNotes,
  deletePurchasedNotes,
  updatePurchasedNotesStatus,
};
