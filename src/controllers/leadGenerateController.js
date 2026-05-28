const LeadGenerate = require("../models/lead_generate");
const slugify = require("slugify");
const mongoose = require("mongoose");

const addLeadGenerate = async (req, res) => {
  try {
    const {
      m_lg_title,
      m_lg_desc,
      m_lg_redirect_link,

      m_lg_college,
      m_lg_education,
      m_lg_field_of_study,
      m_lg_branch,
      m_lg_passing_year,
      m_lg_state,
      m_lg_gender,
      m_lg_laptop_desktop,
      m_lg_working_professional,

      m_lg_status,
    } = req.body;

    if (!m_lg_title) {
      return res.status(400).json({
        status: false,
        message: "Title is required",
      });
    }

    const slug = slugify(m_lg_title, {
      lower: true,
      strict: true,
    });

    const leadGenerate = new LeadGenerate({
      m_lg_title,

      m_lg_slug: slug,

      m_lg_desc: m_lg_desc || null,

      m_lg_redirect_link: m_lg_redirect_link || null,

      m_lg_college: m_lg_college === "true" || m_lg_college === true,

      m_lg_education: m_lg_education === "true" || m_lg_education === true,

      m_lg_field_of_study:
        m_lg_field_of_study === "true" || m_lg_field_of_study === true,

      m_lg_branch: m_lg_branch === "true" || m_lg_branch === true,

      m_lg_passing_year:
        m_lg_passing_year === "true" || m_lg_passing_year === true,

      m_lg_state: m_lg_state === "true" || m_lg_state === true,

      m_lg_gender: m_lg_gender === "true" || m_lg_gender === true,

      m_lg_laptop_desktop:
        m_lg_laptop_desktop === "true" || m_lg_laptop_desktop === true,

      m_lg_working_professional:
        m_lg_working_professional === "true" ||
        m_lg_working_professional === true,

      m_lg_status: m_lg_status || "active",
    });

    const savedData = await leadGenerate.save();

    return res.status(201).json({
      status: true,
      message: "Lead generate added successfully",
      data: savedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getAllLeadGenerate = async (req, res) => {
  try {
    let { page = 1, limit = 10, keyword = "" } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

    if (keyword) {
      filter.$or = [
        {
          m_lg_title: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          m_lg_desc: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          m_lg_redirect_link: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          m_lg_status: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }

    const totalRecords = await LeadGenerate.countDocuments(filter);

    const data = await LeadGenerate.find(filter)

      .sort({ createdAt: -1 })

      .skip((page - 1) * limit)

      .limit(limit).select(`
        m_lg_title
        m_lg_desc
        m_lg_redirect_link
        m_lg_status
        createdAt
      `);

    return res.status(200).json({
      status: true,

      pagination: {
        currentPage: page,
        perPage: limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      },

      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getSingleLeadGenerate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid ID",
      });
    }

    const data = await LeadGenerate.findById(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Lead generate not found",
      });
    }

    return res.status(200).json({
      status: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateLeadGenerate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid ID",
      });
    }

    const existingData = await LeadGenerate.findById(id);

    if (!existingData) {
      return res.status(404).json({
        status: false,
        message: "Lead generate not found",
      });
    }

    const {
      m_lg_title,
      m_lg_desc,
      m_lg_redirect_link,

      m_lg_college,
      m_lg_education,
      m_lg_field_of_study,
      m_lg_branch,
      m_lg_passing_year,
      m_lg_state,
      m_lg_gender,
      m_lg_laptop_desktop,
      m_lg_working_professional,

      m_lg_status,
    } = req.body;

    if (m_lg_title) {
      existingData.m_lg_title = m_lg_title;

      existingData.m_lg_slug = slugify(m_lg_title, {
        lower: true,
        strict: true,
      });
    }

    if (m_lg_desc !== undefined) {
      existingData.m_lg_desc = m_lg_desc || existingData.m_lg_desc;
    }

    if (m_lg_redirect_link !== undefined) {
      existingData.m_lg_redirect_link =
        m_lg_redirect_link || existingData.m_lg_redirect_link;
    }

    if (m_lg_college !== undefined) {
      existingData.m_lg_college =
        m_lg_college === "true" || m_lg_college === true;
    }

    if (m_lg_education !== undefined) {
      existingData.m_lg_education =
        m_lg_education === "true" || m_lg_education === true;
    }

    if (m_lg_field_of_study !== undefined) {
      existingData.m_lg_field_of_study =
        m_lg_field_of_study === "true" || m_lg_field_of_study === true;
    }

    if (m_lg_branch !== undefined) {
      existingData.m_lg_branch = m_lg_branch === "true" || m_lg_branch === true;
    }

    if (m_lg_passing_year !== undefined) {
      existingData.m_lg_passing_year =
        m_lg_passing_year === "true" || m_lg_passing_year === true;
    }

    if (m_lg_state !== undefined) {
      existingData.m_lg_state = m_lg_state === "true" || m_lg_state === true;
    }

    if (m_lg_gender !== undefined) {
      existingData.m_lg_gender = m_lg_gender === "true" || m_lg_gender === true;
    }

    if (m_lg_laptop_desktop !== undefined) {
      existingData.m_lg_laptop_desktop =
        m_lg_laptop_desktop === "true" || m_lg_laptop_desktop === true;
    }

    if (m_lg_working_professional !== undefined) {
      existingData.m_lg_working_professional =
        m_lg_working_professional === "true" ||
        m_lg_working_professional === true;
    }

    if (m_lg_status) {
      existingData.m_lg_status = m_lg_status;
    }

    const updatedData = await existingData.save();

    return res.status(200).json({
      status: true,
      message: "Lead generate updated successfully",
      data: updatedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const changeLeadGenerateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid ID",
      });
    }

    const leadGenerate = await LeadGenerate.findById(id);

    if (!leadGenerate) {
      return res.status(404).json({
        status: false,
        message: "Lead generate not found",
      });
    }

    leadGenerate.m_lg_status =
      leadGenerate.m_lg_status === "active" ? "inactive" : "active";

    await leadGenerate.save();

    return res.status(200).json({
      status: true,
      message: "Status changed successfully",
      data: leadGenerate.m_lg_title,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteLeadGenerate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid ID",
      });
    }

    const deletedData = await LeadGenerate.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({
        status: false,
        message: "Lead generate not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Lead generate deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addLeadGenerate,
  getAllLeadGenerate,
  getSingleLeadGenerate,
  updateLeadGenerate,
  changeLeadGenerateStatus,
  deleteLeadGenerate,
};
