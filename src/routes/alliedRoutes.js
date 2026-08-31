const express = require("express");
const router = express.Router();

const {
  addAllied,
  updateAllied,
  getAllAllied,
  deleteAllied,
  getSingleAllied,
  changeAlliedStatus
} = require("../controllers/alliedController");

const { alliedUpload } = require("../middlewares/uploadMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");

// add
router.post("/add-allied",authMiddleware,adminMiddleware, alliedUpload, addAllied);

// update
router.put("/update-allied/:id", authMiddleware, adminMiddleware, alliedUpload, updateAllied);

// get all
router.get("/all-allied",authMiddleware,adminMiddleware, getAllAllied);

router.get("/public-all-allied", getAllAllied);

router.get("/:id",authMiddleware,adminMiddleware, getSingleAllied);

router.patch("/:id",authMiddleware,adminMiddleware, changeAlliedStatus);

// delete
router.delete("/delete-allied/:id", authMiddleware, adminMiddleware, deleteAllied);



// router.get("/public-all-allied", getAllAllied);

module.exports = router;  