const express = require("express");
const router = express.Router();

const authAdminController = require("../controllers/authAdminController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { adminUpload } = require("../middlewares/uploadMiddleware");

// Register Admin
router.post("/register", authAdminController.registerAdmin);

// Login Admin
router.post("/login", authAdminController.loginAdmin);

router.get("/all", authMiddleware, adminMiddleware, authAdminController.getAllAdmins);

router.get("/:id", authMiddleware, adminMiddleware, authAdminController.getSingleAdmin);

router.put("/update/:id", authMiddleware, adminMiddleware, adminUpload, authAdminController.updateAdmin);

router.delete("/delete/:id", authMiddleware, adminMiddleware, authAdminController.deleteAdmin);

router.post("/add", authMiddleware, adminMiddleware, adminUpload, authAdminController.addAdmin);

router.patch("/status/:id", authMiddleware, adminMiddleware, authAdminController.changeAdminStatus);

module.exports = router;
