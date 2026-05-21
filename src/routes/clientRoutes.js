const express = require("express");
const router = express.Router();

const {
  addClient,
  getAllClients,
  getClientImages,
  updateClient,
  deleteClient
} = require("../controllers/clientController");

const { clientUpload } = require("../middlewares/uploadMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.post("/add-client",authMiddleware,adminMiddleware, clientUpload, addClient);

router.get("/get-all-client",authMiddleware,adminMiddleware, getAllClients);

router.put("/update-client/:id", authMiddleware, adminMiddleware, clientUpload, updateClient);

router.delete("/delete-client/:id", authMiddleware, adminMiddleware, deleteClient);




router.get("/public-get-all-client", getAllClients);

router.get("/public-get-client-images", getClientImages);



module.exports = router;