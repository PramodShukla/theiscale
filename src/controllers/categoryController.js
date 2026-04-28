const Category = require("../models/master_category");

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


// GET ALL CATEGORIES
// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.find()
//       .sort({ m_category_order: 1 }); // order wise sorting

//     res.send({
//       status: true,
//       message: "Categories fetched successfully",
//       data: categories,
//     });

//   } catch (e) {
//     res.status(500).send({
//       status: false,
//       message: e.message,
//     });
//   }
// };

// exports.getAllCategories = async (req, res) => {
//   try {

//     // ✅ pagination params
//     let page = parseInt(req.query.page) || 1;
//     let limit = parseInt(req.query.limit) || 10;

//     let skip = (page - 1) * limit;

//     // ✅ data query with pagination
//     const categories = await Category.find()
//       .sort({ m_category_order: 1 })
//       .skip(skip)
//       .limit(limit);

//     // ✅ total records count
//     const total = await Category.countDocuments();

//     res.send({
//       status: true,
//       message: "Categories fetched successfully",
//       page,
//       totalPages: Math.ceil(total / limit),
//       totalRecords: total,
//       data: categories,
//     });

//   } catch (e) {
//     res.status(500).send({
//       status: false,
//       message: e.message,
//     });
//   }
// };



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
    if (m_category_status !== undefined) category.m_category_status = m_category_status;
    if (m_category_order !== undefined) category.m_category_order = m_category_order;
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