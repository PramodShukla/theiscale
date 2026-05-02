const PPT = require("../models/pre_placement_company");
const fs = require("fs");

// helper
const deleteFiles = (files) => {
  if (!files) return;
  Object.values(files).forEach(arr => {
    arr.forEach(file => {
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
  });
};

// ================= ADD
const addPPT = async (req, res) => {
  try {
    const { m_pre_name, m_pre_designation, m_pre_company } = req.body;

    if (!m_pre_name || !m_pre_designation || !m_pre_company) {
      return res.status(400).json({
        status: false,
        message: "Name, designation & company are required"
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
      data
    });

  } catch (err) {
    deleteFiles(req.files);
    res.status(500).json({ status: false, message: err.message });
  }
};

// ================= GET ALL (FILTER + SEARCH)
const getAllPPT = async (req, res) => {
  try {
    let { search = "", status, page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {};

    if (search) {
      filter.$or = [
        { m_pre_name: { $regex: search, $options: "i" } },
        { m_pre_company: { $regex: search, $options: "i" } }
      ];
    }

    if (status !== undefined) {
      filter.m_pre_status = Number(status);
    }

    const total = await PPT.countDocuments(filter);

    const data = await PPT.find(filter)
      .sort({ m_pre_order: 1, _id: -1 })
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

// ================= UPDATE
const updatePPT = async (req, res) => {
  try {
    const ppt = await PPT.findById(req.params.id);

    if (!ppt) {
      return res.status(404).json({
        status: false,
        message: "Not found"
      });
    }

    Object.keys(req.body).forEach(key => {
      ppt[key] = req.body[key];
    });

    if (req.files?.m_pre_image) {
      if (ppt.m_pre_image && fs.existsSync(ppt.m_pre_image)) {
        fs.unlinkSync(ppt.m_pre_image);
      }
      ppt.m_pre_image = req.files.m_pre_image[0].path;
    }

    if (req.files?.m_pre_company_img) {
      if (ppt.m_pre_company_img && fs.existsSync(ppt.m_pre_company_img)) {
        fs.unlinkSync(ppt.m_pre_company_img);
      }
      ppt.m_pre_company_img = req.files.m_pre_company_img[0].path;
    }

    await ppt.save();

    res.json({
      status: true,
      message: "Updated",
      data: ppt
    });

  } catch (err) {
    deleteFiles(req.files);
    res.status(500).json({ status: false, message: err.message });
  }
};

// ================= DELETE
const deletePPT = async (req, res) => {
  try {
    const ppt = await PPT.findById(req.params.id);

    if (!ppt) {
      return res.status(404).json({
        status: false,
        message: "Not found"
      });
    }

    [ppt.m_pre_image, ppt.m_pre_company_img].forEach(file => {
      if (file && fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });

    await PPT.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: "Deleted"
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  addPPT,
  getAllPPT,
  updatePPT,
  deletePPT
};