const SuccessStory = require("../models/success_story");

// ==========================
// ADD
// ==========================
const addSuccessStory = async (req, res) => {
  try {
    const { m_ss_name, m_ss_placed } = req.body;

    if (!m_ss_name || !m_ss_placed) {
      return res.status(400).json({
        status: false,
        message: "Name and Placed At are required",
      });
    }

    const data = await SuccessStory.create({
      m_ss_name,
      m_ss_placed,
      m_ss_package: req.body.m_ss_package || "N/A",
      m_ss_video: req.body.m_ss_video,
      m_ss_feedback: req.body.m_ss_feedback,
    });

    res.json({
      status: true,
      message: "Success story added",
      data,
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ==========================
// UPDATE
// ==========================
const updateSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    Object.keys(req.body).forEach((key) => {
      story[key] = req.body[key];
    });

    await story.save();

    res.json({
      status: true,
      message: "Updated successfully",
      data: story,
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ==========================
// GET (Pagination + Search)
// ==========================
const getAllSuccessStories = async (req, res) => {
  try {
    let { page = 1, limit = 10, search } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {};

    if (search) {
      filter.$or = [
        { m_ss_name: { $regex: search, $options: "i" } },
        { m_ss_placed: { $regex: search, $options: "i" } },
      ];
    }

    const data = await SuccessStory.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ _id: -1 });

    const total = await SuccessStory.countDocuments(filter);

    res.json({
      status: true,
      total,
      page,
      data,
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ==========================
// DELETE
// ==========================
const deleteSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    await SuccessStory.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: "Deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  addSuccessStory,
  updateSuccessStory,
  getAllSuccessStories,
  deleteSuccessStory,
};