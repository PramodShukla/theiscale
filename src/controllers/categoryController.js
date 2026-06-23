const Category = require("../models/category");
const Course = require("../models/course");
const Subject = require("../models/subject");


// helper slug function
const generateSlug = (name) => {
  return name.toLowerCase().replace(/ /g, "-");
};

exports.createCategory = async (req, res) => {
  try {
    const {
      m_category_name,
      m_category_desc,
      m_category_status,
      m_category_order,
      m_category_keywords,
    } = req.body;

    // validation
    if (!m_category_name || !m_category_desc) {
      return res.status(400).send({
        status: false,
        message: "Name and Description are required",
      });
    }

    // files
    const icon = req.files["category_icon"]?.[0]?.path || "";
    const banner = req.files["category_banner"]?.[0]?.path || "";

    const newCategory = new Category({
      m_category_for: 1, // course category
      m_category_name,
      m_category_slug: generateSlug(m_category_name),
      m_category_desc,
      m_category_icon: icon,
      m_category_banner: banner,
      m_category_status: m_category_status || 1,
      m_category_order: m_category_order || 0,
      m_category_keywords,
    });

    const saved = await newCategory.save();

    res.send({
      status: true,
      message: "Category created successfully",
      data: saved,
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};



exports.getAllCategories = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    let filter = {};

    // 🔍 search
    if (search) {
      filter = {
        $or: [
          { m_category_name: { $regex: search, $options: "i" } },
          { m_category_desc: { $regex: search, $options: "i" } },
          { m_category_keywords: { $regex: search, $options: "i" } },
        ],
      };
    }

    const skip = (page - 1) * limit;

    const categories = await Category.find(filter)
      .sort({ m_category_order: 1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Category.countDocuments(filter);

    res.send({
      status: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: categories,
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).send({
        status: false,
        message: "Category not found",
      });
    }

    const {
      m_category_name,
      m_category_desc,
      m_category_status,
      m_category_order,
      m_category_keywords,
    } = req.body;

    // files
    const icon = req.files?.category_icon?.[0]?.path;
    const banner = req.files?.category_banner?.[0]?.path;

    // update fields
    if (m_category_name) {
      category.m_category_name = m_category_name;
      category.m_category_slug = generateSlug(m_category_name);
    }

    if (m_category_desc) category.m_category_desc = m_category_desc;
    if (m_category_status !== undefined)
      category.m_category_status = m_category_status;
    if (m_category_order !== undefined)
      category.m_category_order = m_category_order;
    if (m_category_keywords) category.m_category_keywords = m_category_keywords;

    if (icon) category.m_category_icon = icon;
    if (banner) category.m_category_banner = banner;

    const updated = await category.save();

    res.send({
      status: true,
      message: "Category updated successfully",
      data: updated,
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).send({
        status: false,
        message: "Category not found",
      });
    }

    await Category.findByIdAndDelete(id);

    res.send({
      status: true,
      message: "Category deleted successfully",
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

//Mobile app apis=============================================================================================================

exports.appGetCategoryWiseCourses = async (req, res) => {
  try {
    const categories = await Category.find({
      m_category_for: 1,
    }).sort({ m_category_order: 1 });

    const result = [];

    for (const category of categories) {
      const courses = await Course.find({
        m_course_category: category._id,
        m_course_status: 1,
      });

      const formattedCourses = courses.map((course) => ({
        course_id: course._id,
        course_name: course.m_course_title || "",
        course_image: course.m_course_banner || "",
        course_price: String(course.m_course_price || 0),
        course_offerprice: String(course.m_course_offer_price || 0),
        course_views: String(course.m_course_view || 0),
        course_rating: String(course.m_course_rating || 0),
        course_duration: String(course.m_course_duration_web || 0),
        course_reviews: String(course.m_course_reviews || 0),

        // currently same as rating
        total_rating: String(course.m_course_rating || 0),

        // abhi calculation nahi hai schema me
        totalPercent: 0,

        // subject collection connect hone par dynamic kar lena
        total_subjects: "0",
      }));

      result.push({
        category_id: category._id,
        category_name: category.m_category_name,
        Courses: formattedCourses,
      });
    }

    return res.status(200).json({
      response: "success",
      Category: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      response: "error",
      message: error.message,
    });
  }
};


exports.appGetCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      m_category_for: 1, // Course Category
      m_category_status: 1,
    }).sort({ m_category_order: 1 });

    const result = await Promise.all(
      categories.map(async (category) => {
        const totalCourses = await Course.countDocuments({
          m_course_category: category._id,
          m_course_status: 1,
        });

        return {
          category_id: category._id,

          category_name: category.m_category_name,

          total_course: String(totalCourses),

          category_image:
            category.m_category_banner || category.m_category_icon || "",
        };
      }),
    );

    return res.status(200).json({
      response: "success",
      Category: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      response: "error",
      message: error.message,
    });
  }
};


exports.appGetCoursesByCategory = async (req, res) => {
  try {
    const { category_id } = req.body;

    if (!category_id) {
      return res.status(400).json({
        response: "error",
        message: "category_id is required",
      });
    }

    const courses = await Course.find({
      m_course_category: category_id,
      m_course_status: 1,
      m_course_status_web: 1,
    }).sort({ m_course_order: 1 });

    const formattedCourses = await Promise.all(
      courses.map(async (course) => {

        let totalSubjects = 0;

        try {
          totalSubjects = await Subject.countDocuments({
            m_subject_course: course._id,
          });
        } catch (error) {
          totalSubjects = 0;
        }

        const actualPrice = Number(course.m_course_price || 0);
        const offerPrice = Number(course.m_course_offer_price || 0);

        let totalPercent = 0;

        if (
          actualPrice > 0 &&
          offerPrice >= 0 &&
          actualPrice > offerPrice
        ) {
          totalPercent = Math.round(
            ((actualPrice - offerPrice) / actualPrice) * 100
          );
        }

        return {
          course_id: String(course._id),
          course_name: course.m_course_title || "",
          course_image: course.m_course_banner || "",

          course_price: String(actualPrice),
          course_offerprice: String(offerPrice),

          course_views: String(course.m_course_view || 0),

          course_rating: String(course.m_course_rating || 0),

          course_duration: String(
            course.m_course_duration_app || 0
          ),

          course_reviews: String(
            course.m_course_reviews || 0
          ),

          total_rating: String(
            course.m_course_rating || 0
          ),

          totalPercent,

          total_subjects: String(totalSubjects),
        };
      })
    );

    return res.status(200).json({
      response: "success",
      courses: formattedCourses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      response: "error",
      message: error.message,
    });
  }
};