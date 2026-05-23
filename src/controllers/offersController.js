const mongoose = require("mongoose");
const fs = require("fs");
const Offer = require("../models/offers");




const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const isValidValue = (value) => {
  return value !== undefined && value !== null && value !== "";
};



const deleteFile = (path) => {
  if (path && fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};



const addOffer = async (req, res) => {
  let uploadedImage = null;

  try {
    const {
      m_offer_title,
      m_offer_des,
      m_offer_url,
      m_offer_priority,
      m_offer_started,
    } = req.body;

    // =====================================
    // VALIDATE TITLE
    // =====================================

    if (!isValidValue(m_offer_title)) {
      if (req.files?.m_offer_image?.[0]) {
        deleteFile(req.files.m_offer_image[0].path);
      }

      return res.status(400).send({
        status: false,
        message: "Offer title is required",
      });
    }

    // =====================================
    // IMAGE
    // =====================================

    if (req.files?.m_offer_image?.[0]) {
      uploadedImage = req.files.m_offer_image[0].path;
    }

    // =====================================
    // CREATE
    // =====================================

    const offer = await Offer.create({
      m_offer_title: m_offer_title.trim(),

      m_offer_image: uploadedImage,

      m_offer_des: isValidValue(m_offer_des) ? m_offer_des.trim() : null,

      m_offer_url: isValidValue(m_offer_url) ? m_offer_url.trim() : null,

      m_offer_priority: isValidValue(m_offer_priority)
        ? Number(m_offer_priority)
        : 0,

      m_offer_started: isValidValue(m_offer_started) ? m_offer_started : null,

      m_offer_status: 1,
    });

    return res.status(201).send({
      status: true,

      message: "Offer added successfully",

      data: offer,
    });
  } catch (error) {
    // =====================================
    // DELETE IMAGE IF ERROR
    // =====================================

    if (uploadedImage) {
      deleteFile(uploadedImage);
    }

    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};



const getAllOffers = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;

    page = Number(page);

    limit = Number(limit);

    const filter = {};

    // =====================================
    // SEARCH
    // =====================================

    if (isValidValue(search)) {
      filter.m_offer_title = {
        $regex: search,
        $options: "i",
      };
    }

    // =====================================
    // TOTAL COUNT
    // =====================================

    const totalCount = await Offer.countDocuments(filter);

    // =====================================
    // DATA
    // =====================================

    const data = await Offer.find(filter)
      .select(
        `
        m_offer_title
        m_offer_priority
        m_offer_image
        m_offer_des
        m_offer_url
        m_offer_status
      `,
      )
      .sort({
        m_offer_priority: 1,
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).send({
      status: true,

      pagination: {
        currentPage: page,

        totalPages: Math.ceil(totalCount / limit),

        totalRecords: totalCount,

        perPage: limit,
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



const getSingleOffer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,

        message: "Invalid offer id",
      });
    }

    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).send({
        status: false,

        message: "Offer not found",
      });
    }

    return res.status(200).send({
      status: true,

      data: offer,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,

      message: error.message,
    });
  }
};



const updateOffer = async (req, res) => {
  let newImage = null;

  try {
    const { id } = req.params;

    const {
      m_offer_title,
      m_offer_des,
      m_offer_url,
      m_offer_priority,
      m_offer_started,
    } = req.body;

    // =====================================
    // VALIDATE ID
    // =====================================

    if (!isValidObjectId(id)) {
      if (req.files?.m_offer_image?.[0]) {
        deleteFile(req.files.m_offer_image[0].path);
      }

      return res.status(400).send({
        status: false,

        message: "Invalid offer id",
      });
    }

    // =====================================
    // FIND OFFER
    // =====================================

    const offer = await Offer.findById(id);

    if (!offer) {
      if (req.files?.m_offer_image?.[0]) {
        deleteFile(req.files.m_offer_image[0].path);
      }

      return res.status(404).send({
        status: false,

        message: "Offer not found",
      });
    }

    // =====================================
    // OLD IMAGE
    // =====================================

    const oldImage = offer.m_offer_image;

    // =====================================
    // UPDATE FIELDS
    // =====================================

    if (isValidValue(m_offer_title)) {
      offer.m_offer_title = m_offer_title.trim();
    }

    if (isValidValue(m_offer_des)) {
      offer.m_offer_des = m_offer_des.trim();
    }

    if (isValidValue(m_offer_url)) {
      offer.m_offer_url = m_offer_url.trim();
    }

    if (isValidValue(m_offer_priority)) {
      offer.m_offer_priority = Number(m_offer_priority);
    }

    if (isValidValue(m_offer_started)) {
      offer.m_offer_started = m_offer_started;
    }

    // =====================================
    // NEW IMAGE
    // =====================================

    if (req.files?.m_offer_image?.[0]) {
      newImage = req.files.m_offer_image[0].path;

      offer.m_offer_image = newImage;
    }

    // =====================================
    // SAVE
    // =====================================

    await offer.save();

    // =====================================
    // DELETE OLD IMAGE
    // =====================================

    if (newImage && oldImage && oldImage !== newImage) {
      deleteFile(oldImage);
    }

    return res.status(200).send({
      status: true,

      message: "Offer updated successfully",

      data: offer,
    });
  } catch (error) {
    // =====================================
    // DELETE NEW IMAGE IF ERROR
    // =====================================

    if (newImage) {
      deleteFile(newImage);
    }

    return res.status(500).send({
      status: false,

      message: error.message,
    });
  }
};



const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,

        message: "Invalid offer id",
      });
    }

    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).send({
        status: false,

        message: "Offer not found",
      });
    }

    // =====================================
    // DELETE IMAGE
    // =====================================

    if (offer.m_offer_image) {
      deleteFile(offer.m_offer_image);
    }

    // =====================================
    // DELETE OFFER
    // =====================================

    await Offer.findByIdAndDelete(id);

    return res.status(200).send({
      status: true,

      message: "Offer deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,

      message: error.message,
    });
  }
};



const toggleOfferStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,

        message: "Invalid offer id",
      });
    }

    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).send({
        status: false,

        message: "Offer not found",
      });
    }

    offer.m_offer_status = offer.m_offer_status === 1 ? 0 : 1;

    await offer.save();

    return res.status(200).send({
      status: true,

      message: "Offer status updated successfully",

      current_status: offer.m_offer_status,

      data: offer,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,

      message: error.message,
    });
  }
};

module.exports = {
  addOffer,
  getAllOffers,
  getSingleOffer,
  updateOffer,
  deleteOffer,
  toggleOfferStatus,
};
