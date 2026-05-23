const express = require("express");
const router = express.Router();

const {
  addOffer,
  getAllOffers,
  getSingleOffer,
  updateOffer,
  deleteOffer,
  toggleOfferStatus,
} = require("../controllers/offersController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { offerUpload } = require("../middlewares/uploadMiddleware");

router.post("/add", authMiddleware, adminMiddleware, offerUpload, addOffer);

router.get("/all", authMiddleware, adminMiddleware, getAllOffers);

router.get("/:id", authMiddleware, adminMiddleware, getSingleOffer);

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  offerUpload,
  updateOffer,
);

router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteOffer);

router.patch("/status/:id", authMiddleware, adminMiddleware, toggleOfferStatus);

module.exports = router;
