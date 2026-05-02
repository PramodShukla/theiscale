const Allied = require("../models/allied");
const fs = require("fs");

// 🔥 COMMON FILE DELETE
const deleteUploadedFiles = (files) => {
  if (!files) return;

  Object.values(files).forEach((fileArray) => {
    fileArray.forEach((file) => {
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
  });
};

// =======================
// ADD
// =======================
const addAllied = async (req, res) => {
  try {
    const { m_allied_title } = req.body;

    if (!m_allied_title) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({
        status: false,
        message: "Name is required",
      });
    }

    const data = await Allied.create({
      m_allied_title,
      m_allied_image: req.files?.m_allied_image?.[0]?.path,
    });

    res.json({
      status: true,
      message: "Added successfully",
      data,
    });

  } catch (err) {
    deleteUploadedFiles(req.files);
    res.status(500).json({ status: false, message: err.message });
  }
};

// =======================
// UPDATE
// =======================
const updateAllied = async (req, res) => {
  try {
    const item = await Allied.findById(req.params.id);

    if (!item) {
      deleteUploadedFiles(req.files);
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    if (req.body.m_allied_title) {
      item.m_allied_title = req.body.m_allied_title;
    }

    // image update
    if (req.files?.m_allied_image) {
      if (item.m_allied_image && fs.existsSync(item.m_allied_image)) {
        fs.unlinkSync(item.m_allied_image);
      }

      item.m_allied_image = req.files.m_allied_image[0].path;
    }

    await item.save();

    res.json({
      status: true,
      message: "Updated successfully",
      data: item,
    });

  } catch (err) {
    deleteUploadedFiles(req.files);
    res.status(500).json({ status: false, message: err.message });
  }
};

// =======================
// GET ALL (Pagination)
// =======================
const getAllAllied = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const data = await Allied.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Allied.countDocuments();

    res.json({
      status: true,
      total,
      page,
      limit,
      data,
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// =======================
// DELETE
// =======================
const deleteAllied = async (req, res) => {
  try {
    const item = await Allied.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    if (item.m_allied_image && fs.existsSync(item.m_allied_image)) {
      fs.unlinkSync(item.m_allied_image);
    }

    await Allied.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: "Deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  addAllied,
  updateAllied,
  getAllAllied,
  deleteAllied,
};