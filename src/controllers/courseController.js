const Course = require("../models/course");
const slugify = require("slugify");
const fs = require("fs");
const Category = require("../models/category");
const mongoose = require("mongoose");
const LectureProgress = require("../models/lecture_progress");
const Subject = require("../models/subject");
const Lecture = require("../models/lecture");
const Enrollment = require("../models/course_enrollment");


// ===============================
// ADD COURSE
// ===============================
const addCourse = async (req, res) => {
  try {
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
      m_course_access_type,
      m_course_access_days,

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

    // =========================
    // REQUIRED FIELD VALIDATION
    // =========================
    const requiredFields = {
      m_course_lang,
      m_course_title,
      m_course_status,
      m_course_status_web,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => value === undefined || value === null || value === "")
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Required fields are missing",
        missing_fields: missingFields,
      });
    }

    // =========================
    // OBJECT ID VALIDATION
    // =========================
    if (m_course_category && !mongoose.Types.ObjectId.isValid(m_course_category)) {
      return res.status(400).json({ status: false, message: "Invalid category id" });
    }

    if (m_course_trainee && !mongoose.Types.ObjectId.isValid(m_course_trainee)) {
      return res.status(400).json({ status: false, message: "Invalid instructor id" });
    }

    // =========================
    // ENUM VALIDATIONS
    // =========================
    if (m_course_type !== undefined && ![1, 2].includes(Number(m_course_type))) {
      return res.status(400).json({ status: false, message: "Invalid course type (1=Free, 2=Paid)" });
    }

    if (m_course_access_type && !["lifetime", "limited"].includes(m_course_access_type)) {
      return res.status(400).json({ status: false, message: "Invalid access type" });
    }

    if (m_course_access_type === "limited") {
      if (!m_course_access_days || Number(m_course_access_days) <= 0) {
        return res.status(400).json({
          status: false,
          message: "Access days required for limited course",
        });
      }
    }

    if (m_course_certificate !== undefined && ![1, 2].includes(Number(m_course_certificate))) {
      return res.status(400).json({ status: false, message: "Invalid certificate value" });
    }

    if (![0, 1].includes(Number(m_course_status))) {
      return res.status(400).json({ status: false, message: "Invalid course status" });
    }

    if (![0, 1].includes(Number(m_course_status_web))) {
      return res.status(400).json({ status: false, message: "Invalid course status web" });
    }

    // =========================
    // PRICE VALIDATION
    // =========================
    if (Number(m_course_type) === 2) {
      if (!m_course_price || Number(m_course_price) <= 0) {
        return res.status(400).json({
          status: false,
          message: "Price required for paid course",
        });
      }
    }

    if (
      m_course_offer_price &&
      m_course_price &&
      Number(m_course_offer_price) > Number(m_course_price)
    ) {
      return res.status(400).json({
        status: false,
        message: "Offer price cannot be greater than actual price",
      });
    }

    // =========================
    // DUPLICATE COURSE CODE
    // =========================
    if (m_course_code) {
      const exists = await Course.findOne({ m_course_code: m_course_code.trim() });
      if (exists) {
        deleteUploadedFiles(req.files);
        return res.status(409).json({
          status: false,
          message: "Course code already exists",
        });
      }
    }

    // =========================
    // FILE HANDLING (SAFE)
    // =========================
    const getFile = (name) =>
      req.files?.[name]?.[0]?.path || null;

    const m_course_banner = getFile("m_course_banner");
    const m_course_pdf = getFile("m_course_pdf");
    const m_course_feestructure = getFile("m_course_feestructure");
    const m_course_brochure = getFile("m_course_brochure");

    // =========================
    // SLUG GENERATION
    // =========================
    let slug = slugify(m_course_title, { lower: true, strict: true });

    const slugExists = await Course.findOne({ m_course_slug: slug });
    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }

    // =========================
    // YOUTUBE VIDEO ID
    // =========================
    let videoId = null;
    if (m_course_video_link) {
      const match = m_course_video_link.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
      );
      if (match) videoId = match[1];
    }

    // =========================
    // CREATE OBJECT
    // =========================
    const newCourse = new Course({
      m_course_lang: Number(m_course_lang),
      m_course_category: m_course_category || null,
      m_course_cat_slug: m_course_cat_slug || null,
      m_course_title: m_course_title.trim(),
      m_course_slug: slug,
      m_course_intro: m_course_intro || null,
      m_course_code: m_course_code?.trim() || null,

      m_course_banner,
      m_course_pdf,
      m_course_feestructure,
      m_course_brochure,

      m_course_video_link: m_course_video_link || null,
      m_course_video_id: videoId,

      m_course_description: m_course_description || null,

      m_course_type:
        m_course_type !== undefined ? Number(m_course_type) : null,
      m_course_price: Number(m_course_price) || 0,
      m_course_offer_price: Number(m_course_offer_price) || 0,

      m_course_access_type: m_course_access_type || "lifetime",
      m_course_access_days:
        m_course_access_type === "limited"
          ? Number(m_course_access_days)
          : null,

      m_course_popular: Number(m_course_popular) || 0,
      m_course_recomended: Number(m_course_recomended) || 0,
      m_course_keyword: m_course_keyword || null,

      m_course_status: Number(m_course_status),
      m_course_status_web: Number(m_course_status_web),

      m_course_view: 0,
      m_course_like: 0,
      m_course_dislike: 0,
      m_course_rating: 0,
      m_course_reviews: 0,
      m_course_share: 0,

      m_course_duration_app: m_course_duration_app?.toString() || null,
      m_course_duration_web: m_course_duration_web
        ? Number(m_course_duration_web)
        : null,

      m_course_trainee: m_course_trainee
        ? new mongoose.Types.ObjectId(m_course_trainee)
        : null,

      m_course_certificate:
        m_course_certificate !== undefined
          ? Number(m_course_certificate)
          : null,

      m_course_app_g_link: m_course_app_g_link || null,
      m_course_web_g_link: m_course_web_g_link || null,
      m_course_graphy_instruction: m_course_graphy_instruction || null,

      m_course_order: m_course_order ? Number(m_course_order) : null,

      m_course_modified: new Date(),
    });

    const savedCourse = await newCourse.save();

    return res.status(201).json({
      status: true,
      message: "Course added successfully",
      data: savedCourse,
    });
  } catch (error) {
    console.error("Add Course Error:", error);

    if (req.files) deleteUploadedFiles(req.files);

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        status: false,
        message: `${field} already exists`,
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
        fs.unlink(file.path, (err) => {
          if (err) console.log(err);
        });
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
      .populate("m_course_category", "m_category_name")
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
    // HELPER FUNCTION (🔥 IMPORTANT)
    // =========================
    const isValid = (val) => {
      return val !== undefined && val !== null && val.toString().trim() !== "";
    };

    const body = req.body;
    let updateData = {};

    // =========================
    // BASIC FIELDS
    // =========================
    if (isValid(body.m_course_lang))
      updateData.m_course_lang = Number(body.m_course_lang);

    if (isValid(body.m_course_category))
      updateData.m_course_category = body.m_course_category;

    if (isValid(body.m_course_cat_slug))
      updateData.m_course_cat_slug = body.m_course_cat_slug;

    if (isValid(body.m_course_title)) {
      updateData.m_course_title = body.m_course_title.trim();

      // SLUG UPDATE
      let slug = slugify(body.m_course_title, {
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

    if (isValid(body.m_course_intro))
      updateData.m_course_intro = body.m_course_intro;

    // =========================
    // ACCESS TYPE ( NEW)
    // =========================
    if (isValid(body.m_course_access_type)) {
      if (!["lifetime", "limited"].includes(body.m_course_access_type)) {
        return res.status(400).json({
          status: false,
          message: "Invalid access type",
        });
      }

      updateData.m_course_access_type = body.m_course_access_type;
    }

    // =========================
    // ACCESS DAYS ( IMPORTANT)
    // =========================
    if (body.m_course_access_type === "limited") {
      if (!isValid(body.m_course_access_days)) {
        return res.status(400).json({
          status: false,
          message: "Access days required for limited course",
        });
      }

      updateData.m_course_access_days = Number(body.m_course_access_days);
    }

    // Lifetime case
    if (body.m_course_access_type === "lifetime") {
      updateData.m_course_access_days = null;
    }

    // =========================
    // COURSE CODE (UNIQUE)
    // =========================
    if (isValid(body.m_course_code)) {
      const existing = await Course.findOne({
        m_course_code: body.m_course_code.trim(),
        _id: { $ne: id },
      });

      if (existing) {
        return res.status(409).json({
          status: false,
          message: "Course code already exists",
        });
      }

      updateData.m_course_code = body.m_course_code.trim();
    }

    if (isValid(body.m_course_description))
      updateData.m_course_description = body.m_course_description;

    // =========================
    // VIDEO
    // =========================
    if (isValid(body.m_course_video_link)) {
      updateData.m_course_video_link = body.m_course_video_link;

      let videoId = null;
      const match = body.m_course_video_link.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
      );
      if (match) videoId = match[1];

      updateData.m_course_video_id = videoId;
    }

    // =========================
    // TYPE & PRICE
    // =========================
    if (isValid(body.m_course_type)) {
      if (![1, 2].includes(Number(body.m_course_type))) {
        return res.status(400).json({
          status: false,
          message: "Invalid course type",
        });
      }
      updateData.m_course_type = Number(body.m_course_type);
    }

    if (Number(body.m_course_type) === 2) {
      if (!isValid(body.m_course_price) || Number(body.m_course_price) <= 0) {
        return res.status(400).json({
          status: false,
          message: "Price required for paid course",
        });
      }
    }

    if (isValid(body.m_course_price))
      updateData.m_course_price = Number(body.m_course_price);

    if (isValid(body.m_course_offer_price))
      updateData.m_course_offer_price = Number(body.m_course_offer_price);

    // =========================
    // SETTINGS
    // =========================
    if (isValid(body.m_course_popular))
      updateData.m_course_popular = Number(body.m_course_popular);

    if (isValid(body.m_course_recomended))
      updateData.m_course_recomended = Number(body.m_course_recomended);

    if (isValid(body.m_course_keyword))
      updateData.m_course_keyword = body.m_course_keyword;

    if (isValid(body.m_course_status))
      updateData.m_course_status = Number(body.m_course_status);

    if (isValid(body.m_course_status_web))
      updateData.m_course_status_web = Number(body.m_course_status_web);

    // =========================
    // DURATION
    // =========================
    if (isValid(body.m_course_duration_app))
      updateData.m_course_duration_app = body.m_course_duration_app.toString();

    if (isValid(body.m_course_duration_web))
      updateData.m_course_duration_web = Number(body.m_course_duration_web);

    // =========================
    // INSTRUCTOR (🔥 SPECIAL CASE)
    // =========================
    if (body.m_course_trainee === null) {
      updateData.m_course_trainee = null;
    } else if (isValid(body.m_course_trainee)) {
      if (!mongoose.Types.ObjectId.isValid(body.m_course_trainee)) {
        return res.status(400).json({
          status: false,
          message: "Invalid instructor id",
        });
      }

      updateData.m_course_trainee = new mongoose.Types.ObjectId(
        body.m_course_trainee,
      );
    }

    // =========================
    // CERTIFICATE
    // =========================
    if (isValid(body.m_course_certificate))
      updateData.m_course_certificate = Number(body.m_course_certificate);

    // =========================
    // GRAPHY
    // =========================
    if (isValid(body.m_course_app_g_link))
      updateData.m_course_app_g_link = body.m_course_app_g_link;

    if (isValid(body.m_course_web_g_link))
      updateData.m_course_web_g_link = body.m_course_web_g_link;

    if (isValid(body.m_course_graphy_instruction))
      updateData.m_course_graphy_instruction = body.m_course_graphy_instruction;

    // =========================
    // ORDER
    // =========================
    if (isValid(body.m_course_order))
      updateData.m_course_order = Number(body.m_course_order);

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

// ===============================
// GET SINGLE COURSE BY ID
// ===============================
const getCourseById = async (req, res) => {
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

    // =========================
    // FETCH COURSE
    // =========================
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found",
      });
    }

    // =========================
    // CATEGORY NAME FETCH
    // =========================
    let categoryName = "N/A";

    if (course.m_course_category) {
      const category = await Category.findById(course.m_course_category);
      if (category) {
        categoryName = category.m_category_name;
      }
    }

    // =========================
    // FINAL RESPONSE
    // =========================
    const finalData = {
      _id: course._id,
      title: course.m_course_title,
      slug: course.m_course_slug,
      code: course.m_course_code,
      category: categoryName,

      banner: course.m_course_banner,
      pdf: course.m_course_pdf,
      fee_structure: course.m_course_feestructure,
      brochure: course.m_course_brochure,

      video_link: course.m_course_video_link,
      video_id: course.m_course_video_id,

      description: course.m_course_description,

      course_type: course.m_course_type === 1 ? "Free" : "Paid",
      price: course.m_course_price,
      offer_price: course.m_course_offer_price,

      status: course.m_course_status === 1 ? "Active" : "Inactive",
      status_web: course.m_course_status_web === 1 ? "Active" : "Inactive",

      duration_app: course.m_course_duration_app,
      duration_web: course.m_course_duration_web,

      popular: course.m_course_popular,
      recommended: course.m_course_recomended,

      created_at: course.createdAt,
      updated_at: course.m_course_modified,
    };

    return res.json({
      status: true,
      message: "Course fetched successfully",
      data: finalData,
    });
  } catch (error) {
    console.error("Get Course By ID Error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};




// =====================================================
// GET FULL COURSE CONTENT
// Course -> Subjects -> Lectures -> Progress
// =====================================================



module.exports = {
  addCourse,
  getAllCourses,
  getCategoryDropdown,
  updateCourse,
  deleteCourse,
  getPopularCourses,
  getRecommendedCourses,
  getCourseById,
 
};
