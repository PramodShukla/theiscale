const Admin = require("../models/app_admin");
const fs = require("fs");
const bcrypt = require("bcrypt");

const getMyProfile = async (req, res) => {
  try {
    const adminId = req.user.id; // token se

    const admin = await Admin.findById(adminId).select(
      "kh_admin_name kh_admin_email kh_username kh_admin_phone kh_pic kh_password",
    );

    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      status: true,
      data: {
        name: admin.kh_admin_name,
        email: admin.kh_admin_email,
        login_id: admin.kh_username,
        contact_no: admin.kh_admin_phone,
        profile_pic: admin.kh_pic,

        // UI requirement
        password: "********",
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const adminId = req.user.id;

    const { name, email, login_id, contact_no } = req.body;

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

    // Email duplicate check
    if (email) {
      const existingEmail = await Admin.findOne({
        kh_admin_email: email,
        _id: { $ne: adminId },
      });

      if (existingEmail) {
        return res.status(400).json({
          status: false,
          message: "Email already exists",
        });
      }
    }

    // Username duplicate check
    if (login_id) {
      const existingUsername = await Admin.findOne({
        kh_username: login_id,
        _id: { $ne: adminId },
      });

      if (existingUsername) {
        return res.status(400).json({
          status: false,
          message: "Login ID already exists",
        });
      }
    }

    admin.kh_admin_name = name || admin.kh_admin_name;
    admin.kh_admin_email = email || admin.kh_admin_email;
    admin.kh_username = login_id || admin.kh_username;
    admin.kh_admin_phone = contact_no || admin.kh_admin_phone;

    await admin.save();

    res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      data: admin,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const changeMyPassword = async (req, res) => {
  try {
    const adminId = req.user.id;

    const { old_password, new_password } = req.body;

    if (!old_password || !new_password) {
      return res.status(400).json({
        status: false,
        message: "Old password and new password are required",
      });
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(old_password, admin.kh_password);

    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    admin.kh_password = hashedPassword;

    await admin.save();

    res.status(200).json({
      status: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const updateMyProfileImage = async (req, res) => {
  let uploadedImage = null;

  try {
    const adminId = req.user.id;

    const admin = await Admin.findById(adminId);

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

    if (!uploadedImage) {
      return res.status(400).json({
        status: false,
        message: "Profile image is required",
      });
    }

    const oldImage = admin.kh_pic;

    admin.kh_pic = uploadedImage;

    await admin.save();

    if (oldImage && oldImage !== "default.png" && fs.existsSync(oldImage)) {
      fs.unlinkSync(oldImage);
    }

    res.status(200).json({
      status: true,
      message: "Profile image updated successfully",
      image: uploadedImage,
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

module.exports = {
  getMyProfile,
  updateMyProfile,
  changeMyPassword,
  updateMyProfileImage
};
      