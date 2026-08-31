console.log("tools Controller Hit");

const Tool = require("../models/course_tools");
const Course = require("../models/course");
// const fs = require("fs");
const {
  extractUploadedFile,
  deleteFile,
} = require("../services/storageService");
const mongoose = require("mongoose");

// ADD TOOL
const addTool = async (req, res) => {
  let uploaded = null;

  if (req.files?.c_tool_img?.length) {
    uploaded = extractUploadedFile(req.files.c_tool_img[0]);
  }

  try {
    const {
      c_tool_course,
      c_tool_course_slug,
      c_tool_title,
      c_tool_description,
      c_tool_status,
    } = req.body;

    if (!c_tool_course || !c_tool_title) {
      if (uploaded?.public_id) {
    await deleteFile(uploaded.public_id);
}
      return res.status(400).json({
        status: false,
        message: "course and title are required",
      });
    }

    const course = await Course.findById(c_tool_course);
    if (!course) {
      if (uploaded?.public_id) {
    await deleteFile(uploaded.public_id);
}
      return res.status(404).json({
        status: false,
        message: "Course not found",
      });
    }

    // const image = req.files?.c_tool_img ? req.files.c_tool_img[0].path : null;
    let image = null;
let public_id = null;

if (uploaded) {
    image = uploaded.url;
    public_id = uploaded.public_id;
}

    const newTool = new Tool({
      c_tool_course,
      c_tool_course_slug: course.slug,
      c_tool_title,
      c_tool_description,
      c_tool_img: image,
      c_tool_img_public_id: public_id,
      c_tool_status: c_tool_status ? Number(c_tool_status) : 1,
    });

    const saved = await newTool.save();

    res.status(201).json({
      status: true,
      message: "Tool added successfully",
      data: saved,
    });
  } catch(err){

    if(uploaded?.public_id){
        await deleteFile(uploaded.public_id);
    }

    return res.status(500).json({
        status:false,
        message:err.message
    });
}
};

// GET TOOLS BY COURSE
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

// UPDATE TOOL
const updateTool = async (req, res) => {
  let uploaded = null;
  try {
    const { id } = req.params;

    const tool = await Tool.findById(id);
    if (!tool) {
      return res.status(404).json({
        status: false,
        message: "Tool not found",
      });
    }

    const { c_tool_title, c_tool_description, c_tool_status } = req.body;

    if (c_tool_title) tool.c_tool_title = c_tool_title;
    if (c_tool_description) tool.c_tool_description = c_tool_description;
    if (c_tool_status !== undefined) tool.c_tool_status = Number(c_tool_status);

    // if (req.files?.c_tool_img) {
    //   if (tool.c_tool_img && fs.existsSync(tool.c_tool_img)) {
    //     fs.unlinkSync(tool.c_tool_img);
    //   }

    //   tool.c_tool_img = req.files.c_tool_img[0].path;
    // }

    const oldPublicId = tool.c_tool_img_public_id;

if (req.files?.c_tool_img?.length) {

    uploaded = extractUploadedFile(req.files.c_tool_img[0]);

    tool.c_tool_img = uploaded.url;
    tool.c_tool_img_public_id = uploaded.public_id;
}

    const updated = await tool.save();

    if (oldPublicId) {
    await deleteFile(oldPublicId);
}

    res.json({
      status: true,
      message: "Tool updated successfully",
      data: updated,
    });
  } catch(err){

    if(uploaded?.public_id){
        await deleteFile(uploaded.public_id);
    }

    return res.status(500).json({
        status:false,
        message:err.message
    });
}
};

// DELETE TOOL
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

    // if (tool.c_tool_img && fs.existsSync(tool.c_tool_img)) {
    //   fs.unlinkSync(tool.c_tool_img);
    // }

    if (tool.c_tool_img_public_id) {
    await deleteFile(tool.c_tool_img_public_id);
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

// Mobile phone apis===============================================================================================================

const appGetCourseTools = async (req, res) => {
  try {
    const { course_id } = req.body;

    if (!course_id) {
      return res.status(400).json({
        response: "error",
        message: "course_id is required",
      });
    }

    const tools = await Tool.find({
      c_tool_course: course_id,
      c_tool_status: 1,
    }).sort({ createdAt: 1 });

    const data = tools.map((tool) => ({
      c_tool_id: tool._id,

      c_tool_course: tool.c_tool_course || "",

      c_tool_course_slug: tool.c_tool_course_slug || "",

      c_tool_title: tool.c_tool_title || "",

      c_tool_img: tool.c_tool_img || "",

      c_tool_description: tool.c_tool_description || "",

      c_tool_created_by: tool.c_tool_created_by || "0",

      c_tool_update_by: tool.c_tool_update_by || "0",

      c_tool_status: String(tool.c_tool_status || 0),

      c_tool_created: tool.createdAt
        ? tool.createdAt.toISOString().replace("T", " ").substring(0, 19)
        : "",

      c_tool_updated: tool.updatedAt
        ? tool.updatedAt.toISOString().replace("T", " ").substring(0, 19)
        : "",
    }));

    return res.status(200).json({
      response: "success",
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      response: "error",
      message: error.message,
    });
  }
};

module.exports = {
  addTool,
  getToolsByCourse,
  updateTool,
  deleteTool,
  appGetCourseTools,
};
