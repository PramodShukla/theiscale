const EventCategory = require("../models/event_category");
const fs = require("fs");

const addEventCategory = async (req, res) => {
  try {
    const { m_ec_title } = req.body;

    if (!m_ec_title) {
      return res.status(400).json({
        status: false,
        message: "Category name is required",
      });
    }

    const category = await EventCategory.create({
      m_ec_title,
      m_ec_for: req.body.m_ec_for,
      m_ec_icon: req.files?.m_ec_icon?.[0]?.path,
      m_ec_banner: req.files?.m_ec_banner?.[0]?.path,
      m_ec_keyword: req.body.m_ec_keyword,
      m_ec_desc: req.body.m_ec_desc,
      m_ec_order: req.body.m_ec_order,
      m_ec_status: req.body.m_ec_status || 1,
    });

    res.json({
      status: true,
      message: "Category added",
      data: category,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


const updateEventCategory = async (req, res) => {
  try {
    const category = await EventCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    if (req.body.m_ec_title) {
      category.m_ec_title = req.body.m_ec_title;
    }

    if (req.body.m_ec_for) category.m_ec_for = req.body.m_ec_for;
    if (req.body.m_ec_keyword) category.m_ec_keyword = req.body.m_ec_keyword;
    if (req.body.m_ec_desc) category.m_ec_desc = req.body.m_ec_desc;
    if (req.body.m_ec_order) category.m_ec_order = req.body.m_ec_order;
    if (req.body.m_ec_status) category.m_ec_status = req.body.m_ec_status;

    // FILE UPDATE
    if (req.files?.m_ec_icon) {
      category.m_ec_icon = req.files.m_ec_icon[0].path;
    }

    if (req.files?.m_ec_banner) {
      category.m_ec_banner = req.files.m_ec_banner[0].path;
    }

    const updated = await category.save();

    res.json({
      status: true,
      message: "Updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


const getAllEventCategory = async (req, res) => {
  try {
    const data = await EventCategory.find().sort({ m_ec_order: 1 });

    res.json({
      status: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


const getEventCategoryDropdown = async (req, res) => {
  try {
    const data = await EventCategory.find({
      m_ec_status: 1,
    }).select("_id m_ec_title");

    res.json({
      status: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};




const deleteEventCategory = async (req, res) => {
  try {
    const category = await EventCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    // =========================
    // DELETE FILES (IMPORTANT)
    // =========================
    const filesToDelete = [
      category.m_ec_icon,
      category.m_ec_banner,
    ];

    filesToDelete.forEach((filePath) => {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    // =========================
    // DELETE FROM DB
    // =========================
    await EventCategory.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: "Deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


module.exports = {
  addEventCategory,
  updateEventCategory,
  getAllEventCategory,
  getEventCategoryDropdown,
  deleteEventCategory,
};