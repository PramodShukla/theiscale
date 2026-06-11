const Admin = require("../models/app_admin");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { generateTokenAdmin } = require("../utils/token");
const fs = require("fs");

//  ADMIN REGISTER (updated)
// exports.registerAdmin = async (req, res) => {
//   try {
//     const { admin_name, password, email, phone, role } = req.body;

//     // Validation
//     if (!admin_name || !password || !email || !phone) {
//       return res.status(400).send({
//         status: false,
//         message: "All fields are required",
//       });
//     }

//     // Check existing admin
//     const existingAdmin = await Admin.findOne({
//       kh_admin_email: email,
//     });

//     if (existingAdmin) {
//       return res.status(400).send({
//         status: false,
//         message: "Admin already exists with this email",
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Generate username automatically (optional but useful)
//     const username = email.split("@")[0] + "_" + Date.now();

//     // Create admin (mapping UI → schema)
//     const admin = await Admin.create({
//       kh_username: username,
//       kh_admin_name: admin_name,
//       kh_password: hashedPassword,
//       kh_admin_email: email,
//       kh_admin_phone: phone,
//       kh_role: role || 1, // default admin
//       kh_pic: "default.png", // dummy
//     });

//     res.status(201).send({
//       status: true,
//       message: "Admin registered successfully",
//       data: admin,
//     });
//   } catch (e) {
//     res.status(500).send({
//       status: false,
//       message: e.message,
//     });
//   }
// };
// ADMIN LOGIN
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Check admin
    const admin = await Admin.findOne({ kh_admin_email: email });

    if (!admin) {
      return res.status(400).send({
        status: false,
        message: "Admin not found",
      });
    }

    //  Compare password
    const isMatch = await bcrypt.compare(password, admin.kh_password);

    if (!isMatch) {
      return res.status(400).send({
        status: false,
        message: "Invalid password",
      });
    }

    //  Generate token for admin
    const token = generateTokenAdmin(admin);

    res.send({
      status: true,
      message: "Admin login successful",
      token,
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {};

    if (search) {
      filter.$or = [
        {
          kh_username: {
            $regex: search,
            $options: "i",
          },
        },
        {
          kh_admin_name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          kh_admin_email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const total = await Admin.countDocuments(filter);

    const admins = await Admin.find(filter)
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const finalData = admins.map((admin) => ({
      _id: admin._id,

      user_name: admin.kh_username,

      login_id: admin.kh_username,

      admin_name: admin.kh_admin_name,

      contact_no: admin.kh_admin_phone,

      email: admin.kh_admin_email,

      profile_pic: admin.kh_pic,

      added_on: admin.kh_added_on,

      status: admin.kh_status === 1 ? "active" : "inactive",
    }));

    res.status(200).json({
      status: true,

      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },

      data: finalData,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.getSingleAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      status: true,
      data: {
        _id: admin._id,

        user_name: admin.kh_username,

        admin_name: admin.kh_admin_name,

        email: admin.kh_admin_email,

        phone: admin.kh_admin_phone,

        profile_pic: admin.kh_pic,

        status: admin.kh_status === 1 ? "active" : "inactive",

        added_on: admin.kh_added_on,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.updateAdmin = async (req, res) => {
  let uploadedImage = null;

  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin) {
      if (req.files?.kh_pic?.[0]) {
        fs.unlinkSync(req.files.kh_pic[0].path);
      }

      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

    uploadedImage = req.files?.kh_pic?.[0]?.path;

    if (req.body.admin_name && req.body.admin_name.trim()) {
      admin.kh_admin_name = req.body.admin_name;
    }

    if (req.body.email && req.body.email.trim()) {
      admin.kh_admin_email = req.body.email;
    }

    if (req.body.phone && req.body.phone.trim()) {
      admin.kh_admin_phone = req.body.phone;
    }

    if (req.body.username && req.body.username.trim()) {
      admin.kh_username = req.body.username;
    }

    if (req.body.status && req.body.status.trim()) {
      admin.kh_status = req.body.status;
    }

    if (req.body.password && req.body.password.trim()) {
      admin.kh_password = await bcrypt.hash(req.body.password, 10);
    }

    if (uploadedImage) {
      const oldImage = admin.kh_pic;

      admin.kh_pic = uploadedImage;

      await admin.save();

      if (oldImage && oldImage !== "default.png" && fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }

      return res.status(200).json({
        status: true,
        message: "Admin updated successfully",
        data: admin,
      });
    }

    await admin.save();

    res.status(200).json({
      status: true,
      message: "Admin updated successfully",
      data: admin,
    });
  } catch (err) {
    if (uploadedImage && fs.existsSync(uploadedImage)) {
      fs.unlinkSync(uploadedImage);
    }

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

    // Delete profile image
    if (
      admin.kh_pic &&
      admin.kh_pic !== "default.png" &&
      fs.existsSync(admin.kh_pic)
    ) {
      fs.unlinkSync(admin.kh_pic);
    }

    await Admin.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: "Admin deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.addAdmin = async (req, res) => {
  let uploadedImage = null;

  try {
    const { admin_name, username, email, phone, password, status, role } =
      req.body;

    uploadedImage = req.files?.kh_pic?.[0]?.path || null;

    // Validation
    if (!admin_name || !username || !email || !phone || !password) {
      if (uploadedImage && fs.existsSync(uploadedImage)) {
        fs.unlinkSync(uploadedImage);
      }

      return res.status(400).json({
        status: false,
        message: "All required fields are mandatory",
      });
    }

    // Check username
    const existingUsername = await Admin.findOne({
      kh_username: username,
    });

    if (existingUsername) {
      if (uploadedImage && fs.existsSync(uploadedImage)) {
        fs.unlinkSync(uploadedImage);
      }

      return res.status(400).json({
        status: false,
        message: "Username already exists",
      });
    }

    // Check email
    const existingEmail = await Admin.findOne({
      kh_admin_email: email,
    });

    if (existingEmail) {
      if (uploadedImage && fs.existsSync(uploadedImage)) {
        fs.unlinkSync(uploadedImage);
      }

      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      kh_username: username,
      kh_admin_name: admin_name,
      kh_admin_email: email,
      kh_admin_phone: phone,
      kh_password: hashedPassword,
      kh_role: role || 1,
      kh_status: status || 1,
      kh_pic: uploadedImage || "default.png",
    });

    res.status(201).json({
      status: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (err) {
    if (uploadedImage && fs.existsSync(uploadedImage)) {
      fs.unlinkSync(uploadedImage);
    }

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.changeAdminStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

    admin.kh_status = admin.kh_status === "active" ? "inactive" : "active";

    await admin.save();

    res.status(200).json({
      status: true,
      message: `Admin ${
        admin.kh_status === "active" ? "activated" : "deactivated"
      } successfully`,
      data: {
        _id: admin._id,
        kh_status: admin.kh_status,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
