const SubjectRating = require("../models/subject_rating");
const Candidate = require("../models/candidates");
const Subject = require("../models/subject");

const mongoose = require("mongoose");

const isValidObjectId = mongoose.Types.ObjectId.isValid;

// ==========================================
// CHECK VALID VALUE
// ==========================================

const isValidValue = (value) => {
  return (
    value !== undefined &&
    value !== null &&
    value !== "" &&
    value !== "null" &&
    value !== "undefined"
  );
};

// ==========================================
// ADD SUBJECT RATING
// ==========================================

const addSubjectRating = async (req, res) => {
  try {
    const { user_id, subject_id, rating, review } = req.body;

    // ==========================================
    // VALIDATE USER
    // ==========================================

    if (isValidValue(user_id)) {
      if (!isValidObjectId(user_id)) {
        return res.status(400).send({
          status: false,
          message: "Invalid user id",
        });
      }

      const userExists = await Candidate.findById(user_id);

      if (!userExists) {
        return res.status(404).send({
          status: false,
          message: "User not found",
        });
      }
    }

    // ==========================================
    // VALIDATE SUBJECT
    // ==========================================

    if (isValidValue(subject_id)) {
      if (!isValidObjectId(subject_id)) {
        return res.status(400).send({
          status: false,
          message: "Invalid subject id",
        });
      }

      const subjectExists = await Subject.findById(subject_id);

      if (!subjectExists) {
        return res.status(404).send({
          status: false,
          message: "Subject not found",
        });
      }
    }

    // ==========================================
    // VALIDATE RATING
    // ==========================================

    if (isValidValue(rating)) {
      const allowedRatings = [
        1, 1.5, 2, 2.5, 3,
        3.5, 4, 4.5, 5,
      ];

      if (!allowedRatings.includes(Number(rating))) {
        return res.status(400).send({
          status: false,
          message: "Rating must be between 1 to 5 in steps of 0.5",
        });
      }
    }

    // ==========================================
    // CREATE
    // ==========================================

    const data = await SubjectRating.create({
      user_id: isValidValue(user_id) ? user_id : null,

      subject_id: isValidValue(subject_id)
        ? subject_id
        : null,

      rating: isValidValue(rating)
        ? Number(rating)
        : null,

      review: isValidValue(review)
        ? review.trim()
        : null,

      status: "active",
    });

    return res.status(201).send({
      status: true,
      message: "Subject review added successfully",
      data,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL SUBJECT RATINGS
// ==========================================

const getAllSubjectRatings = async (req, res) => {
  try {
    let { page = 1, limit = 10, keyword = "" } =
      req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

    // ==========================================
    // SEARCH
    // ==========================================

    if (isValidValue(keyword)) {
      const users = await Candidate.find({
        $or: [
          {
            c_first_name: {
              $regex: keyword,
              $options: "i",
            },
          },

          {
            c_last_name: {
              $regex: keyword,
              $options: "i",
            },
          },

          {
            c_display_name: {
              $regex: keyword,
              $options: "i",
            },
          },

          {
            c_email: {
              $regex: keyword,
              $options: "i",
            },
          },
        ],
      }).select("_id");

      const subjects = await Subject.find({
        m_subject_title: {
          $regex: keyword,
          $options: "i",
        },
      }).select("_id");

      const userIds = users.map((item) => item._id);

      const subjectIds = subjects.map(
        (item) => item._id
      );

      filter.$or = [
        {
          review: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          user_id: {
            $in: userIds,
          },
        },

        {
          subject_id: {
            $in: subjectIds,
          },
        },
      ];
    }

    // ==========================================
    // TOTAL RECORDS
    // ==========================================

    const totalRecords =
      await SubjectRating.countDocuments(filter);

    // ==========================================
    // GET DATA
    // ==========================================

    const data = await SubjectRating.find(filter)

      .populate({
        path: "user_id",

        select: `
          c_first_name
          c_last_name
          c_display_name
          c_email
        `,
      })

      .populate({
        path: "subject_id",

        select: `
          m_subject_title
        `,
      })

      .sort({ createdAt: -1 })

      .skip((page - 1) * limit)

      .limit(limit);

    return res.status(200).send({
      status: true,

      pagination: {
        currentPage: page,
        perPage: limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      },

      data,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET SINGLE SUBJECT RATING
// ==========================================

const getSingleSubjectRating = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid review id",
      });
    }

    // ==========================================
    // FIND DATA
    // ==========================================

    const data = await SubjectRating.findById(id)

      .populate({
        path: "user_id",

        select: `
          c_first_name
          c_last_name
          c_display_name
          c_email
        `,
      })

      .populate({
        path: "subject_id",

        select: `
          m_subject_title
        `,
      });

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Review not found",
      });
    }

    return res.status(200).send({
      status: true,
      data,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE SUBJECT RATING
// ==========================================

const updateSubjectRating = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      user_id,
      subject_id,
      rating,
      review,
      status,
    } = req.body;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid review id",
      });
    }

    // ==========================================
    // FIND REVIEW
    // ==========================================

    const existingReview =
      await SubjectRating.findById(id);

    if (!existingReview) {
      return res.status(404).send({
        status: false,
        message: "Review not found",
      });
    }

    // ==========================================
    // UPDATE OBJECT
    // ==========================================

    const updateData = {};

    // ==========================================
    // USER
    // ==========================================

    if (isValidValue(user_id)) {
      if (!isValidObjectId(user_id)) {
        return res.status(400).send({
          status: false,
          message: "Invalid user id",
        });
      }

      const userExists = await Candidate.findById(
        user_id
      );

      if (!userExists) {
        return res.status(404).send({
          status: false,
          message: "User not found",
        });
      }

      updateData.user_id = user_id;
    }

    // ==========================================
    // SUBJECT
    // ==========================================

    if (isValidValue(subject_id)) {
      if (!isValidObjectId(subject_id)) {
        return res.status(400).send({
          status: false,
          message: "Invalid subject id",
        });
      }

      const subjectExists = await Subject.findById(
        subject_id
      );

      if (!subjectExists) {
        return res.status(404).send({
          status: false,
          message: "Subject not found",
        });
      }

      updateData.subject_id = subject_id;
    }

    // ==========================================
    // RATING
    // ==========================================

    if (isValidValue(rating)) {
      const allowedRatings = [
        1, 1.5, 2, 2.5, 3,
        3.5, 4, 4.5, 5,
      ];

      if (!allowedRatings.includes(Number(rating))) {
        return res.status(400).send({
          status: false,
          message: "Invalid rating",
        });
      }

      updateData.rating = Number(rating);
    }

    // ==========================================
    // REVIEW
    // ==========================================

    if (isValidValue(review)) {
      updateData.review = review.trim();
    }

    // ==========================================
    // STATUS
    // ==========================================

    if (isValidValue(status)) {
      if (
        status !== "active" &&
        status !== "inactive"
      ) {
        return res.status(400).send({
          status: false,
          message:
            "Status must be active or inactive",
        });
      }

      updateData.status = status;
    }

    // ==========================================
    // UPDATE
    // ==========================================

    const updatedData =
      await SubjectRating.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );

    return res.status(200).send({
      status: true,
      message: "Review updated successfully",
      data: updatedData,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

// ==========================================
// CHANGE STATUS
// ==========================================

const changeSubjectRatingStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid review id",
      });
    }

    // ==========================================
    // FIND REVIEW
    // ==========================================

    const review = await SubjectRating.findById(id);

    if (!review) {
      return res.status(404).send({
        status: false,
        message: "Review not found",
      });
    }

    // ==========================================
    // TOGGLE STATUS
    // ==========================================

    review.status =
      review.status === "active"
        ? "inactive"
        : "active";

    await review.save();

    return res.status(200).send({
      status: true,
      message: "Status changed successfully",
      data: review,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE SUBJECT RATING
// ==========================================

const deleteSubjectRating = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid review id",
      });
    }

    // ==========================================
    // FIND REVIEW
    // ==========================================

    const review =
      await SubjectRating.findById(id);

    if (!review) {
      return res.status(404).send({
        status: false,
        message: "Review not found",
      });
    }

    // ==========================================
    // DELETE
    // ==========================================

    await SubjectRating.findByIdAndDelete(id);

    return res.status(200).send({
      status: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addSubjectRating,
  getAllSubjectRatings,
  getSingleSubjectRating,
  updateSubjectRating,
  changeSubjectRatingStatus,
  deleteSubjectRating,
};