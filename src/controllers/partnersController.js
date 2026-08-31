const Partners = require("../models/partners_master");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const isValidObjectId = mongoose.isValidObjectId;



const deleteFile = (filePath) => {
  try {
    if (!filePath) return;

    const fullPath = path.resolve(filePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.log("File delete error:", error.message);
  }
};


const addPartner = async (req, res) => {
  let uploadedImage = null;

  try {
    const { partner_name, partner_url } = req.body;

    // ==========================================
    // VALIDATE NAME
    // ==========================================

    if (!partner_name || partner_name.trim() === "") {

      // image delete if validation fail
      if (req.files?.partner_image?.[0]) {
        deleteFile(req.files.partner_image[0].path);
      }

      return res.status(400).send({
        status: false,
        message: "Partner name is required",
      });
    }

    // ==========================================
    // IMAGE
    // ==========================================

    if (req.files?.partner_image?.[0]) {
      uploadedImage = req.files.partner_image[0].path;
    }

    // ==========================================
    // CREATE PARTNER
    // ==========================================

    const partner = await Partners.create({
      partner_name: partner_name.trim(),

      partner_url:
        partner_url && partner_url.trim() !== ""
          ? partner_url.trim()
          : "",

      partner_image: uploadedImage || "",
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(201).send({
      status: true,
      message: "Partner added successfully",
      data: partner,
    });

  } catch (error) {

    // ==========================================
    // DELETE IMAGE IF ERROR
    // ==========================================

    if (uploadedImage) {
      deleteFile(uploadedImage);
    }

    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};


const getAllPartners = async (req, res) => {
  try {
    let { page = 1, limit = 10, keyword = "" } = req.query;

    page = Number(page);
    limit = Number(limit);

    // ==========================================
    // SEARCH FILTER
    // ==========================================

    const filter = {};

    if (keyword && keyword.trim() !== "") {
      filter.partner_name = {
        $regex: keyword,
        $options: "i",
      };
    }

    // ==========================================
    // TOTAL COUNT
    // ==========================================

    const totalRecords = await Partners.countDocuments(filter);

    // ==========================================
    // GET DATA
    // ==========================================

    const data = await Partners.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit).select(`
        partner_name
        partner_url
        partner_image
        createdAt
      `);

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).send({
      status: true,

      pagination: {
        currentPage: page,
        perPage: limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      },

      data,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};


const getSinglePartner = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid partner id",
      });
    }

    // ==========================================
    // FIND PARTNER
    // ==========================================

    const partner = await Partners.findById(id);

    if (!partner) {
      return res.status(404).send({
        status: false,
        message: "Partner not found",
      });
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).send({
      status: true,
      data: partner,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};


const updatePartner = async (req, res) => {
  let newImage = null;

  try {
    const { id } = req.params;

    const { partner_name, partner_url } = req.body;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid partner id",
      });
    }

    // ==========================================
    // CHECK PARTNER
    // ==========================================

    const existingPartner = await Partners.findById(id);

    if (!existingPartner) {
      return res.status(404).send({
        status: false,
        message: "Partner not found",
      });
    }

    // ==========================================
    // IMAGE
    // ==========================================

    if (req.files?.partner_image?.[0]) {
      newImage = req.files.partner_image[0].path;
    }

    // ==========================================
    // UPDATE OBJECT
    // ==========================================

    const updateData = {};

    // name update only if value exists
    if (partner_name !== undefined && partner_name.trim() !== "") {
      updateData.partner_name = partner_name.trim();
    }

    // url update only if value exists
    if (partner_url !== undefined && partner_url.trim() !== "") {
      updateData.partner_url = partner_url.trim();
    }

    // image update
    if (newImage) {
      updateData.partner_image = newImage;
    }

    // ==========================================
    // UPDATE
    // ==========================================

    const updatedPartner = await Partners.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    // ==========================================
    // DELETE OLD IMAGE
    // ==========================================

    if (
      newImage &&
      existingPartner.partner_image &&
      fs.existsSync(existingPartner.partner_image)
    ) {
      fs.unlinkSync(existingPartner.partner_image);
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).send({
      status: true,
      message: "Partner updated successfully",
      data: updatedPartner,
    });
  } catch (error) {
    // ==========================================
    // DELETE NEW IMAGE IF ERROR
    // ==========================================

    if (newImage) {
      deleteFile(newImage);
    }

    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};


const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // VALIDATE ID
    // ==========================================

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid partner id",
      });
    }

    // ==========================================
    // FIND PARTNER
    // ==========================================

    const partner = await Partners.findById(id);

    if (!partner) {
      return res.status(404).send({
        status: false,
        message: "Partner not found",
      });
    }

    // ==========================================
    // DELETE IMAGE
    // ==========================================

    if (partner.partner_image && fs.existsSync(partner.partner_image)) {
      fs.unlinkSync(partner.partner_image);
    }

    // ==========================================
    // DELETE PARTNER
    // ==========================================

    await Partners.findByIdAndDelete(id);

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).send({
      status: true,
      message: "Partner deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addPartner,
  getAllPartners,
  getSinglePartner,
  updatePartner,
  deletePartner,
};
