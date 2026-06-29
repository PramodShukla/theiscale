const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  resetPasswordMiddleware,
} = require("../middlewares/resetPasswordMiddleware");

const { registerMiddleware } = require("../middlewares/registrationMiddleware");

router.post("/login", authController.login);






// //login+register
// router.post("/send-otp", authController.sendOtp);

// router.post("/verify-otp", authController.verifyOtp);

// router.post("/register", registerMiddleware, authController.register);



router.post("/send-otp", authController.checkMobile);

router.post("/verify-otp", authController.verifyOtp);

router.post("/register", registerMiddleware, authController.register);

router.post("/create-password", authController.createPassword);





















// Forget Password
router.post("/send-forgot-password-otp", authController.sendForgotPasswordOtp);

router.post(
  "/verify-forgot-password-otp",
  authController.verifyForgotPasswordOtp,
);

router.post(
  "/reset-password",
  resetPasswordMiddleware,
  authController.resetPassword,
);

module.exports = router;
