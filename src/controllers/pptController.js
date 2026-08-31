const PPT = require("../models/pre_placement_company");
const fs = require("fs");

const deleteFiles = (files) => {
  if (!files) return;
  Object.values(files).forEach((arr) => {
    arr.forEach((file) => {
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
  });
};

const addPPT = async (req, res) => {
  try {
    const { m_pre_name, m_pre_designation, m_pre_company } = req.body;

    if (!m_pre_name || !m_pre_designation || !m_pre_company) {
      return res.status(400).json({
        status: false,
        message: "Name, designation & company are required",
      });
    }

    const data = await PPT.create({
      m_pre_name,
      m_pre_designation,
      m_pre_company,

      m_pre_video_link: req.body.m_pre_video_link,

      m_pre_image: req.files?.m_pre_image?.[0]?.path,
      m_pre_company_img: req.files?.m_pre_company_img?.[0]?.path,
    });

    res.json({
      status: true,
      message: "PPT added",
      data,
    });
  } catch (err) {
    deleteFiles(req.files);
    res.status(500).json({ status: false, message: err.message });
  }
};

const getAllPPT = async (req, res) => {
  try {
    let { search = "", status, page = 1, limit = 100 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {};

    // SEARCH FILTER
    if (search) {
      filter.$or = [
        {
          m_pre_name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          m_pre_company: {
            $regex: search,
            $options: "i",
          },
        },

        {
          m_pre_designation: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // STATUS FILTER
    if (status) {
      filter.m_pre_status = status;
    }

    const total = await PPT.countDocuments(filter);

    const data = await PPT.find(filter)

      .sort({
        m_pre_order: 1,
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

const updatePPT = async (req, res) => {
  try {
    const ppt = await PPT.findById(req.params.id);

    if (!ppt) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    let oldPreImage = ppt.m_pre_image;
    let oldCompanyImage = ppt.m_pre_company_img;

    if ("m_pre_name" in req.body) {
      ppt.m_pre_name = req.body.m_pre_name;
    }

    if ("m_pre_designation" in req.body) {
      ppt.m_pre_designation = req.body.m_pre_designation;
    }

    if ("m_pre_company" in req.body) {
      ppt.m_pre_company = req.body.m_pre_company;
    }

    if ("m_pre_video_link" in req.body) {
      ppt.m_pre_video_link = req.body.m_pre_video_link;
    }

    if ("m_pre_status" in req.body) {
      ppt.m_pre_status = req.body.m_pre_status;
    }

    if ("m_pre_order" in req.body) {
      ppt.m_pre_order = req.body.m_pre_order;
    }

    if (req.files?.m_pre_image) {
      ppt.m_pre_image = req.files.m_pre_image[0].path;
    }

    if (req.files?.m_pre_company_img) {
      ppt.m_pre_company_img = req.files.m_pre_company_img[0].path;
    }

    // SAVE
    await ppt.save();

    if (req.files?.m_pre_image && oldPreImage && fs.existsSync(oldPreImage)) {
      fs.unlink(oldPreImage, (err) => {
        if (err) {
          console.log("Old pre image delete error:", err.message);
        }
      });
    }

    if (
      req.files?.m_pre_company_img &&
      oldCompanyImage &&
      fs.existsSync(oldCompanyImage)
    ) {
      fs.unlink(oldCompanyImage, (err) => {
        if (err) {
          console.log("Old company image delete error:", err.message);
        }
      });
    }

    res.json({
      status: true,
      message: "Updated",
      data: ppt,
    });
  } catch (err) {
    deleteFiles(req.files);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const deletePPT = async (req, res) => {
  try {
    const ppt = await PPT.findById(req.params.id);

    if (!ppt) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    [ppt.m_pre_image, ppt.m_pre_company_img].forEach((file) => {
      if (file && fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });

    await PPT.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const changePPTStatus = async (req, res) => {
  try {
    const ppt = await PPT.findById(req.params.id);

    if (!ppt) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    ppt.m_pre_status = ppt.m_pre_status === "active" ? "inactive" : "active";

    await ppt.save();

    res.json({
      status: true,
      message: "Status changed successfully",
      data: ppt,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const getSinglePPT = async (req, res) => {
  try {
    const ppt = await PPT.findById(req.params.id);

    if (!ppt) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    res.json({
      status: true,
      data: ppt,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  addPPT,
  getAllPPT,
  updatePPT,
  deletePPT,
  changePPTStatus,
  getSinglePPT,
};
