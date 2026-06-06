const News = require("../models/news");
const fs = require("fs");

const deleteFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const addNews = async (req, res) => {
  try {
    const image = req.files?.m_snews_image?.[0]?.path || null;

    const news = await News.create({
      m_snews_title: req.body.m_snews_title || null,
      m_snews_image: image,
      m_snews_des: req.body.m_snews_des || null,
      m_snews_url: req.body.m_snews_url || null,
      m_snews_added_on: new Date(),
      m_snews_updated_on: new Date(),
    });

    res.json({
      status: true,
      message: "News added successfully",
      data: news,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        status: false,
        message: "News not found",
      });
    }

    const fields = ["m_snews_title", "m_snews_des", "m_snews_url"];

    fields.forEach((field) => {
      if (
        req.body[field] !== undefined &&
        req.body[field] !== null &&
        req.body[field].toString().trim() !== ""
      ) {
        news[field] = req.body[field];
      }
    });

    if (
      req.body.m_snews_status &&
      ["active", "inactive"].includes(req.body.m_snews_status)
    ) {
      news.m_snews_status = req.body.m_snews_status;
    }

    if (req.files?.m_snews_image?.[0]) {
      deleteFile(news.m_snews_image);

      news.m_snews_image = req.files.m_snews_image[0].path;
    }

    news.m_snews_updated_on = new Date();

    await news.save();

    res.json({
      status: true,
      message: "Updated successfully",
      data: news,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    // image delete
    deleteFile(news.m_snews_image);

    await News.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;

    const skip = (page - 1) * limit;

    const data = await News.find().sort({ _id: -1 }).skip(skip).limit(limit);

    const total = await News.countDocuments();

    res.json({
      status: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const getSingleNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        status: false,
        message: "News not found",
      });
    }

    res.json({
      status: true,
      data: news,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const changeNewsStatus = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        status: false,
        message: "News not found",
      });
    }

    news.m_snews_status =
      news.m_snews_status === "active" ? "inactive" : "active";

    news.m_snews_updated_on = new Date();

    await news.save();

    res.json({
      status: true,
      message: `News ${
        news.m_snews_status === "active" ? "activated" : "deactivated"
      } successfully`,
      data: news,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  addNews,
  updateNews,
  deleteNews,
  getAllNews,
  getSingleNews,
  changeNewsStatus
};
