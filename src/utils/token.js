const jwt = require("jsonwebtoken");

// ===============================
// GENERATE JWT TOKEN
// ===============================
const generateTokenAdmin = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      email: admin.kh_admin_email,
      role: admin.kh_role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const generateTokenUser = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.c_email,
      role: "candidate"
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

module.exports = { generateTokenAdmin, generateTokenUser };