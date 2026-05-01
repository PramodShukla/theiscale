exports.userMiddleware = (req, res, next) => {
  try {
    // authMiddleware already run hona chahiye
    if (!req.user) {
      return res.status(401).send({
        status: false,
        message: "Unauthorized",
      });
    }

    //  IMPORTANT CHECK
    if (req.user.role !== 2) {
      return res.status(403).send({
        status: false,
        message: "Access denied (User only)",
      });
    }

    next();

  } catch (e) {
    return res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};