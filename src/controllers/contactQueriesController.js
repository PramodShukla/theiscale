const ContactQuery = require("../models/contact_us");

const addContactQuery = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        status: false,
        message: "Name is required",
      });
    }

    const contactQuery = await ContactQuery.create({
      name,
      phone,
      email,
      subject,
      message,
    });

    res.status(201).json({
      status: true,
      message: "Contact query submitted successfully",
      data: contactQuery,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const getAllContactQueries = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      fromDate,
      toDate,
      status,
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};

    // Search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    // Status Filter
    if (status) {
      filter.status = status;
    }

    // Date Filter
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

    const totalDocuments = await ContactQuery.countDocuments(filter);

    const contactQueries = await ContactQuery.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      status: true,
      totalDocuments,
      currentPage: page,
      totalPages: Math.ceil(totalDocuments / limit),
      data: contactQueries,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const getSingleContactQuery = async (req, res) => {
  try {
    const { id } = req.params;

    const contactQuery = await ContactQuery.findById(id);

    if (!contactQuery) {
      return res.status(404).json({
        status: false,
        message: "Contact query not found",
      });
    }

    res.status(200).json({
      status: true,
      data: contactQuery,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const updateContactQueryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["new", "viewed", "solved"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        status: false,
        message: "Invalid status value",
      });
    }

    const contactQuery = await ContactQuery.findById(id);

    if (!contactQuery) {
      return res.status(404).json({
        status: false,
        message: "Contact query not found",
      });
    }

    contactQuery.status = status;

    await contactQuery.save();

    res.status(200).json({
      status: true,
      message: "Status updated successfully",
      data: contactQuery,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const deleteContactQuery = async (req, res) => {
  try {
    const { id } = req.params;

    const contactQuery = await ContactQuery.findById(id);

    if (!contactQuery) {
      return res.status(404).json({
        status: false,
        message: "Contact query not found",
      });
    }

    await ContactQuery.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: "Contact query deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  addContactQuery,
  getAllContactQueries,
  getSingleContactQuery,
  updateContactQueryStatus,
  deleteContactQuery,
};
