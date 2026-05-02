const Client = require("../models/client");
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
const addClient = async (req, res) => {
  try {
    const { m_client_name } = req.body;

    if (!m_client_name) {
      return res.status(400).json({
        status: false,
        message: "Company name is required"
      });
    }

    const client = await Client.create({
      m_client_name,
      m_client_company: req.body.m_client_company,
      m_client_description: req.body.m_client_description,
      m_client_order: req.body.m_client_order,
      m_client_status: req.body.m_client_status || "active",

      m_client_logo: req.files?.m_client_logo?.[0]?.path,
    });

    res.json({
      status: true,
      message: "Client added",
      data: client
    });

  } catch (err) {
    deleteFiles(req.files);
    res.status(500).json({ status: false, message: err.message });
  }
};

// ================= GET ALL (pagination)
const getAllClients = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Client.countDocuments();

    const data = await Client.find()
      .sort({ m_client_order: 1, _id: -1 })
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

// ================= GET ONLY IMAGES
const getClientImages = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Client.countDocuments({
      m_client_logo: { $ne: null }
    });

    const data = await Client.find({
      m_client_logo: { $ne: null }
    })
      .select("m_client_logo")
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      status: true,
      pagination: {
        total,
        page,
        limit
      },
      data
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ================= UPDATE
const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        status: false,
        message: "Client not found"
      });
    }

    Object.keys(req.body).forEach(key => {
      client[key] = req.body[key];
    });

    // logo update
    if (req.files?.m_client_logo) {
      if (client.m_client_logo && fs.existsSync(client.m_client_logo)) {
        fs.unlinkSync(client.m_client_logo);
      }
      client.m_client_logo = req.files.m_client_logo[0].path;
    }

    await client.save();

    res.json({
      status: true,
      message: "Updated",
      data: client
    });

  } catch (err) {
    deleteFiles(req.files);
    res.status(500).json({ status: false, message: err.message });
  }
};

// ================= DELETE
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        status: false,
        message: "Client not found"
      });
    }

    if (client.m_client_logo && fs.existsSync(client.m_client_logo)) {
      fs.unlinkSync(client.m_client_logo);
    }

    await Client.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: "Deleted"
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  addClient,
  getAllClients,
  getClientImages,
  updateClient,
  deleteClient
};