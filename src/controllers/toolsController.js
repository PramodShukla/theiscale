const Tool = require("../models/master_course_tools");
const Course = require("../models/master_course_tbl");
const fs = require("fs");
const mongoose = require("mongoose");

// ===============================
// ADD TOOL
// ===============================
const addTool = async (req, res) => {
  try {
    const {
      c_tool_course,
      c_tool_course_slug,
      c_tool_title,
      c_tool_description,
      c_tool_status,
    } = req.body;

    if (!c_tool_course || !c_tool_title) {
      return res.status(400).json({
        status: false,
        message: "course and title are required",
      });
    }

    const course = await Course.findById(c_tool_course);
    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found",
      });
    }

    const image = req.files?.c_tool_img
      ? req.files.c_tool_img[0].path
      : null;

    const newTool = new Tool({
      c_tool_course,
      c_tool_course_slug: course.slug,
      c_tool_title,
      c_tool_description,
      c_tool_img: image,
      c_tool_status: c_tool_status ? Number(c_tool_status) : 1,
    });

    const saved = await newTool.save();

    res.status(201).json({
      status: true,
      message: "Tool added successfully",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// GET TOOLS BY COURSE
// ===============================
const getToolsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid course ID",
      });
    }

    const data = await Tool.find({
      c_tool_course: courseId,
    }).sort({ _id: -1 });

    res.json({
      status: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// UPDATE TOOL
// ===============================
const updateTool = async (req, res) => {
  try {
    const { id } = req.params;

    const tool = await Tool.findById(id);
    if (!tool) {
      return res.status(404).json({
        status: false,
        message: "Tool not found",
      });
    }

    const {
      c_tool_title,
      c_tool_description,
      c_tool_status,
    } = req.body;

    if (c_tool_title) tool.c_tool_title = c_tool_title;
    if (c_tool_description) tool.c_tool_description = c_tool_description;
    if (c_tool_status !== undefined)
      tool.c_tool_status = Number(c_tool_status);

    if (req.files?.c_tool_img) {
      if (tool.c_tool_img && fs.existsSync(tool.c_tool_img)) {
        fs.unlinkSync(tool.c_tool_img);
      }

      tool.c_tool_img = req.files.c_tool_img[0].path;
    }

    const updated = await tool.save();

    res.json({
      status: true,
      message: "Tool updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// DELETE TOOL
// ===============================
const deleteTool = async (req, res) => {
  try {
    const { id } = req.params;

    const tool = await Tool.findById(id);
    if (!tool) {
      return res.status(404).json({
        status: false,
        message: "Tool not found",
      });
    }

    if (tool.c_tool_img && fs.existsSync(tool.c_tool_img)) {
      fs.unlinkSync(tool.c_tool_img);
    }

    await Tool.findByIdAndDelete(id);

    res.json({
      status: true,
      message: "Tool deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  addTool,
  getToolsByCourse,
  updateTool,
  deleteTool,
};