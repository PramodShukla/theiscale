const HiringForm = require("../models/hiring_form");

// Add hiring form
const addHiringForm = async (req, res) => {
  try {
    const {
      organization_type,
      organization_name,
      hr_email_1,
      hr_email_2,
      hr_contact_no,
      whatsapp_no,
      description,
    } = req.body;

    const hiringForm = await HiringForm.create({
      organization_type,
      organization_name,
      hr_email_1,
      hr_email_2,
      hr_contact_no,
      whatsapp_no,
      description,
    });

    res.status(201).json({
      status: true,
      message: "Hiring form submitted successfully",
      data: hiringForm,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// Get all hiring forms
const getAllHiringForms = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      organization_type,
      fromDate,
      toDate,
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};

    // Search filter
    if (search) {
      filter.$or = [
        { organization_name: { $regex: search, $options: "i" } },
        { hr_email_1: { $regex: search, $options: "i" } },
        { hr_email_2: { $regex: search, $options: "i" } },
        { hr_contact_no: { $regex: search, $options: "i" } },
        { whatsapp_no: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Organization type filter
    if (organization_type) {
      filter.organization_type = organization_type;
    }

    // Date filter
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

    const totalDocuments = await HiringForm.countDocuments(filter);

    const hiringForms = await HiringForm.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      status: true,
      totalDocuments,
      currentPage: page,
      totalPages: Math.ceil(totalDocuments / limit),
      data: hiringForms,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// Get single hiring form
const getSingleHiringForm = async (req, res) => {
  try {
    const { id } = req.params;

    const hiringForm = await HiringForm.findById(id);

    if (!hiringForm) {
      return res.status(404).json({
        status: false,
        message: "Hiring form not found",
      });
    }

    res.status(200).json({
      status: true,
      data: hiringForm,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// Delete hiring form
const deleteHiringForm = async (req, res) => {
  try {
    const { id } = req.params;

    const hiringForm = await HiringForm.findById(id);

    if (!hiringForm) {
      return res.status(404).json({
        status: false,
        message: "Hiring form not found",
      });
    }

    await HiringForm.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: "Hiring form deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  addHiringForm,
  getAllHiringForms,
  getSingleHiringForm,
  deleteHiringForm,
};
