const Course = require("../models/master_course_tbl");
const slugify = require("slugify");
const fs = require("fs");
const Category = require("../models/master_category");
const mongoose = require("mongoose");

// ===============================
// ADD COURSE
// ===============================
const addCourse = async (req, res) => {
  try {
    const {
      // Basic Info
      m_course_lang,
      m_course_category,
      m_course_cat_slug,
      m_course_title,
      m_course_intro,
      m_course_code,
      m_course_video_link,
      m_course_description,

      // Course Type & Price
      m_course_type,
      m_course_price,
      m_course_offer_price,

      // Settings
      m_course_popular,
      m_course_recomended,
      m_course_keyword,
      m_course_status,
      m_course_status_web,

      // Duration
      m_course_duration_app,
      m_course_duration_web,

      // Instructor
      m_course_trainee,

      // Certificate
      m_course_certificate,

      // Graphy Links
      m_course_app_g_link,
      m_course_web_g_link,
      m_course_graphy_instruction,

      // Order
      m_course_order,
    } = req.body;

    // ==================
    // REQUIRED FIELDS VALIDATION
    // ==================
    const requiredFields = {
      m_course_lang,
      m_course_title,
      m_course_status,
      m_course_status_web,
    };

    const missingFields = [];
    for (const [key, value] of Object.entries(requiredFields)) {
      if (value === undefined || value === null || value === "") {
        missingFields.push(key);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Required fields are missing",
        missing_fields: missingFields,
      });
    }

    // ==================
    // BANNER REQUIRED CHECK
    // ==================
    // if (!req.files || !req.files["m_course_banner"]) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Course banner image is required",
    //   });
    // }

    // ==================
    // ENUM VALIDATIONS
    // ==================

    // Course type validation
    if (m_course_type && ![1, 2].includes(Number(m_course_type))) {
      return res.status(400).json({
        status: false,
        message: "Invalid course type. 1=Free, 2=Paid",
      });
    }

    // Certificate validation
    if (
      m_course_certificate &&
      ![1, 2].includes(Number(m_course_certificate))
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid certificate value. 1=Yes, 2=No",
      });
    }

    // Status app validation
    if (![0, 1].includes(Number(m_course_status))) {
      return res.status(400).json({
        status: false,
        message: "Invalid course status. 0=Inactive, 1=Active",
      });
    }

    // Status web validation
    if (![0, 1].includes(Number(m_course_status_web))) {
      return res.status(400).json({
        status: false,
        message: "Invalid course status web. 0=Inactive, 1=Active",
      });
    }

    // Popular validation
    if (
      m_course_popular !== undefined &&
      m_course_popular !== "" &&
      ![0, 1].includes(Number(m_course_popular))
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid popular value. 0=No, 1=Yes",
      });
    }

    // Recommended validation
    if (
      m_course_recomended !== undefined &&
      m_course_recomended !== "" &&
      ![0, 1].includes(Number(m_course_recomended))
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid recommended value. 0=No, 1=Yes",
      });
    }

    // ==================
    // PRICE VALIDATION
    // ==================
    if (Number(m_course_type) === 2) {
      if (!m_course_price || Number(m_course_price) <= 0) {
        return res.status(400).json({
          status: false,
          message:
            "Price is required for paid courses and must be greater than 0",
        });
      }
    }

    // ==================
    // DUPLICATE CODE CHECK
    // ==================
    if (m_course_code) {
      const existingCourse = await Course.findOne({
        m_course_code: m_course_code.trim(),
      });

      if (existingCourse) {
        // Delete uploaded files
        deleteUploadedFiles(req.files);

        return res.status(409).json({
          status: false,
          message: "Course code already exists",
        });
      }
    }

    // ==================
    // FILE PATHS
    // ==================
    const m_course_banner = req.files["m_course_banner"]
      ? req.files["m_course_banner"][0].path
      : null;

    const m_course_pdf = req.files["m_course_pdf"]
      ? req.files["m_course_pdf"][0].path
      : null;

    const m_course_feestructure = req.files["m_course_feestructure"]
      ? req.files["m_course_feestructure"][0].path
      : null;

    const m_course_brochure = req.files["m_course_brochure"]
      ? req.files["m_course_brochure"][0].path
      : null;

    // ==================
    // AUTO GENERATE SLUG
    // ==================
    let m_course_slug = slugify(m_course_title, {
      lower: true,
      strict: true,
      replacement: "-",
    });

    // Check if slug already exists - make it unique
    const slugExists = await Course.findOne({ m_course_slug });
    if (slugExists) {
      m_course_slug = `${m_course_slug}-${Date.now()}`;
    }

    // ==================
    // AUTO EXTRACT YOUTUBE VIDEO ID
    // ==================
    let m_course_video_id = null;
    if (m_course_video_link) {
      const match = m_course_video_link.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
      );
      if (match) {
        m_course_video_id = match[1];
      }
    }

    // ==================
    // CREATE COURSE
    // ==================
    const newCourse = new Course({
      // Basic Info
      m_course_lang: Number(m_course_lang),
      //   m_course_category: m_course_category ? Number(m_course_category) : null,
      m_course_category: m_course_category || null,
      m_course_cat_slug: m_course_cat_slug || null,
      m_course_title: m_course_title.trim(),
      m_course_slug,
      m_course_intro: m_course_intro || null,
      m_course_code: m_course_code ? m_course_code.trim() : null,

      // Files
      m_course_banner,
      m_course_pdf,
      m_course_feestructure,
      m_course_brochure,

      // Video
      m_course_video_link: m_course_video_link || null,
      m_course_video_id,

      // Content
      m_course_description: m_course_description || null,

      // Type & Price
      m_course_type: m_course_type ? Number(m_course_type) : null,
      m_course_price: m_course_price ? Number(m_course_price) : 0,
      m_course_offer_price: m_course_offer_price
        ? Number(m_course_offer_price)
        : 0,

      // Settings
      m_course_popular: m_course_popular ? Number(m_course_popular) : 0,
      m_course_recomended: m_course_recomended
        ? Number(m_course_recomended)
        : 0,
      m_course_keyword: m_course_keyword || null,

      // Status
      m_course_status: Number(m_course_status),
      m_course_status_web: Number(m_course_status_web),

      // Stats - Default values
      m_course_view: 0,
      m_course_like: 0,
      m_course_dislike: 0,
      m_course_rating: 0,
      m_course_reviews: 0,
      m_course_share: 0,

      // Duration
      m_course_duration_app: m_course_duration_app
        ? m_course_duration_app.toString()
        : null,
      m_course_duration_web: m_course_duration_web
        ? Number(m_course_duration_web)
        : null,

      // Instructor
      // m_course_trainee: m_course_trainee || null,
      m_course_trainee: m_course_trainee
        ? new mongoose.Types.ObjectId(m_course_trainee)
        : null,

      // Certificate
      m_course_certificate: m_course_certificate
        ? Number(m_course_certificate)
        : null,

      // Graphy Links
      m_course_app_g_link: m_course_app_g_link || null,
      m_course_web_g_link: m_course_web_g_link || null,
      m_course_graphy_instruction: m_course_graphy_instruction || null,

      // Order
      m_course_order: m_course_order ? Number(m_course_order) : null,

      // Modified date
      m_course_modified: new Date(),
    });

    // Save to database
    const savedCourse = await newCourse.save();

    return res.status(201).json({
      status: true,
      message: "Course added successfully",
      data: savedCourse,
    });
  } catch (error) {
    console.error("Add Course Error:", error);

    // Delete uploaded files if any error occurs
    if (req.files) {
      deleteUploadedFiles(req.files);
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        status: false,
        message: `${field} already exists`,
      });
    }

    // Handle validation error
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        status: false,
        message: "Validation failed",
        errors,
      });
    }

    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ===============================
// HELPER - DELETE UPLOADED FILES
// ===============================
const deleteUploadedFiles = (files) => {
  if (!files) return;
  Object.values(files).forEach((fileArray) => {
    fileArray.forEach((file) => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
  });
};

const getAllCourses = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      category,
      course_type,
      status,
    } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    let filter = {};

    // =========================
    // SEARCH
    // =========================
    if (search) {
      filter.$or = [
        { m_course_title: { $regex: search, $options: "i" } },
        { m_course_code: { $regex: search, $options: "i" } },
      ];
    }

    // =========================
    // CATEGORY FILTER (ObjectId)
    // =========================
    if (category && mongoose.Types.ObjectId.isValid(category)) {
      filter.m_course_category = category;
    }

    // =========================
    // COURSE TYPE FILTER
    // =========================
    if (course_type) {
      filter.m_course_type = Number(course_type); // 1 = Free, 2 = Paid
    }

    // =========================
    // STATUS FILTER
    // =========================
    if (status !== undefined) {
      filter.m_course_status = Number(status);
    }

    // =========================
    // TOTAL COUNT
    // =========================
    const total = await Course.countDocuments(filter);

    // =========================
    // FETCH COURSES
    // =========================
    const courses = await Course.find(filter)
      .sort({ m_course_order: 1, _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // =========================
    // CATEGORY FETCH
    // =========================
    const categoryIds = courses
      .map((c) => c.m_course_category)
      .filter((id) => id); // null remove

    const categories = await Category.find({
      _id: { $in: categoryIds },
    });

    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id.toString()] = cat.m_category_name;
    });

    // =========================
    // FINAL RESPONSE
    // =========================
    const finalData = courses.map((course) => ({
      _id: course._id,
      title: course.m_course_title,
      code: course.m_course_code,
      category: categoryMap[course.m_course_category?.toString()] || "N/A",
      banner: course.m_course_banner,
      video: course.m_course_video_link,
      course_type: course.m_course_type === 1 ? "Free" : "Paid",
      price: course.m_course_type === 1 ? "N/A" : course.m_course_price,
      offer_price:
        course.m_course_type === 1 ? "N/A" : course.m_course_offer_price,
      status: course.m_course_status === 1 ? "Active" : "Inactive",
      slug: course.m_course_slug,
    }));

    res.send({
      status: true,
      message: "Courses fetched successfully",
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: finalData,
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const getCategoryDropdown = async (req, res) => {
  try {
    const categories = await Category.find({
      m_category_status: 1,
    }).select("_id m_category_name");

    res.send({
      status: true,
      data: categories,
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

// ===============================
// UPDATE COURSE
// ===============================
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid course id",
      });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found",
      });
    }

    const {
      m_course_lang,
      m_course_category,
      m_course_cat_slug,
      m_course_title,
      m_course_intro,
      m_course_code,
      m_course_video_link,
      m_course_description,
      m_course_type,
      m_course_price,
      m_course_offer_price,
      m_course_popular,
      m_course_recomended,
      m_course_keyword,
      m_course_status,
      m_course_status_web,
      m_course_duration_app,
      m_course_duration_web,
      m_course_trainee,
      m_course_certificate,
      m_course_app_g_link,
      m_course_web_g_link,
      m_course_graphy_instruction,
      m_course_order,
    } = req.body;

    let updateData = {};

    // =========================
    // BASIC FIELDS
    // =========================
    if (m_course_lang !== undefined)
      updateData.m_course_lang = Number(m_course_lang);

    if (m_course_category !== undefined)
      updateData.m_course_category = m_course_category || null;

    if (m_course_cat_slug !== undefined)
      updateData.m_course_cat_slug = m_course_cat_slug;

    if (m_course_title !== undefined) {
      updateData.m_course_title = m_course_title.trim();

      // slug update
      let slug = slugify(m_course_title, {
        lower: true,
        strict: true,
      });

      const slugExists = await Course.findOne({
        m_course_slug: slug,
        _id: { $ne: id },
      });

      if (slugExists) {
        slug = `${slug}-${Date.now()}`;
      }

      updateData.m_course_slug = slug;
    }

    if (m_course_intro !== undefined)
      updateData.m_course_intro = m_course_intro;

    if (m_course_code !== undefined) {
      const existing = await Course.findOne({
        m_course_code: m_course_code.trim(),
        _id: { $ne: id },
      });

      if (existing) {
        return res.status(409).json({
          status: false,
          message: "Course code already exists",
        });
      }

      updateData.m_course_code = m_course_code.trim();
    }

    if (m_course_description !== undefined)
      updateData.m_course_description = m_course_description;

    // =========================
    // VIDEO
    // =========================
    if (m_course_video_link !== undefined) {
      updateData.m_course_video_link = m_course_video_link;

      let videoId = null;
      const match = m_course_video_link?.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
      );
      if (match) videoId = match[1];

      updateData.m_course_video_id = videoId;
    }

    // =========================
    // TYPE & PRICE
    // =========================
    if (m_course_type !== undefined) {
      if (![1, 2].includes(Number(m_course_type))) {
        return res.status(400).json({
          status: false,
          message: "Invalid course type",
        });
      }
      updateData.m_course_type = Number(m_course_type);
    }

    if (Number(m_course_type) === 2) {
      if (!m_course_price || Number(m_course_price) <= 0) {
        return res.status(400).json({
          status: false,
          message: "Price required for paid course",
        });
      }
    }

    if (m_course_price !== undefined)
      updateData.m_course_price = Number(m_course_price);

    if (m_course_offer_price !== undefined)
      updateData.m_course_offer_price = Number(m_course_offer_price);

    // =========================
    // SETTINGS
    // =========================
    if (m_course_popular !== undefined)
      updateData.m_course_popular = Number(m_course_popular);

    if (m_course_recomended !== undefined)
      updateData.m_course_recomended = Number(m_course_recomended);

    if (m_course_keyword !== undefined)
      updateData.m_course_keyword = m_course_keyword;

    if (m_course_status !== undefined)
      updateData.m_course_status = Number(m_course_status);

    if (m_course_status_web !== undefined)
      updateData.m_course_status_web = Number(m_course_status_web);

    // =========================
    // DURATION
    // =========================
    if (m_course_duration_app !== undefined)
      updateData.m_course_duration_app = m_course_duration_app?.toString();

    if (m_course_duration_web !== undefined)
      updateData.m_course_duration_web = Number(m_course_duration_web);

    // =========================
    // INSTRUCTOR (🔥 IMPORTANT)
    // =========================
    if (m_course_trainee !== undefined) {
      if (
        m_course_trainee &&
        !mongoose.Types.ObjectId.isValid(m_course_trainee)
      ) {
        return res.status(400).json({
          status: false,
          message: "Invalid instructor id",
        });
      }

      updateData.m_course_trainee = m_course_trainee
        ? new mongoose.Types.ObjectId(m_course_trainee)
        : null;
    }

    // =========================
    // CERTIFICATE
    // =========================
    if (m_course_certificate !== undefined)
      updateData.m_course_certificate = Number(m_course_certificate);

    // =========================
    // GRAPHY
    // =========================
    if (m_course_app_g_link !== undefined)
      updateData.m_course_app_g_link = m_course_app_g_link;

    if (m_course_web_g_link !== undefined)
      updateData.m_course_web_g_link = m_course_web_g_link;

    if (m_course_graphy_instruction !== undefined)
      updateData.m_course_graphy_instruction = m_course_graphy_instruction;

    // =========================
    // ORDER
    // =========================
    if (m_course_order !== undefined)
      updateData.m_course_order = Number(m_course_order);

    // =========================
    // FILE UPDATE
    // =========================
    if (req.files) {
      if (req.files["m_course_banner"]) {
        updateData.m_course_banner = req.files["m_course_banner"][0].path;
      }

      if (req.files["m_course_pdf"]) {
        updateData.m_course_pdf = req.files["m_course_pdf"][0].path;
      }

      if (req.files["m_course_feestructure"]) {
        updateData.m_course_feestructure =
          req.files["m_course_feestructure"][0].path;
      }

      if (req.files["m_course_brochure"]) {
        updateData.m_course_brochure = req.files["m_course_brochure"][0].path;
      }
    }

    // =========================
    // MODIFIED DATE
    // =========================
    updateData.m_course_modified = new Date();

    // =========================
    // UPDATE
    // =========================
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    );

    return res.status(200).json({
      status: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Update Course Error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ===============================
// DELETE COURSE
// ===============================
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // =========================
    // VALIDATION
    // =========================
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid course id",
      });
    }

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found",
      });
    }

    // =========================
    // DELETE FILES (IMPORTANT)
    // =========================
    const filesToDelete = [
      course.m_course_banner,
      course.m_course_pdf,
      course.m_course_feestructure,
      course.m_course_brochure,
    ];

    filesToDelete.forEach((filePath) => {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    // =========================
    // DELETE FROM DB
    // =========================
    await Course.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete Course Error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ===============================
// GET POPULAR COURSES
// ===============================
const getPopularCourses = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const filter = {
      m_course_popular: 1,
      m_course_status: 1,
    };

    const total = await Course.countDocuments(filter);

    const courses = await Course.find(filter)
      .sort({ m_course_order: 1, _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const finalData = courses.map((c) => ({
      _id: c._id,
      title: c.m_course_title,
      code: c.m_course_code,
      banner: c.m_course_banner,
      type: c.m_course_type === 1 ? "Free" : "Paid",
      price: c.m_course_type === 1 ? "N/A" : c.m_course_price,
      offer_price: c.m_course_type === 1 ? "N/A" : c.m_course_offer_price,
      slug: c.m_course_slug,
    }));

    res.json({
      status: true,
      message: "Popular courses fetched",
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: finalData,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// ===============================
// GET RECOMMENDED COURSES
// ===============================
const getRecommendedCourses = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const filter = {
      m_course_recomended: 1,
      m_course_status: 1,
    };

    const total = await Course.countDocuments(filter);

    const courses = await Course.find(filter)
      .sort({ m_course_order: 1, _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const finalData = courses.map((c) => ({
      _id: c._id,
      title: c.m_course_title,
      code: c.m_course_code,
      banner: c.m_course_banner,
      type: c.m_course_type === 1 ? "Free" : "Paid",
      price: c.m_course_type === 1 ? "N/A" : c.m_course_price,
      offer_price: c.m_course_type === 1 ? "N/A" : c.m_course_offer_price,
      slug: c.m_course_slug,
    }));

    res.json({
      status: true,
      message: "Recommended courses fetched",
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: finalData,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  addCourse,
  getAllCourses,
  getCategoryDropdown,
  updateCourse,
  deleteCourse,
  getPopularCourses,
  getRecommendedCourses,
};
