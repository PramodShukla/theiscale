const jwt = require("jsonwebtoken");

exports.registerMiddleware = (
  req,
  res,
  next
) => {
  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "Token required",
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.registerUser = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      status: false,
      message:
        "Invalid or expired token",
    });

  }
};