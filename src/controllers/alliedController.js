const Allied = require("../models/allied");
const fs = require("fs");
const { deleteFromCloudinary } = require("../utils/cloudinaryHelper");

const deleteUploadedFiles = async (files) => {
  if (!files) return;

  for (const fileArray of Object.values(files)) {
    for (const file of fileArray) {
      if (file.path) {
        await deleteFromCloudinary(file.path);
      }
    }
  }
};

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

    if ("m_allied_title" in req.body) {
      if (!req.body.m_allied_title.trim()) {
        deleteUploadedFiles(req.files);

        return res.status(400).json({
          status: false,
          message: "Title cannot be empty",
        });
      }

      item.m_allied_title = req.body.m_allied_title;
    }

    if ("m_allied_inr" in req.body) {
      item.m_allied_inr = req.body.m_allied_inr;
    }

    if ("m_allied_order" in req.body) {
      item.m_allied_order = req.body.m_allied_order || 0;
    }

    if ("m_allied_status" in req.body) {
      item.m_allied_status = req.body.m_allied_status;
    }

    if (req.files?.m_allied_image) {
      const oldImage = item.m_allied_image;

      item.m_allied_image = req.files.m_allied_image[0].path;

      await item.save();

      if (oldImage) {
        await deleteFromCloudinary(oldImage);
      }
    } else {
      await item.save();
    }

    res.json({
      status: true,
      message: "Updated successfully",
      data: item,
    });
  } catch (err) {
    deleteUploadedFiles(req.files);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const getAllAllied = async (req, res) => {
  try {
    let { page = 1, limit = 100, search = "", status } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {};

    if (search) {
      filter.$or = [
        {
          m_allied_title: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      filter.m_allied_status = status;
    }

    const total = await Allied.countDocuments(filter);

    const data = await Allied.find(filter)
      .sort({
        m_allied_order: 1,
        _id: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      status: true,

      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },

      data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const deleteAllied = async (req, res) => {
  try {
    const item = await Allied.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    if (item.m_allied_image) {
      await deleteFromCloudinary(item.m_allied_image);
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

const getSingleAllied = async (req, res) => {
  try {
    const item = await Allied.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    res.json({
      status: true,
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const changeAlliedStatus = async (req, res) => {
  try {
    const item = await Allied.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    item.m_allied_status =
      item.m_allied_status === "active" ? "inactive" : "active";

    await item.save();

    res.json({
      status: true,
      message: "Status changed successfully",
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  addAllied,
  updateAllied,
  getAllAllied,
  deleteAllied,
  getSingleAllied,
  changeAlliedStatus
};
