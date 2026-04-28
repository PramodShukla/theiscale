const Admin = require("../models/app_admin_tbl");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { generateTokenAdmin } = require("../utils/token");


//  ADMIN REGISTER (updated)
exports.registerAdmin = async (req, res) => {
  try {
    const { admin_name, password, email, phone, role } = req.body;

    // Validation
    if (!admin_name || !password || !email || !phone) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    // Check existing admin
    const existingAdmin = await Admin.findOne({
      kh_admin_email: email,
    });

    if (existingAdmin) {
      return res.status(400).send({
        status: false,
        message: "Admin already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate username automatically (optional but useful)
    const username = email.split("@")[0] + "_" + Date.now();

    // Create admin (mapping UI → schema)
    const admin = await Admin.create({
      kh_username: username,
      kh_admin_name: admin_name,
      kh_password: hashedPassword,
      kh_admin_email: email,
      kh_admin_phone: phone,
      kh_role: role || 1, // default admin
      kh_pic: "default.png", // dummy
    });

    res.status(201).send({
      status: true,
      message: "Admin registered successfully",
      data: admin,
    });

  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};




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