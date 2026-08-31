const ApplicationSetting = require("../models/application_settings");
const fs = require("fs");
const mongoose = require("mongoose");
const { deleteFromCloudinary } = require("../utils/cloudinaryHelper");

const deleteFile = async (req) => {
  try {
    if (req.files?.setting_file?.length > 0) {
      const filePath = req.files.setting_file[0].path;
      await deleteFromCloudinary(filePath);
    }
  } catch (error) {
    console.log("File delete error:", error.message);
  }
};

// Add Setting
const addSetting = async (req, res) => {
  try {
    const { m_app_key, m_app_value } = req.body;

    if (!m_app_key) {
      deleteFile(req);

      return res.status(400).json({
        status: false,
        message: "Setting key is required",
      });
    }

    const exists = await ApplicationSetting.findOne({ m_app_key });

    if (exists) {
      deleteFile(req);

      return res.status(400).json({
        status: false,
        message: "Key already exists",
      });
    }

    let settingFile = "";

    if (req.files?.setting_file?.length > 0) {
      settingFile = req.files.setting_file[0].path;
    }

    const setting = await ApplicationSetting.create({
      m_app_key,
      m_app_value: m_app_value || "",
      setting_file: settingFile,
    });

    return res.status(201).json({
      status: true,
      message: "Setting added successfully",
      data: setting,
    });
  } catch (error) {
    deleteFile(req);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Update Setting
const updateSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const { m_app_key, m_app_value } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      deleteFile(req);

      return res.status(400).json({
        status: false,
        message: "Invalid setting id",
      });
    }

    const setting = await ApplicationSetting.findById(id);

    if (!setting) {
      deleteFile(req);

      return res.status(404).json({
        status: false,
        message: "Setting not found",
      });
    }

    if (m_app_key && m_app_key !== setting.m_app_key) {
      const duplicateKey = await ApplicationSetting.findOne({
        m_app_key,
        _id: { $ne: id },
      });

      if (duplicateKey) {
        deleteFile(req);

        return res.status(400).json({
          status: false,
          message: "Key already exists",
        });
      }
    }

    // New image uploaded
    if (req.files?.setting_file?.length > 0) {
      if (setting.setting_file) {
        if (setting.setting_file.startsWith("http")) {
          await deleteFromCloudinary(setting.setting_file);
        } else if (fs.existsSync(`src/uploads/settings/${setting.setting_file}`)) {
          fs.unlinkSync(`src/uploads/settings/${setting.setting_file}`);
        }
      }

      setting.setting_file = req.files.setting_file[0].path;
    } else if (m_app_value !== undefined) {
      setting.m_app_value = m_app_value;
    }

    if (m_app_key) {
      setting.m_app_key = m_app_key;
    }

    await setting.save();

    return res.status(200).json({
      status: true,
      message: "Setting updated successfully",
      data: setting,
    });
  } catch (error) {
    deleteFile(req);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getAllSettings = async (req, res) => {
  try {
    const settings = await ApplicationSetting.find();

    const data = settings.map((item) => ({
      ...item.toObject(),
      setting_file: item.setting_file
        ? (item.setting_file.startsWith("http") ? item.setting_file : `${req.protocol}://${req.get("host")}/uploads/settings/${item.setting_file}`)
        : null,
    }));

    res.status(200).json({
      status: true,
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getGeneralSettings = async (req, res) => {
  try {
    const settings = await ApplicationSetting.find({
      m_app_key: {
        $in: [
          "Date Format",
          "Time Format",
          "Time Zone",
          "Application Name",
          "Address",
          "Email",
          "Mobile",
          "Alternate Mobile",
        ],
      },
    });

    res.status(200).json({
      status: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getSocialMediaSettings = async (req, res) => {
  try {
    const settings = await ApplicationSetting.find({
      m_app_key: {
        $in: [
          "Facebook Url",
          "Instagram Url",
          "Linkeding Url",
          "Twitter Url",
          "Youtube Url",
          "Whats App",
          "Telegram",
          "Website Url",
          "Playstore Url",
          "Appstore Url",
        ],
      },
    });

    res.status(200).json({
      status: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getSeoSettings = async (req, res) => {
  try {
    const settings = await ApplicationSetting.find({
      m_app_key: {
        $in: [
          "Application Title",
          "Application Keywords",
          "Description",
          "Author",
          "Google Recaptcha",
          "Recaptcha Key",
          "Recaptcha Key Secret",
          "Google Analytics Code",
        ],
      },
    });

    res.status(200).json({
      status: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getEmailSettings = async (req, res) => {
  try {
    const settings = await ApplicationSetting.find({
      m_app_key: {
        $in: [
          "SMTP Host",
          "SMTP Username",
          "SMTP Password",
          "SMTP Port",
          "Mail Encryption",
          "Mail From Name",
        ],
      },
    });

    res.status(200).json({
      status: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getSmsSettings = async (req, res) => {
  try {
    const settings = await ApplicationSetting.find({
      m_app_key: {
        $in: [
          "Msg 91 API Url",
          "Msg 91 API Key",
          "Msg 91 Sender ID",
          "Msg 91 Templete ID",
          "Msg 91 Message",
          "Msg 91 Title",
        ],
      },
    });

    res.status(200).json({
      status: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getPaymentSettings = async (req, res) => {
  try {
    const settings = await ApplicationSetting.find({
      m_app_key: {
        $in: [
          "Online Payment",
          "Razorpay Test Key",
          "Razorpay Test Secret",
          "Razorpay Live Key",
          "Razorpay Live Secret",
          "Gateway Status",
        ],
      },
    });

    res.status(200).json({
      status: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getLiveClassSettings = async (req, res) => {
  try {
    const settings = await ApplicationSetting.find({
      m_app_key: {
        $in: ["Api Key", "Api Secret", "Email Address"],
      },
    });

    res.status(200).json({
      status: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getVisualSettings = async (req, res) => {
  try {
    const settings = await ApplicationSetting.find({
      m_app_key: {
        $in: [
          "App Icon",
          "App Logo",
          "Footer Logo",
          "Mobile Logo",
          "Admin Login Image",
          "Home Screen Image",
          "Default Image",
        ],
      },
    });

    res.status(200).json({
      status: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addSetting,
  updateSetting,
  getAllSettings,
  getGeneralSettings,
  getSocialMediaSettings,
  getSeoSettings,
  getEmailSettings,
  getSmsSettings,
  getPaymentSettings,
  getLiveClassSettings,
  getVisualSettings,
};
