const Banner = require("../models/banners");
const fs = require("fs");
const { deleteFromCloudinary } = require("../utils/cloudinaryHelper");


const addBanner = async (req, res) => {
  try {
    const {
      m_banner_title,
      m_banner_status,
    } = req.body;

    

    if (!m_banner_title) {

      // delete uploaded image if validation fails
      if (req.files?.banner_image?.[0]?.path) {
        await deleteFromCloudinary(req.files.banner_image[0].path);
      }

      return res.status(400).send({
        status: false,
        message: "Banner title is required",
      });
    }

    

    let image = null;

    if (req.files?.banner_image) {
      image = req.files.banner_image[0].path;
    }

   

    const banner = new Banner({
      m_banner_title,

      m_banner_status:
        m_banner_status || "running",

      m_banner_image: image || null,
    });

    const savedBanner = await banner.save();

    

    return res.status(201).send({
      status: true,
      message: "Banner added successfully",
      data: savedBanner,
    });

  } catch (error) {

    // delete uploaded image if error comes
    if (req.files?.banner_image?.[0]?.path) {
      await deleteFromCloudinary(req.files.banner_image[0].path);
    }

    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getAllBanners = async (req, res) => {
  try {

    let {
      page = 1,
      limit = 10,
      keyword = "",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

   

    if (keyword) {
      filter.$or = [
        {
          m_banner_title: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          m_banner_status: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }

    

    const totalRecords =
      await Banner.countDocuments(filter);

    

    const data = await Banner.find(filter)

      .sort({ createdAt: -1 })

      .skip((page - 1) * limit)

      .limit(limit);

    

    return res.status(200).send({
      status: true,

      pagination: {
        currentPage: page,
        perPage: limit,
        totalRecords,
        totalPages: Math.ceil(
          totalRecords / limit
        ),
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


const getSingleBanner = async (req, res) => {
  try {

    const { id } = req.params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).send({
        status: false,
        message: "Banner not found",
      });
    }

    return res.status(200).send({
      status: true,
      data: banner,
    });

  } catch (error) {

    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};


const changeBannerStatus = async (req, res) => {
  try {

    const { id } = req.params;

    const { m_banner_status } = req.body;

    

    if (
      !["pending", "running", "expired"].includes(
        m_banner_status
      )
    ) {
      return res.status(400).send({
        status: false,
        message:
          "Status must be pending, running or expired",
      });
    }



    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).send({
        status: false,
        message: "Banner not found",
      });
    }

  

    banner.m_banner_status =
      m_banner_status;

    await banner.save();



    return res.status(200).send({
      status: true,
      message: "Banner status changed successfully",
      data: banner,
    });

  } catch (error) {

    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

 
const updateBanner = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      m_banner_title,
      m_banner_status,
    } = req.body;

  

    const banner = await Banner.findById(id);

    if (!banner) {

      if (req.files?.banner_image?.[0]?.path) {
        await deleteFromCloudinary(req.files.banner_image[0].path);
      }

      return res.status(404).send({
        status: false,
        message: "Banner not found",
      });
    }

   

    const oldImage =
      banner.m_banner_image;

   

    if (m_banner_title) {
      banner.m_banner_title =
        m_banner_title;
    }

    if (m_banner_status) {
      banner.m_banner_status =
        m_banner_status;
    }

    

    if (req.files?.banner_image) {

      banner.m_banner_image =
        req.files.banner_image[0].path;
    }

   

    await banner.save();

    

    if (req.files?.banner_image && oldImage) {
      await deleteFromCloudinary(oldImage);
    }

  

    return res.status(200).send({
      status: true,
      message: "Banner updated successfully",
      data: banner,
    });

  } catch (error) {

    // delete new uploaded image if error comes
    if (req.files?.banner_image?.[0]?.path) {
      await deleteFromCloudinary(req.files.banner_image[0].path);
    }

    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};


const deleteBanner = async (req, res) => {
  try {

    const { id } = req.params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).send({
        status: false,
        message: "Banner not found",
      });
    }



    if (banner.m_banner_image) {
      await deleteFromCloudinary(banner.m_banner_image);
    }

   

    await Banner.findByIdAndDelete(id);

    

    return res.status(200).send({
      status: true,
      message: "Banner deleted successfully",
    });

  } catch (error) {

    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addBanner,
  getAllBanners,
  getSingleBanner,
  changeBannerStatus,
  updateBanner,
  deleteBanner,
};