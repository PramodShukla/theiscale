const TestimonialRating = require("../models/testimonial_ratings");

const Candidate = require("../models/candidates");

const Course = require("../models/course");

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
// ADD TESTIMONIAL REVIEW
// ==========================================

const addTestimonialRating = async (req, res) => {
  try {
    const { user_id, course_id, rating, review } = req.body;

    // ==========================================
    // USER VALIDATION
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
    // COURSE VALIDATION
    // ==========================================

    if (isValidValue(course_id)) {
      if (!isValidObjectId(course_id)) {
        return res.status(400).send({
          status: false,
          message: "Invalid course id",
        });
      }

      const courseExists = await Course.findById(course_id);

      if (!courseExists) {
        return res.status(404).send({
          status: false,
          message: "Course not found",
        });
      }
    }

    // ==========================================
    // RATING VALIDATION
    // ==========================================

    if (isValidValue(rating)) {
      if (Number(rating) < 1 || Number(rating) > 10) {
        return res.status(400).send({
          status: false,
          message: "Rating must be between 1 to 10",
        });
      }
    }

    // ==========================================
    // CREATE
    // ==========================================

    const newReview = await TestimonialRating.create({
      user_id: isValidValue(user_id) ? user_id : null,

      course_id: isValidValue(course_id) ? course_id : null,

      rating: isValidValue(rating) ? Number(rating) : null,

      review: isValidValue(review) ? review.trim() : null,
    });

    return res.status(201).send({
      status: true,
      message: "Testimonial review added successfully",
      data: newReview,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL TESTIMONIAL REVIEWS
// ==========================================

const getAllTestimonialRatings = async (req, res) => {
  try {
    let { page = 1, limit = 10, keyword = "" } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

    // ==========================================
    // SEARCH
    // ==========================================

    if (isValidValue(keyword)) {
      // ==========================
      // FIND USERS
      // ==========================

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

      const userIds = users.map((user) => user._id);

      // ==========================
      // MAIN FILTER
      // ==========================

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
      ];
    }

    // ==========================================
    // TOTAL RECORDS
    // ==========================================

    const totalRecords = await TestimonialRating.countDocuments(filter);

    // ==========================================
    // GET DATA
    // ==========================================

    const data = await TestimonialRating.find(filter)

      // ==========================
      // USER DETAILS
      // ==========================

      .populate({
        path: "user_id",

        select: `
          c_first_name
          c_last_name
          c_display_name
          c_email
        `,
      })

      // ==========================
      // COURSE DETAILS
      // ==========================

      .populate({
        path: "course_id",

        select: `
          m_course_title
        `,
      })

      .sort({ createdAt: -1 })

      .skip((page - 1) * limit)

      .limit(limit);

    // ==========================================
    // RESPONSE
    // ==========================================

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
// GET SINGLE REVIEW
// ==========================================

const getSingleTestimonialRating = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid testimonial review id",
      });
    }

    // ==========================================
    // FIND REVIEW
    // ==========================================

    const review = await TestimonialRating.findById(id)

      .populate(
        "user_id",
        `
        c_first_name
        c_last_name
        c_display_name
        c_email
      `,
      )

      .populate(
        "course_id",
        `
        m_course_title
        
      `,
      );

    if (!review) {
      return res.status(404).send({
        status: false,
        message: "Testimonial review not found",
      });
    }

    return res.status(200).send({
      status: true,
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
// UPDATE TESTIMONIAL REVIEW
// ==========================================

const updateTestimonialRating = async (req, res) => {
  try {
    const { id } = req.params;

    const { user_id, course_id, rating, review, status } = req.body;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid testimonial review id",
      });
    }

    // ==========================================
    // CHECK REVIEW
    // ==========================================

    const existingReview = await TestimonialRating.findById(id);

    if (!existingReview) {
      return res.status(404).send({
        status: false,
        message: "Testimonial review not found",
      });
    }

    const updateData = {};

    // ==========================================
    // USER ID
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

      updateData.user_id = user_id;
    }

    // ==========================================
    // COURSE ID
    // ==========================================

    if (isValidValue(course_id)) {
      if (!isValidObjectId(course_id)) {
        return res.status(400).send({
          status: false,
          message: "Invalid course id",
        });
      }

      const courseExists = await Course.findById(course_id);

      if (!courseExists) {
        return res.status(404).send({
          status: false,
          message: "Course not found",
        });
      }

      updateData.course_id = course_id;
    }

    // ==========================================
    // RATING
    // ==========================================

    if (isValidValue(rating)) {
      if (Number(rating) < 1 || Number(rating) > 10) {
        return res.status(400).send({
          status: false,
          message: "Rating must be between 1 to 10",
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
      if (!["active", "inactive"].includes(status)) {
        return res.status(400).send({
          status: false,
          message: "Status must be active or inactive",
        });
      }

      updateData.status = status;
    }

    // ==========================================
    // UPDATE
    // ==========================================

    const updatedReview = await TestimonialRating.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );

    return res.status(200).send({
      status: true,
      message: "Testimonial review updated successfully",
      data: updatedReview,
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

const changeTestimonialRatingStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid testimonial review id",
      });
    }

    // ==========================================
    // FIND REVIEW
    // ==========================================

    const review = await TestimonialRating.findById(id);

    if (!review) {
      return res.status(404).send({
        status: false,
        message: "Testimonial review not found",
      });
    }

    // ==========================================
    // TOGGLE STATUS
    // ==========================================

    review.status = review.status === "active" ? "inactive" : "active";

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
// DELETE REVIEW
// ==========================================

const deleteTestimonialRating = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid testimonial review id",
      });
    }

    // ==========================================
    // CHECK REVIEW
    // ==========================================

    const review = await TestimonialRating.findById(id);

    if (!review) {
      return res.status(404).send({
        status: false,
        message: "Testimonial review not found",
      });
    }

    // ==========================================
    // DELETE
    // ==========================================

    await TestimonialRating.findByIdAndDelete(id);

    return res.status(200).send({
      status: true,
      message: "Testimonial review deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addTestimonialRating,
  getAllTestimonialRatings,
  getSingleTestimonialRating,
  updateTestimonialRating,
  changeTestimonialRatingStatus,
  deleteTestimonialRating,
};
