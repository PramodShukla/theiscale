const express = require("express");
const router = express.Router();

const {
  addHiringForm,
  getAllHiringForms,
  getSingleHiringForm,
  deleteHiringForm,
} = require("../controllers/hiringFormController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.post("/add", addHiringForm);

router.get("/all",authMiddleware,adminMiddleware, getAllHiringForms);

router.get("/:id",authMiddleware,adminMiddleware, getSingleHiringForm);

router.delete("/:id",authMiddleware,adminMiddleware, deleteHiringForm);

module.exports = router;
