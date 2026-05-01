// const express = require("express");
// const router = express.Router();

// const controller = require("../controllers/userController");

// router.post("/signup", controller.createUser);

// module.exports = router;


const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");

// 🔥 Protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.send({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router; 