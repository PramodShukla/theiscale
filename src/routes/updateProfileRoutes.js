const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");
const updateProfileController = require("../controllers/updateProfileController");

//  Get profile (prefill form)
router.get("/", authMiddleware,userMiddleware, updateProfileController.getProfile);

//  Update profile
router.put("/", authMiddleware, userMiddleware, updateProfileController.updateProfile);

// update password
router.put("/change-password", authMiddleware,userMiddleware, updateProfileController.changePassword);


// Mobile Apis=============================================================================================================================


router.put("/update_user",authMiddleware,userMiddleware,updateProfileController.appUpdateUserProfileApp);

module.exports = router;