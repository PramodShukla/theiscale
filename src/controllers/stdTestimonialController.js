const Testimonial = require("../models/stdtestimonial");
const fs = require("fs");

const addTestimonial = async (req, res) => {
  try {
    const { m_st_url, m_st_status } = req.body;

    const video = req.files?.m_st_video
      ? req.files.m_st_video[0].path
      : null;

    const newData = new Testimonial({
      m_st_video: video,
      m_st_url,
      m_st_status: m_st_status ? Number(m_st_status) : 1
    });

    const saved = await newData.save();

    res.status(201).json({
      status: true,
      message: "Testimonial added",
      data: saved
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const getAllTestimonials = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Testimonial.countDocuments();

    const data = await Testimonial.find()
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      status: true,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Testimonial.findById(id);
    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Not found"
      });
    }

    const { m_st_url, m_st_status } = req.body;

    if (m_st_url) data.m_st_url = m_st_url;
    if (m_st_status !== undefined)
      data.m_st_status = Number(m_st_status);

    if (req.files?.m_st_video) {
      if (data.m_st_video && fs.existsSync(data.m_st_video)) {
        fs.unlinkSync(data.m_st_video);
      }
      data.m_st_video = req.files.m_st_video[0].path;
    }

    data.m_st_updated_on = new Date();

    const updated = await data.save();

    res.json({
      status: true,
      message: "Updated successfully",
      data: updated
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Testimonial.findById(id);
    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Not found"
      });
    }

    if (data.m_st_video && fs.existsSync(data.m_st_video)) {
      fs.unlinkSync(data.m_st_video);
    }

    await Testimonial.findByIdAndDelete(id);

    res.json({
      status: true,
      message: "Deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  addTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial
};