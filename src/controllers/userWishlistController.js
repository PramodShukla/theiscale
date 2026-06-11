const UserWishlist = require("../models/user_wishlist");

const Course = require("../models/course");

const TestPackage = require("../models/test_package");

const Notes = require("../models/notes");

const addCourseToWishlist = async (req, res) => {
  try {
    const { course_id } = req.body;

    if (!course_id) {
      return res.status(400).json({
        status: false,

        message: "course_id is required",
      });
    }

    const course = await Course.findById(course_id);

    if (!course) {
      return res.status(404).json({
        status: false,

        message: "Course not found",
      });
    }

    const exists = await UserWishlist.findOne({
      user_id: req.user.id,

      course_id,
    });

    if (exists) {
      return res.status(400).json({
        status: false,

        message: "Course already added in wishlist",
      });
    }

    const wishlist = await UserWishlist.create({
      user_id: req.user.id,

      wishlist_type: "course",

      course_id,
    });

    return res.status(201).json({
      status: true,

      message: "Course added to wishlist",

      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

const getMyCourseWishlist = async (req, res) => {
  try {
    const data = await UserWishlist.find({
      user_id: req.user.id,

      wishlist_type: "course",
    })

      .populate({
        path: "course_id",

        select: `
            m_course_title
            m_course_price
            m_course_offer_price
            m_course_thumbnail
            m_course_duration_app
            m_course_duration_web
            m_course_level
          `,
      })

      .sort({
        added_on: -1,
      });

    return res.status(200).json({
      status: true,

      total: data.length,

      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

const getAllCourseWishlistsAdmin = async (req, res) => {
  try {
    let {
      page = 1,

      limit = 10,

      search = "",

      course_id,

      from_date,

      to_date,
    } = req.query;

    page = parseInt(page) || 1;

    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;

    // FILTER

    let filter = {
      wishlist_type: "course",
    };

    // COURSE FILTER
    if (course_id) {
      filter.course_id = course_id;
    }

    // DATE FILTER
    if (from_date || to_date) {
      filter.added_on = {};

      if (from_date) {
        filter.added_on.$gte = new Date(from_date);
      }

      if (to_date) {
        const endDate = new Date(to_date);

        endDate.setHours(23, 59, 59, 999);

        filter.added_on.$lte = endDate;
      }
    }

    // GET DATA

    let data = await UserWishlist.find(filter)

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
          `,
      })

      .sort({
        added_on: -1,
      })

      .skip(skip)

      .limit(limit)

      .lean();

    // SEARCH

    if (search) {
      const text = search.toLowerCase();

      data = data.filter((item) => {
        const studentName =
          `${item.user_id?.c_first_name || ""} ${item.user_id?.c_last_name || ""}`.toLowerCase();

        const email = item.user_id?.c_email?.toLowerCase() || "";

        const mobile = String(item.user_id?.c_contact || "");

        const courseName = item.course_id?.m_course_title?.toLowerCase() || "";

        return (
          studentName.includes(text) ||
          email.includes(text) ||
          mobile.includes(text) ||
          courseName.includes(text)
        );
      });
    }

    // FINAL DATA

    const finalData = data.map((item) => {
      return {
        wishlist_id: item._id,

        student_id: item.user_id?._id,

        student_name: `${item.user_id?.c_first_name || ""} ${item.user_id?.c_last_name || ""}`,

        contact_no: item.user_id?.c_contact,

        email: item.user_id?.c_email,

        course_id: item.course_id?._id,

        course_name: item.course_id?.m_course_title,

        added_date: item.added_on,
      };
    });

    // TOTAL

    const totalRecords = await UserWishlist.countDocuments(filter);

    // RESPONSE

    return res.status(200).json({
      status: true,

      current_page: page,

      total_pages: Math.ceil(totalRecords / limit),

      total_records: totalRecords,

      data: finalData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

// ADMIN - SINGLE WISHLIST

const getSingleCourseWishlist = async (req, res) => {
  try {
    const wishlistId = req.params.id;

    const data = await UserWishlist.findOne({
      _id: wishlistId,
      wishlist_type: "course",
    })

      .populate({
        path: "user_id",

        select: `
            c_first_name
            c_last_name
            c_email
            c_contact
            c_alt_contact
            c_current_city
            c_current_address1
            c_current_address2
          `,
      })

      .populate({
        path: "course_id",
      });

    if (!data) {
      return res.status(404).json({
        status: false,

        message: "Wishlist not found",
      });
    }

    return res.status(200).json({
      status: true,

      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

const deleteCourseWishlist = async (req, res) => {
  try {
    const wishlistId = req.params.id;

    const wishlist = await UserWishlist.find({
      wishlistId,
      wishlist_type: "course",
    });

    if (!wishlist) {
      return res.status(404).json({
        status: false,

        message: "Wishlist not found",
      });
    }

    await UserWishlist.findByIdAndDelete(wishlistId);

    return res.status(200).json({
      status: true,

      message: "Wishlist deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

const addTestPackageToWishlist = async (req, res) => {
  try {
    const { package_id } = req.body;

    if (!package_id) {
      return res.status(400).json({
        status: false,

        message: "package_id is required",
      });
    }

    const testPackage = await TestPackage.findById(package_id);

    if (!testPackage) {
      return res.status(404).json({
        status: false,

        message: "Test package not found",
      });
    }

    const exists = await UserWishlist.findOne({
      user_id: req.user.id,

      package_id,

      wishlist_type: "package",
    });

    if (exists) {
      return res.status(400).json({
        status: false,

        message: "Test package already added in wishlist",
      });
    }

    const wishlist = await UserWishlist.create({
      user_id: req.user.id,

      wishlist_type: "package",

      package_id,
    });

    return res.status(201).json({
      status: true,

      message: "Test package added to wishlist",

      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

const getMyTestPackageWishlist = async (req, res) => {
  try {
    const data = await UserWishlist.find({
      user_id: req.user.id,

      wishlist_type: "package",
    })

      .populate({
        path: "package_id",

        populate: [
          {
            path: "m_package_course",

            select: `
                m_course_title
              `,
          },

          {
            path: "m_package_test_category",

            select: `
                test_categoryName
              `,
          },
        ],
      })

      .sort({
        added_on: -1,
      });

    return res.status(200).json({
      status: true,

      total: data.length,

      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

// ADMIN - GET ALL TEST PACKAGE WISHLISTS

const getAllTestPackageWishlistsAdmin = async (req, res) => {
  try {
    let {
      page = 1,

      limit = 10,

      search = "",

      package_id,

      from_date,

      to_date,
    } = req.query;

    page = parseInt(page) || 1;

    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;

    let filter = {
      wishlist_type: "package",
    };

    // PACKAGE FILTER
    if (package_id) {
      filter.package_id = package_id;
    }

    // DATE FILTER
    if (from_date || to_date) {
      filter.added_on = {};

      if (from_date) {
        filter.added_on.$gte = new Date(from_date);
      }

      if (to_date) {
        const endDate = new Date(to_date);

        endDate.setHours(23, 59, 59, 999);

        filter.added_on.$lte = endDate;
      }
    }

    let data = await UserWishlist.find(filter)

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
        path: "package_id",

        select: `
            m_package_title
            m_package_price
            m_package_offer_price
          `,
      })

      .sort({
        added_on: -1,
      })

      .skip(skip)

      .limit(limit)

      .lean();

    // SEARCH

    if (search) {
      const text = search.toLowerCase();

      data = data.filter((item) => {
        const studentName =
          `${item.user_id?.c_first_name || ""} ${item.user_id?.c_last_name || ""}`.toLowerCase();

        const email = item.user_id?.c_email?.toLowerCase() || "";

        const mobile = String(item.user_id?.c_contact || "");

        const packageName =
          item.package_id?.m_package_title?.toLowerCase() || "";

        return (
          studentName.includes(text) ||
          email.includes(text) ||
          mobile.includes(text) ||
          packageName.includes(text)
        );
      });
    }

    // FINAL DATA

    const finalData = data.map((item) => {
      return {
        wishlist_id: item._id,

        student_id: item.user_id?._id,

        student_name: `${item.user_id?.c_first_name || ""} ${item.user_id?.c_last_name || ""}`,

        contact_no: item.user_id?.c_contact,

        email: item.user_id?.c_email,

        package_id: item.package_id?._id,

        package_name: item.package_id?.m_package_title,

        added_date: item.added_on,
      };
    });

    const totalRecords = await UserWishlist.countDocuments(filter);

    return res.status(200).json({
      status: true,

      current_page: page,

      total_pages: Math.ceil(totalRecords / limit),

      total_records: totalRecords,

      data: finalData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

// ADMIN - SINGLE TEST PACKAGE WISHLIST

const getSingleTestPackageWishlist = async (req, res) => {
  try {
    const wishlistId = req.params.id;

    const data = await UserWishlist.findOne({
      _id: wishlistId,

      wishlist_type: "package",
    })

      .populate({
        path: "user_id",

        select: `
            c_first_name
            c_last_name
            c_email
            c_contact
            c_alt_contact
            c_current_city
            c_current_address1
            c_current_address2
          `,
      })

      .populate({
        path: "package_id",

        populate: [
          {
            path: "m_package_course",
          },

          {
            path: "m_package_test_category",
          },
        ],
      });

    if (!data) {
      return res.status(404).json({
        status: false,

        message: "Wishlist not found",
      });
    }

    return res.status(200).json({
      status: true,

      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

const deleteTestPackageWishlist = async (req, res) => {
  try {
    const wishlistId = req.params.id;

    const wishlist = await UserWishlist.findOne({
      _id: wishlistId,

      wishlist_type: "package",
    });

    if (!wishlist) {
      return res.status(404).json({
        status: false,

        message: "Wishlist not found",
      });
    }

    await UserWishlist.findByIdAndDelete(wishlistId);

    return res.status(200).json({
      status: true,

      message: "Wishlist deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

// ADD NOTES TO WISHLIST

const addNotesToWishlist = async (req, res) => {
  try {
    const { notes_id } = req.body;

    if (!notes_id) {
      return res.status(400).json({
        status: false,

        message: "notes_id is required",
      });
    }

    const notes = await Notes.findById(notes_id);

    if (!notes) {
      return res.status(404).json({
        status: false,

        message: "Notes not found",
      });
    }

    const exists = await UserWishlist.findOne({
      user_id: req.user.id,

      notes_id,

      wishlist_type: "notes",
    });

    if (exists) {
      return res.status(400).json({
        status: false,

        message: "Notes already added in wishlist",
      });
    }

    const wishlist = await UserWishlist.create({
      user_id: req.user.id,

      wishlist_type: "notes",

      notes_id,
    });

    return res.status(201).json({
      status: true,

      message: "Notes added to wishlist",

      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

// GET MY NOTES WISHLIST

const getMyNotesWishlist = async (req, res) => {
  try {
    const data = await UserWishlist.find({
      user_id: req.user.id,

      wishlist_type: "notes",
    })

      .populate({
        path: "notes_id",

        select: `
            notes_name
            notes_image
            notes_price
            notes_offer_price
          `,
      })

      .sort({
        added_on: -1,
      });

    return res.status(200).json({
      status: true,

      total: data.length,

      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

// ADMIN GET ALL NOTES WISHLISTS

const getAllNotesWishlistsAdmin = async (req, res) => {
  try {
    let {
      page = 1,

      limit = 10,

      search = "",

      notes_id,

      from_date,

      to_date,
    } = req.query;

    page = parseInt(page) || 1;

    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;

    // FILTER

    let filter = {
      wishlist_type: "notes",
    };

    // NOTES FILTER

    if (notes_id) {
      filter.notes_id = notes_id;
    }

    // DATE FILTER

    if (from_date || to_date) {
      filter.added_on = {};

      if (from_date) {
        filter.added_on.$gte = new Date(from_date);
      }

      if (to_date) {
        const endDate = new Date(to_date);

        endDate.setHours(23, 59, 59, 999);

        filter.added_on.$lte = endDate;
      }
    }

    // GET DATA

    let data = await UserWishlist.find(filter)

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
        path: "notes_id",

        select: `
            notes_name
          `,
      })

      .sort({
        added_on: -1,
      })

      .skip(skip)

      .limit(limit)

      .lean();

    // SEARCH

    if (search) {
      const text = search.toLowerCase();

      data = data.filter((item) => {
        const studentName =
          `${item.user_id?.c_first_name || ""} ${item.user_id?.c_last_name || ""}`.toLowerCase();

        const email = item.user_id?.c_email?.toLowerCase() || "";

        const mobile = String(item.user_id?.c_contact || "");

        const notesName = item.notes_id?.notes_name?.toLowerCase() || "";

        return (
          studentName.includes(text) ||
          email.includes(text) ||
          mobile.includes(text) ||
          notesName.includes(text)
        );
      });
    }

    // FINAL DATA

    const finalData = data.map((item) => {
      return {
        wishlist_id: item._id,

        student_id: item.user_id?._id,

        student_name: `${item.user_id?.c_first_name || ""} ${item.user_id?.c_last_name || ""}`,

        contact_no: item.user_id?.c_contact,

        email: item.user_id?.c_email,

        notes_id: item.notes_id?._id,

        notes_name: item.notes_id?.notes_name,

        added_date: item.added_on,
      };
    });

    // TOTAL

    const totalRecords = await UserWishlist.countDocuments(filter);

    return res.status(200).json({
      status: true,

      current_page: page,

      total_pages: Math.ceil(totalRecords / limit),

      total_records: totalRecords,

      data: finalData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

// ADMIN SINGLE NOTES WISHLIST

const getSingleNotesWishlist = async (req, res) => {
  try {
    const wishlistId = req.params.id;

    const data = await UserWishlist.findOne({
      _id: wishlistId,

      wishlist_type: "notes",
    })

      .populate({
        path: "user_id",

        select: `
            c_first_name
            c_last_name
            c_email
            c_contact
            c_alt_contact
            c_current_city
            c_current_address1
            c_current_address2
          `,
      })

      .populate({
        path: "notes_id",
      });

    if (!data) {
      return res.status(404).json({
        status: false,

        message: "Notes wishlist not found",
      });
    }

    return res.status(200).json({
      status: true,

      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

const deleteNotesWishlist = async (req, res) => {
  try {
    const wishlistId = req.params.id;

    const wishlist = await UserWishlist.findOne({
      _id: wishlistId,

      wishlist_type: "notes",
    });

    if (!wishlist) {
      return res.status(404).json({
        status: false,

        message: "Notes wishlist not found",
      });
    }

    await UserWishlist.findByIdAndDelete(wishlistId);

    return res.status(200).json({
      status: true,

      message: "Notes wishlist deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

module.exports = {
  addCourseToWishlist,
  getMyCourseWishlist,
  getAllCourseWishlistsAdmin,
  getSingleCourseWishlist,
  deleteCourseWishlist,

  addTestPackageToWishlist,
  getMyTestPackageWishlist,
  getAllTestPackageWishlistsAdmin,
  getSingleTestPackageWishlist,
  deleteTestPackageWishlist,

  addNotesToWishlist,
  getMyNotesWishlist,
  getAllNotesWishlistsAdmin,
  getSingleNotesWishlist,
  deleteNotesWishlist,
};
