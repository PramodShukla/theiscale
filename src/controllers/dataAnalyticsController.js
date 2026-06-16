const DataAnalytics = require("../models/data_analytics_tbl");
const LeadGenerate = require("../models/lead_generate");
const mongoose = require("mongoose");

const getLeadFormBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const form = await LeadGenerate.findOne({
      m_lg_slug: slug,
      m_lg_status: 1,
    });

    if (!form) {
      return res.status(404).json({
        status: false,
        message: "Form not found",
      });
    }

    return res.status(200).json({
      status: true,
      data: form,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const submitLeadForm = async (req, res) => {
  try {
    const { slug } = req.params;

    const lead = await LeadGenerate.findOne({
      m_lg_slug: slug,
      m_lg_status: 1,
    });

    if (!lead) {
      return res.status(404).json({
        status: false,
        message: "Lead form not found",
      });
    }

    const {
      data_name,
      data_mobile,
      data_whatsapp,
      data_email,

      data_gender,
      data_college_name,
      data_qualification,
      data_study_field,
      data_branch,
      data_passing_year,
      data_state,
      data_accessories,
      data_profession,
    } = req.body;

    // ==========================
    // BASIC REQUIRED VALIDATION
    // ==========================

    if (!data_name || !data_mobile || !data_whatsapp || !data_email) {
      return res.status(400).json({
        status: false,
        message: "Name, Mobile, Whatsapp and Email are required",
      });
    }

    // ==========================
    // DYNAMIC VALIDATION
    // ==========================

    if (lead.m_lg_college === 1 && !data_college_name) {
      return res.status(400).json({
        status: false,
        message: "College Name is required",
      });
    }

    if (lead.m_lg_education === 1 && !data_qualification) {
      return res.status(400).json({
        status: false,
        message: "Qualification is required",
      });
    }

    if (lead.m_lg_field_of_study === 1 && !data_study_field) {
      return res.status(400).json({
        status: false,
        message: "Field of Study is required",
      });
    }

    if (lead.m_lg_branch === 1 && !data_branch) {
      return res.status(400).json({
        status: false,
        message: "Branch is required",
      });
    }

    if (lead.m_lg_passing_year === 1 && !data_passing_year) {
      return res.status(400).json({
        status: false,
        message: "Passing Year is required",
      });
    }

    if (lead.m_lg_state === 1 && !data_state) {
      return res.status(400).json({
        status: false,
        message: "State is required",
      });
    }

    if (lead.m_lg_gender === 1 && !data_gender) {
      return res.status(400).json({
        status: false,
        message: "Gender is required",
      });
    }

    if (lead.m_lg_laptop_desktop === 1 && !data_accessories) {
      return res.status(400).json({
        status: false,
        message: "Laptop/Desktop field is required",
      });
    }

    if (lead.m_lg_working_professional === 1 && !data_profession) {
      return res.status(400).json({
        status: false,
        message: "Profession field is required",
      });
    }

    // ==========================
    // SAVE DATA
    // ==========================

    const savedData = await DataAnalytics.create({
      data_lead_id: lead._id,

      data_name,

      data_mobile,

      data_whatsapp,

      data_email,

      data_gender: data_gender || null,

      data_college_name: data_college_name || null,

      data_qualification: data_qualification || null,

      data_study_field: data_study_field || null,

      data_branch: data_branch || null,

      data_passing_year: data_passing_year || null,

      data_state: data_state || null,

      data_accessories: data_accessories || null,

      data_profession: data_profession || null,

      data_status: 1,
    });

    return res.status(201).json({
      status: true,
      message: "Form submitted successfully",

      redirect_url: lead.m_lg_redirect_link,

      data: savedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getAllLeadData = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 100,
      keyword = "",
      fromDate,
      toDate,
      lead_id,
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

    // ======================
    // SEARCH
    // ======================

    if (keyword) {
      filter.$or = [
        {
          data_name: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          data_email: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          data_mobile: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          data_whatsapp: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }

    // ======================
    // LEAD FILTER
    // ======================

    if (lead_id) {
      filter.data_lead_id = lead_id;
    }

    // ======================
    // DATE FILTER
    // ======================

    if (fromDate || toDate) {
      filter.createdAt = {};

      if (fromDate) {
        filter.createdAt.$gte = new Date(fromDate);
      }

      if (toDate) {
        const endDate = new Date(toDate);
        endDate.setHours(23, 59, 59, 999);

        filter.createdAt.$lte = endDate;
      }
    }

    const totalRecords = await DataAnalytics.countDocuments(filter);

    const data = await DataAnalytics.find(filter)

      // Lead Generate Populate
      .populate({
        path: "data_lead_id",
        select: `
          m_lg_title
          m_lg_slug
        `,
      })

      // State Populate
      .populate({
        path: "data_state",
        select: `
          state_name
        `,
      })

      .sort({
        createdAt: -1,
      })

      .skip((page - 1) * limit)

      .limit(limit);

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

const getSingleLeadData = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid ID",
      });
    }

    const data = await DataAnalytics.findById(id).populate({
      path: "data_lead_id",
      select: `
          m_lg_title
          m_lg_slug
          m_lg_redirect_link
        `,
    });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Lead data not found",
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

const deleteLeadData = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid ID",
      });
    }

    const deletedData = await DataAnalytics.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({
        status: false,
        message: "Lead data not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Lead data deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  submitLeadForm,
  getLeadFormBySlug,
  getAllLeadData,
  getSingleLeadData,
  deleteLeadData,
};
