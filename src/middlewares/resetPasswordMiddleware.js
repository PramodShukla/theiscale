const jwt = require("jsonwebtoken");

exports.resetPasswordMiddleware =
  (req, res, next) => {
    try {

      const authHeader =
        req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          status: false,
          message: "Reset token required",
        });
      }

      if (
        !authHeader.startsWith("Bearer ")
      ) {
        return res.status(401).json({
          status: false,
          message: "Invalid token format",
        });
      }

      const token =
        authHeader.split(" ")[1];

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      if (
        decoded.type !==
        "password_reset"
      ) {
        return res.status(401).json({
          status: false,
          message: "Invalid reset token",
        });
      }

      req.resetUser = decoded;

      next();

    } catch (error) {

      if (
        error.name ===
        "TokenExpiredError"
      ) {
        return res.status(401).json({
          status: false,
          message: "Reset token expired",
        });
      }

      return res.status(401).json({
        status: false,
        message: "Invalid reset token",
      });
    }
  };