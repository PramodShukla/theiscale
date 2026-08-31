const express = require("express");
const router = express.Router();

const {
  addContactQuery,
  getAllContactQueries,
  getSingleContactQuery,
  updateContactQueryStatus,
  deleteContactQuery,
} = require("../controllers/contactQueriesController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.post("/add", addContactQuery);

router.get("/all", authMiddleware, adminMiddleware, getAllContactQueries);

router.get("/:id", authMiddleware, adminMiddleware, getSingleContactQuery);

router.patch(
  "/status/:id",
  authMiddleware,
  adminMiddleware,
  updateContactQueryStatus,
);

router.delete("/:id", authMiddleware, adminMiddleware, deleteContactQuery);

module.exports = router;
