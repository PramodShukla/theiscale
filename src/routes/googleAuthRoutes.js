const express = require("express");
const router = express.Router();

const googleAuthController = require("../controllers/googleAuthController");

router.get("/google", googleAuthController.googleLogin);
router.get("/google/callback", googleAuthController.googleCallback);

module.exports = router;
