const express = require("express");
const router = express.Router();
const { addFAQ, getFAQsByCourse,updateFAQ, deleteFAQ } = require("../controllers/faqController");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/add-faq",authMiddleware,adminMiddleware, addFAQ);
router.get("/get-faqs",authMiddleware,adminMiddleware, getFAQsByCourse);
router.put("/update-faq/:id", authMiddleware, adminMiddleware, updateFAQ);
router.delete("/delete-faq/:id", authMiddleware, adminMiddleware, deleteFAQ);


module.exports = router;