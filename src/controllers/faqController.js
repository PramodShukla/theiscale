const slugify = require("slugify");
const CourseFAQ = require("../models/course_faq");
const mongoose = require("mongoose");

const addFAQ = async (req, res) => {
  try {
    const { course_id, title, description, status } = req.body;

    // VALIDATION
    if (!course_id || !title || !description || status === undefined) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(course_id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid course id",
      });
    }

    if (![0, 1].includes(Number(status))) {
      return res.status(400).json({
        status: false,
        message: "Status must be 0 or 1",
      });
    }

    const newFaq = new CourseFAQ({
      course_id,
      title,
      description,
      status: Number(status),
    });

    const saved = await newFaq.save();

    res.status(201).json({
      status: true,
      message: "FAQ added successfully",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};





const getFAQsByCourse = async (req, res) => {
  try {
    const { course_id } = req.params;

    if (!course_id) {
      return res.status(400).json({
        status: false,
        message: "course_id is required",
      });
    }

    const faqs = await CourseFAQ.find({ course_id })
      .sort({ created: -1 });

    res.json({
      status: true,
      data: faqs,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};




const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid FAQ ID",
      });
    }

    const faq = await CourseFAQ.findById(id);

    if (!faq) {
      return res.status(404).json({
        status: false,
        message: "FAQ not found",
      });
    }

    if (title) faq.title = title;
    if (description) faq.description = description;
    if (status !== undefined) faq.status = Number(status);

    faq.updated = new Date();

    const updated = await faq.save();

    res.json({
      status: true,
      message: "FAQ updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};






const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid FAQ ID",
      });
    }

    const faq = await CourseFAQ.findById(id);

    if (!faq) {
      return res.status(404).json({
        status: false,
        message: "FAQ not found",
      });
    }

    await CourseFAQ.findByIdAndDelete(id);

    res.json({
      status: true,
      message: "FAQ deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


module.exports = {
  addFAQ,
  getFAQsByCourse,
  updateFAQ,
  deleteFAQ,
};