const NotesSubCategory = require(
  "../models/notes_subcategory",
);

const NotesCategory = require(
  "../models/notes_category.js",
);

const fs = require("fs");

const path = require("path");

// ======================================================
// DELETE FILE FUNCTION
// ======================================================

const deleteFile = (filePath) => {
  try {
    if (!filePath) return;

    const fullPath = path.resolve(filePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.log(
      "File delete error:",
      error.message,
    );
  }
};

// ======================================================
// ADD NOTES SUBCATEGORY
// ======================================================

const addNotesSubCategory = async (
  req,
  res,
) => {
  let iconPath = null;

  let bannerPath = null;

  try {
    const {
      notes_category_id,
      notes_subcategory_name,
      notes_subcategory_description,
      notes_subcategory_status,
    } = req.body;

    // =========================
    // FILES
    // =========================

    iconPath =
      req.files
        ?.notes_subcategory_icon?.[0]
        ?.path || null;

    bannerPath =
      req.files
        ?.notes_subcategory_banner?.[0]
        ?.path || null;

    // =========================
    // VALIDATION
    // =========================

    if (!notes_category_id) {
      deleteFile(iconPath);

      deleteFile(bannerPath);

      return res.status(400).json({
        status: false,
        message:
          "Notes category is required",
      });
    }

    if (!notes_subcategory_name) {
      deleteFile(iconPath);

      deleteFile(bannerPath);

      return res.status(400).json({
        status: false,
        message:
          "Subcategory name is required",
      });
    }

    // =========================
    // CATEGORY CHECK
    // =========================

    const category =
      await NotesCategory.findById(
        notes_category_id,
      );

    if (!category) {
      deleteFile(iconPath);

      deleteFile(bannerPath);

      return res.status(404).json({
        status: false,
        message:
          "Notes category not found",
      });
    }

    // =========================
    // CREATE
    // =========================

    const subcategory =
      await NotesSubCategory.create({
        notes_category_id,

        notes_subcategory_name,

        notes_subcategory_icon:
          iconPath,

        notes_subcategory_banner:
          bannerPath,

        notes_subcategory_description:
          notes_subcategory_description ||
          null,

        notes_subcategory_status:
          notes_subcategory_status ||
          "active",
      });

    return res.status(201).json({
      status: true,

      message:
        "Notes subcategory added successfully",

      data: subcategory,
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
// GET ALL NOTES SUBCATEGORY
// ======================================================

const getAllNotesSubCategory =
  async (req, res) => {
    try {
      const page =
        parseInt(req.query.page) || 1;

      const limit =
        parseInt(req.query.limit) || 10;

      const skip = (page - 1) * limit;

      const search =
        req.query.search || "";

      let filter = {};

      // =========================
      // SEARCH
      // =========================

      if (search) {
        filter.notes_subcategory_name = {
          $regex: search,
          $options: "i",
        };
      }

      const data =
        await NotesSubCategory.find(
          filter,
        )
          .populate({
            path: "notes_category_id",
            select:
              "nc_name",
          })
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit);

      const totalRecords =
        await NotesSubCategory.countDocuments(
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
// GET SINGLE NOTES SUBCATEGORY
// ======================================================

const getSingleNotesSubCategory =
  async (req, res) => {
    try {
      const id = req.params.id;

      const data =
        await NotesSubCategory.findById(
          id,
        ).populate({
          path: "notes_category_id",
          select:
            "notes_category_name",
        });

      if (!data) {
        return res.status(404).json({
          status: false,
          message:
            "Notes subcategory not found",
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
// DROPDOWN
// ======================================================

const getNotesSubCategoryDropdown =
  async (req, res) => {
    try {
      const { notes_category_id } =
        req.query;

      if (!notes_category_id) {
        return res.status(400).json({
          status: false,
          message:
            "notes_category_id is required",
        });
      }

      const data =
        await NotesSubCategory.find({
          notes_category_id,
          notes_subcategory_status:
            "active",
        })
          .select(`
          notes_subcategory_name
        `)
          .sort({
            notes_subcategory_name: 1,
          });

      const finalData = data.map(
        (item) => ({
          id: item._id,

          name:
            item.notes_subcategory_name,
        }),
      );

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

const changeNotesSubCategoryStatus =
  async (req, res) => {
    try {
      const id = req.params.id;

      const subcategory =
        await NotesSubCategory.findById(
          id,
        );

      if (!subcategory) {
        return res.status(404).json({
          status: false,
          message:
            "Notes subcategory not found",
        });
      }

      subcategory.notes_subcategory_status =
        subcategory.notes_subcategory_status ===
        "active"
          ? "inactive"
          : "active";

      await subcategory.save();

      return res.status(200).json({
        status: true,

        message:
          "Status updated successfully",

        data: subcategory,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,

        message: error.message,
      });
    }
  };

// ======================================================
// UPDATE NOTES SUBCATEGORY
// ======================================================

const updateNotesSubCategory =
  async (req, res) => {
    let newIcon = null;

    let newBanner = null;

    try {
      const id = req.params.id;

      const subcategory =
        await NotesSubCategory.findById(
          id,
        );

      if (!subcategory) {
        deleteFile(
          req.files
            ?.notes_subcategory_icon?.[0]
            ?.path,
        );

        deleteFile(
          req.files
            ?.notes_subcategory_banner?.[0]
            ?.path,
        );

        return res.status(404).json({
          status: false,
          message:
            "Notes subcategory not found",
        });
      }

      // =========================
      // OLD FILES
      // =========================

      const oldIcon =
        subcategory.notes_subcategory_icon;

      const oldBanner =
        subcategory.notes_subcategory_banner;

      // =========================
      // NEW FILES
      // =========================

      newIcon =
        req.files
          ?.notes_subcategory_icon?.[0]
          ?.path || null;

      newBanner =
        req.files
          ?.notes_subcategory_banner?.[0]
          ?.path || null;

      // =========================
      // UPDATE FIELDS
      // =========================

      const {
        notes_category_id,
        notes_subcategory_name,
        notes_subcategory_description,
        notes_subcategory_status,
      } = req.body;

      if (notes_category_id) {
        subcategory.notes_category_id =
          notes_category_id;
      }

      if (notes_subcategory_name) {
        subcategory.notes_subcategory_name =
          notes_subcategory_name;
      }

      if (
        notes_subcategory_description
      ) {
        subcategory.notes_subcategory_description =
          notes_subcategory_description;
      }

      if (
        notes_subcategory_status
      ) {
        subcategory.notes_subcategory_status =
          notes_subcategory_status;
      }

      if (newIcon) {
        subcategory.notes_subcategory_icon =
          newIcon;
      }

      if (newBanner) {
        subcategory.notes_subcategory_banner =
          newBanner;
      }

      await subcategory.save();

      // =========================
      // DELETE OLD FILES
      // =========================

      if (newIcon) {
        deleteFile(oldIcon);
      }

      if (newBanner) {
        deleteFile(oldBanner);
      }

      return res.status(200).json({
        status: true,

        message:
          "Notes subcategory updated successfully",

        data: subcategory,
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
// DELETE NOTES SUBCATEGORY
// ======================================================

const deleteNotesSubCategory =
  async (req, res) => {
    try {
      const id = req.params.id;

      const subcategory =
        await NotesSubCategory.findById(
          id,
        );

      if (!subcategory) {
        return res.status(404).json({
          status: false,
          message:
            "Notes subcategory not found",
        });
      }

      // delete files

      deleteFile(
        subcategory.notes_subcategory_icon,
      );

      deleteFile(
        subcategory.notes_subcategory_banner,
      );

      await NotesSubCategory.findByIdAndDelete(
        id,
      );

      return res.status(200).json({
        status: true,

        message:
          "Notes subcategory deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,

        message: error.message,
      });
    }
  };

module.exports = {
  addNotesSubCategory,

  getAllNotesSubCategory,

  getSingleNotesSubCategory,

  getNotesSubCategoryDropdown,

  changeNotesSubCategoryStatus,

  updateNotesSubCategory,

  deleteNotesSubCategory,
};