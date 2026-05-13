const NotesCategory = require("../models/notes_category.js");

const fs = require("fs");

// ======================================================
// DELETE FILE
// ======================================================

const deleteFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// ======================================================
// ADD NOTES CATEGORY
// ======================================================

const addNotesCategory = async (req, res) => {
  let iconPath = null;

  let bannerPath = null;

  try {
    const {
      nc_name,
      nc_status,
      nc_keywords,
      nc_order,
      nc_description,
    } = req.body;

    iconPath =
      req.files?.nc_icon?.[0]?.path || null;

    bannerPath =
      req.files?.nc_banner?.[0]?.path || null;

    // validation

    if (!nc_name) {
      deleteFile(iconPath);

      deleteFile(bannerPath);

      return res.status(400).json({
        status: false,
        message:
          "Notes category name is required",
      });
    }

    const category =
      await NotesCategory.create({
        nc_name,

        nc_status:
          nc_status || "active",

        nc_keywords:
          nc_keywords || null,

        nc_order: nc_order || 0,

        nc_icon: iconPath,

        nc_banner: bannerPath,

        nc_description:
          nc_description || null,
      });

    return res.status(201).json({
      status: true,

      message:
        "Notes category added successfully",

      data: category,
    });
  } catch (error) {
    deleteFile(iconPath);

    deleteFile(bannerPath);

    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

// ======================================================
// GET ALL NOTES CATEGORY
// ======================================================

const getAllNotesCategories = async (
  req,
  res,
) => {
  try {
    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const search =
      req.query.search || "";

    const filter = {};

    // search

    if (search) {
      filter.nc_name = {
        $regex: search,
        $options: "i",
      };
    }

    const data =
      await NotesCategory.find(filter)
        .sort({
          nc_order: 1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    const totalRecords =
      await NotesCategory.countDocuments(
        filter,
      );

    return res.status(200).json({
      status: true,

      current_page: page,

      total_pages: Math.ceil(
        totalRecords / limit,
      ),

      total_records: totalRecords,

      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

// ======================================================
// GET SINGLE NOTES CATEGORY
// ======================================================

const getSingleNotesCategory = async (
  req,
  res,
) => {
  try {
    const categoryId = req.params.id;

    const data =
      await NotesCategory.findById(
        categoryId,
      );

    if (!data) {
      return res.status(404).json({
        status: false,

        message:
          "Notes category not found",
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

// ======================================================
// NOTES CATEGORY DROPDOWN
// ======================================================

const getNotesCategoryDropdown =
  async (req, res) => {
    try {
      const data =
        await NotesCategory.find({
          nc_status: "active",
        })
          .select(`
          _id
          nc_name
        `)
          .sort({
            nc_name: 1,
          });

      const finalData = data.map((item) => ({
        id: item._id,

        name: item.nc_name,
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

// ======================================================
// CHANGE STATUS
// ======================================================

const changeNotesCategoryStatus =
  async (req, res) => {
    try {
      const categoryId = req.params.id;

      const category =
        await NotesCategory.findById(
          categoryId,
        );

      if (!category) {
        return res.status(404).json({
          status: false,

          message:
            "Notes category not found",
        });
      }

      category.nc_status =
        category.nc_status === "active"
          ? "inactive"
          : "active";

      await category.save();

      return res.status(200).json({
        status: true,

        message:
          "Notes category status updated successfully",

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
// UPDATE NOTES CATEGORY
// ======================================================

const updateNotesCategory = async (
  req,
  res,
) => {
  let newIcon = null;

  let newBanner = null;

  try {
    const categoryId = req.params.id;

    const {
      nc_name,
      nc_status,
      nc_keywords,
      nc_order,
      nc_description,
    } = req.body;

    const category =
      await NotesCategory.findById(
        categoryId,
      );

    if (!category) {
      deleteFile(
        req.files?.nc_icon?.[0]?.path,
      );

      deleteFile(
        req.files?.nc_banner?.[0]?.path,
      );

      return res.status(404).json({
        status: false,

        message:
          "Notes category not found",
      });
    }

    // old files

    const oldIcon = category.nc_icon;

    const oldBanner = category.nc_banner;

    // new files

    newIcon =
      req.files?.nc_icon?.[0]?.path || null;

    newBanner =
      req.files?.nc_banner?.[0]?.path || null;

    // update only sent fields

    if (nc_name !== undefined)
      category.nc_name = nc_name;

    if (nc_status !== undefined && nc_status !== "")
      category.nc_status = nc_status;

    if (nc_keywords !== undefined)
      category.nc_keywords = nc_keywords;

    if (nc_order !== undefined)
      category.nc_order = nc_order;

    if (nc_description !== undefined)
      category.nc_description =
        nc_description;

    if (newIcon) {
      category.nc_icon = newIcon;
    }

    if (newBanner) {
      category.nc_banner = newBanner;
    }

    await category.save();

    // delete old after success

    if (newIcon) {
      deleteFile(oldIcon);
    }

    if (newBanner) {
      deleteFile(oldBanner);
    }

    return res.status(200).json({
      status: true,

      message:
        "Notes category updated successfully",

      data: category,
    });
  } catch (error) {
    deleteFile(newIcon);

    deleteFile(newBanner);

    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

// ======================================================
// DELETE NOTES CATEGORY
// ======================================================

const deleteNotesCategory = async (
  req,
  res,
) => {
  try {
    const categoryId = req.params.id;

    const category =
      await NotesCategory.findById(
        categoryId,
      );

    if (!category) {
      return res.status(404).json({
        status: false,

        message:
          "Notes category not found",
      });
    }

    // delete files

    deleteFile(category.nc_icon);

    deleteFile(category.nc_banner);

    // delete document

    await NotesCategory.findByIdAndDelete(
      categoryId,
    );

    return res.status(200).json({
      status: true,

      message:
        "Notes category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

module.exports = {
  addNotesCategory,

  getAllNotesCategories,

  getSingleNotesCategory,

  getNotesCategoryDropdown,

  changeNotesCategoryStatus,

  updateNotesCategory,

  deleteNotesCategory,
};