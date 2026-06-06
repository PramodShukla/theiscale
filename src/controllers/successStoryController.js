const SuccessStory = require("../models/success_story");
const fs = require("fs");

const addSuccessStory = async (req, res) => {
  try {
    const { m_ss_name } = req.body;

    if (!m_ss_name) {
      if (req.files?.m_ss_image?.[0]?.path) {
        fs.unlink(req.files.m_ss_image[0].path, () => {});
      }

      return res.status(400).json({
        status: false,
        message: "Name is required",
      });
    }

    const data = await SuccessStory.create({
      m_ss_name,

      m_ss_designation: req.body.m_ss_designation || null,

      m_ss_image: req.files?.m_ss_image?.[0]?.path || null,

      m_ss_linkedin: req.body.m_ss_linkedin || null,

      m_ss_youtube_url: req.body.m_ss_youtube_url || null,

      m_ss_placed: req.body.m_ss_placed || "N/A",

      m_ss_package: req.body.m_ss_package || "N/A",

      m_ss_order: req.body.m_ss_order || 0,

      m_ss_feedback: req.body.m_ss_feedback || null,
    });

    res.json({
      status: true,
      message: "Success story added",
      data,
    });
  } catch (err) {
    if (req.files?.m_ss_image?.[0]?.path) {
      fs.unlink(req.files.m_ss_image[0].path, (unlinkErr) => {
        if (unlinkErr) {
          console.log("Image delete error:", unlinkErr.message);
        }
      });
    }

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const updateSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    // OLD IMAGE STORE
    let oldImage = story.m_ss_image;

    if ("m_ss_name" in req.body) {
      if (!req.body.m_ss_name.trim()) {
        if (req.files?.m_ss_image?.[0]?.path) {
          fs.unlink(req.files.m_ss_image[0].path, () => {});
        }

        return res.status(400).json({
          status: false,
          message: "Name cannot be empty",
        });
      }

      story.m_ss_name = req.body.m_ss_name;
    }

    if ("m_ss_designation" in req.body) {
      story.m_ss_designation = req.body.m_ss_designation;
    }

    if ("m_ss_linkedin" in req.body) {
      story.m_ss_linkedin = req.body.m_ss_linkedin;
    }

    if ("m_ss_youtube_url" in req.body) {
      story.m_ss_youtube_url = req.body.m_ss_youtube_url;
    }

    if ("m_ss_placed" in req.body) {
      story.m_ss_placed = req.body.m_ss_placed;
    }

    if ("m_ss_package" in req.body) {
      story.m_ss_package = req.body.m_ss_package;
    }

    if ("m_ss_feedback" in req.body) {
      story.m_ss_feedback = req.body.m_ss_feedback;
    }

    if ("m_ss_order" in req.body) {
      story.m_ss_order = req.body.m_ss_order || 0;
    }

    // =========================
    // IMAGE UPDATE
    // =========================

    if (req.files?.m_ss_image) {
      story.m_ss_image = req.files.m_ss_image[0].path;
    }

    // SAVE UPDATED DATA
    await story.save();

    if (req.files?.m_ss_image && oldImage && fs.existsSync(oldImage)) {
      fs.unlink(oldImage, (err) => {
        if (err) {
          console.log("Old image delete error:", err.message);
        }
      });
    }

    res.json({
      status: true,
      message: "Updated successfully",
      data: story,
    });
  } catch (err) {
    if (req.files?.m_ss_image?.[0]?.path) {
      fs.unlink(req.files.m_ss_image[0].path, (unlinkErr) => {
        if (unlinkErr) {
          console.log("Image delete error:", unlinkErr.message);
        }
      });
    }

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const getAllSuccessStories = async (req, res) => {
  try {
    let { page = 1, limit = 100, search } = req.query;

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

    if (story.m_ss_image && fs.existsSync(story.m_ss_image)) {
      fs.unlink(story.m_ss_image, (err) => {
        if (err) {
          console.log("Image delete error:", err.message);
        }
      });
    }

    res.json({
      status: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const changeSuccessStoryStatus = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    story.m_ss_status = story.m_ss_status === "active" ? "inactive" : "active";

    await story.save();

    res.json({
      status: true,
      message: "Status changed successfully",
      data: story,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const getSingleSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    res.json({
      status: true,
      data: story,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  addSuccessStory,
  updateSuccessStory,
  getAllSuccessStories,
  deleteSuccessStory,
  changeSuccessStoryStatus,
  getSingleSuccessStory
};
