const jwt = require("jsonwebtoken");

// ===============================
// GENERATE JWT TOKEN
// ===============================
const generateTokenAdmin = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      email: admin.kh_admin_email,
      contact: admin.kh_admin_phone,
      role: admin.kh_role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "60d" }
  );
};

const generateTokenUser = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.c_email,
      contact: user.c_contact,
      role: 2
    },
    process.env.JWT_SECRET,
    { expiresIn: "60d" }
  );
};

module.exports = { generateTokenAdmin, generateTokenUser };