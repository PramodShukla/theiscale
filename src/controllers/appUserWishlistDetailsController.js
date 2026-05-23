const mongoose = require("mongoose");
const Wishlist = require("../models/user_wishlist");

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const getCourseWishlistByUser = async (req, res) => {
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
    // FILTER
    // =====================================

    const filter = {
      user_id: userId,

      wishlist_type: "course",
    };

    // =====================================
    // TOTAL COUNT
    // =====================================

    const totalCount = await Wishlist.countDocuments(filter);

    // =====================================
    // GET DATA
    // =====================================

    const data = await Wishlist.find(filter)
      .populate(
        "course_id",
        `
          m_course_title
          m_course_banner
          m_course_price
          m_course_offer_price
          m_course_status
          `,
      )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

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

      data,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getSingleCourseWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALIDATE ID
    // =====================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid wishlist id",
      });
    }

    // =====================================
    // GET DATA
    // =====================================

    const data = await Wishlist.findOne({
      _id: id,

      wishlist_type: "course",
    })
      .populate("user_id","-c_password")
      .populate("course_id");

    // =====================================
    // CHECK DATA
    // =====================================

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Course wishlist not found",
      });
    }

    // =====================================
    // RESPONSE
    // =====================================

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

const deleteCourseWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALIDATE ID
    // =====================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid wishlist id",
      });
    }

    // =====================================
    // CHECK DATA
    // =====================================

    const data = await Wishlist.findOne({
      _id: id,

      wishlist_type: "course",
    });

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Course wishlist not found",
      });
    }

    // =====================================
    // DELETE
    // =====================================

    await Wishlist.findByIdAndDelete(id);

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(200).send({
      status: true,

      message: "Course wishlist deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getTestSeriesWishlistByUser = async (req, res) => {
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
    // FILTER
    // =====================================

    const filter = {
      user_id: userId,

      wishlist_type: "package",
    };

    // =====================================
    // TOTAL COUNT
    // =====================================

    const totalCount = await Wishlist.countDocuments(filter);

    // =====================================
    // GET DATA
    // =====================================

    const data = await Wishlist.find(filter)
      .populate(
        "package_id",
        `
          m_package_title
          m_package_image
          m_package_type
          m_package_price
          m_package_offer_price
          m_package_status
          `,
      )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

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

      data,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getSingleTestSeriesWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALIDATE ID
    // =====================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid wishlist id",
      });
    }

    // =====================================
    // GET DATA
    // =====================================

    const data = await Wishlist.findOne({
      _id: id,

      wishlist_type: "package",
    })
      .populate("user_id","-c_password")
      .populate("package_id");

    // =====================================
    // CHECK DATA
    // =====================================

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Test-series wishlist not found",
      });
    }

    // =====================================
    // RESPONSE
    // =====================================

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

const deleteTestSeriesWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALIDATE ID
    // =====================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid wishlist id",
      });
    }

    // =====================================
    // CHECK DATA
    // =====================================

    const data = await Wishlist.findOne({
      _id: id,

      wishlist_type: "package",
    });

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Test-series wishlist not found",
      });
    }

    // =====================================
    // DELETE
    // =====================================

    await Wishlist.findByIdAndDelete(id);

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(200).send({
      status: true,

      message: "Test-series wishlist deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getNotesWishlistByUser = async (req, res) => {
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
    // FILTER
    // =====================================

    const filter = {
      user_id: userId,

      wishlist_type: "notes",
    };

    // =====================================
    // TOTAL COUNT
    // =====================================

    const totalCount = await Wishlist.countDocuments(filter);

    // =====================================
    // GET DATA
    // =====================================

    const data = await Wishlist.find(filter)
      .populate(
        "notes_id",
        `
          notes_name
          notes_image
          notes_type
          notes_price
          notes_offer_price
          notes_status
          `,
      )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

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

      data,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getSingleNotesWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALIDATE ID
    // =====================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid wishlist id",
      });
    }

    // =====================================
    // GET DATA
    // =====================================

    const data = await Wishlist.findOne({
      _id: id,

      wishlist_type: "notes",
    })
      .populate("user_id","-c_password")
      .populate("notes_id");

    // =====================================
    // CHECK DATA
    // =====================================

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Notes wishlist not found",
      });
    }

    // =====================================
    // RESPONSE
    // =====================================

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

const deleteNotesWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALIDATE ID
    // =====================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid wishlist id",
      });
    }

    // =====================================
    // CHECK DATA
    // =====================================

    const data = await Wishlist.findOne({
      _id: id,

      wishlist_type: "notes",
    });

    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Notes wishlist not found",
      });
    }

    // =====================================
    // DELETE
    // =====================================

    await Wishlist.findByIdAndDelete(id);

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(200).send({
      status: true,

      message: "Notes wishlist deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCourseWishlistByUser,
  getSingleCourseWishlist,
  deleteCourseWishlist,

  getTestSeriesWishlistByUser,
  getSingleTestSeriesWishlist,
  deleteTestSeriesWishlist,

  getNotesWishlistByUser,
  getSingleNotesWishlist,
  deleteNotesWishlist
};
