const express = require("express");
const router = express.Router();

const {
  submitLeadForm,
  getLeadFormBySlug,
  getAllLeadData,
  getSingleLeadData,
  deleteLeadData,
} = require("../controllers/dataAnalyticsController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");


router.get("/all", authMiddleware, adminMiddleware, getAllLeadData);

router.get("/:slug", getLeadFormBySlug);

router.post("/:slug", submitLeadForm);

// router.get("/all", authMiddleware, adminMiddleware, getAllLeadData);

router.get("/details/:id", authMiddleware, adminMiddleware, getSingleLeadData);

router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteLeadData);

module.exports = router;
