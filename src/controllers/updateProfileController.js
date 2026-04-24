const Candidate = require("../models/master_candidates_tbl");
const bcrypt = require("bcrypt");


//  GET PROFILE (prefill data)
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await Candidate.findById(userId).select("-c_password");

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    res.send({
      status: true,
      data: user,
    });

  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};



// UPDATE PROFILE (partial update)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // only sent fields will update
    const updateData = req.body;

    const updatedUser = await Candidate.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select("-c_password");

    if (!updatedUser) {
      return res.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    res.send({
      status: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });

  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};


// change password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const { currentPassword, newPassword, confirmPassword } = req.body;

    // validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).send({
        status: false,
        message: "New password and confirm password do not match",
      });
    }

    // user fetch
    const user = await Candidate.findById(userId);

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    // current password check
    const isMatch = await bcrypt.compare(currentPassword, user.c_password);

    if (!isMatch) {
      return res.status(400).send({
        status: false,
        message: "Current password is incorrect",
      });
    }

    // new password hash
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.c_password = hashedPassword;
    user.c_password_update = 1;

    await user.save();

    res.send({
      status: true,
      message: "Password updated successfully",
    });

  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};