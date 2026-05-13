const TestCategory = require("../models/test_categories");

const fs = require("fs");

// ======================================================
// DELETE FILE FUNCTION
// ======================================================

const deleteFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// ======================================================
// ADD TEST CATEGORY
// ======================================================

const addTestCategory = async (req, res) => {
  let iconPath = null;

  let bannerPath = null;

  try {
    const {
      test_categoryName,
      test_category_description,
      test_category_status,
    } = req.body;

    // uploaded files
    iconPath = req.files?.test_category_icon?.[0]?.path || null;

    bannerPath = req.files?.test_category_banner?.[0]?.path || null;

    // validation
    if (!test_categoryName) {
      deleteFile(iconPath);

      deleteFile(bannerPath);

      return res.status(400).json({
        status: false,
        message: "Category name is required",
      });
    }

    // auto increment id
    const lastCategory = await TestCategory.findOne().sort({
      test_categoryId: -1,
    });

    const nextId = lastCategory
      ? lastCategory.test_categoryId + 1
      : 1;

    // create
    const category = await TestCategory.create({
      test_categoryId: nextId,

      test_categoryName,

      test_category_icon: iconPath,

      test_category_banner: bannerPath,

      test_category_description:
        test_category_description || null,

      test_category_status:
        test_category_status || 1,

      test_category_created: new Date(),
    });

    return res.status(201).json({
      status: true,

      message: "Test category added successfully",

      data: category,
    });
  } catch (error) {
    // rollback uploaded files
    deleteFile(iconPath);

    deleteFile(bannerPath);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET ALL TEST CATEGORIES
// ======================================================

const getAllTestCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const status = req.query.status;

    const filter = {};

    // status filter
    if (status !== undefined) {
      filter.test_category_status = Number(status);
    }

    // search filter
    if (search) {
      filter.test_categoryName = {
        $regex: search,
        $options: "i",
      };
    }

    const categories = await TestCategory.find(filter)

      .sort({
        test_categoryId: -1,
      })

      .skip(skip)

      .limit(limit);

    const totalRecords =
      await TestCategory.countDocuments(filter);

    return res.status(200).json({
      status: true,

      current_page: page,

      total_pages: Math.ceil(totalRecords / limit),

      total_records: totalRecords,

      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET SINGLE TEST CATEGORY
// ======================================================

const getSingleTestCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await TestCategory.findById(
      categoryId,
    );

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Test category not found",
      });
    }

    return res.status(200).json({
      status: true,

      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ======================================================
// UPDATE TEST CATEGORY
// ======================================================

const updateTestCategory = async (req, res) => {
  let newIcon = null;

  let newBanner = null;

  try {
    const categoryId = req.params.id;

    const {
      test_categoryName,
      test_category_description,
      test_category_status,
    } = req.body;

    const category = await TestCategory.findById(
      categoryId,
    );

    if (!category) {
      // delete new uploads
      deleteFile(
        req.files?.test_category_icon?.[0]?.path,
      );

      deleteFile(
        req.files?.test_category_banner?.[0]?.path,
      );

      return res.status(404).json({
        status: false,
        message: "Test category not found",
      });
    }

    // old files
    const oldIcon = category.test_category_icon;

    const oldBanner = category.test_category_banner;

    // new uploaded files
    newIcon =
      req.files?.test_category_icon?.[0]?.path || null;

    newBanner =
      req.files?.test_category_banner?.[0]?.path || null;

    // update data
    category.test_categoryName =
      test_categoryName ||
      category.test_categoryName;

    category.test_category_description =
      test_category_description ||
      category.test_category_description;

    category.test_category_status =
      test_category_status ??
      category.test_category_status;

    // replace images
    if (newIcon) {
      category.test_category_icon = newIcon;
    }

    if (newBanner) {
      category.test_category_banner = newBanner;
    }

    await category.save();

    // delete old files after success
    if (newIcon) {
      deleteFile(oldIcon);
    }

    if (newBanner) {
      deleteFile(oldBanner);
    }

    return res.status(200).json({
      status: true,

      message:
        "Test category updated successfully",

      data: category,
    });
  } catch (error) {
    // rollback new uploads
    deleteFile(newIcon);

    deleteFile(newBanner);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ======================================================
// DELETE TEST CATEGORY
// ======================================================

const deleteTestCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await TestCategory.findById(
      categoryId,
    );

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Test category not found",
      });
    }

    // delete files
    deleteFile(category.test_category_icon);

    deleteFile(category.test_category_banner);

    // delete db document
    await TestCategory.findByIdAndDelete(categoryId);

    return res.status(200).json({
      status: true,

      message:
        "Test category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// ======================================================
// USER TEST CATEGORY DROPDOWN
// ======================================================

const getTestCategoryDropdown = async (req, res) => {
  try {
    const categories = await TestCategory.find({
      test_category_status: 1,
    })
      .select(`
        _id
        test_categoryName
      `)
      .sort({
        test_categoryName: 1,
      });

    const finalData = categories.map((item) => ({
      id: item._id,

      name: item.test_categoryName,
    }));

    return res.status(200).json({
      status: true,

      data: finalData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};


module.exports = {
  addTestCategory,

  getAllTestCategories,

  getSingleTestCategory,

  updateTestCategory,

  deleteTestCategory,

  getTestCategoryDropdown,
};