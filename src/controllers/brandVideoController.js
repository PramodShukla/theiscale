const BrandVideo = require("../models/video");
// const fs = require("fs");
// const storageService = require("../services/storageService");
const {
  extractUploadedFile,
  deleteVideoFromCloud,
} = require("../services/storageService");

const addBrandVideo = async (req, res) => {
  console.log("Inside addBrandVideo");
  // let uploadedVideo = null;

  try {
    const { name, url, status } = req.body;

    // uploadedVideo = req.files?.video_file?.[0]?.path || null;

    // if (!name || !name.trim()) {
    //   if (uploadedVideo && fs.existsSync(uploadedVideo)) {
    //     fs.unlinkSync(uploadedVideo);
    //   }

    //   return res.status(400).json({
    //     status: false,
    //     message: "Name is required",
    //   });
    // }

    // const brandVideo = await BrandVideo.create({
    //   name: name.trim(),
    //   url: url || null,
    //   video_file: uploadedVideo,
    //   status: status || "active",
    // });

    // const localTempPath = req.files?.video_file?.[0]?.path;
    // let uploadedVideo = null;
    // if (localTempPath) {
    //   uploadedVideo = await storageService.uploadFile(
    //     localTempPath,
    //     "brand-videos",
    //   );
    //   if (fs.existsSync(localTempPath)) fs.unlinkSync(localTempPath);
    // }

    // const brandVideo = await BrandVideo.create({
    //   name: name.trim(),
    //   url: url || null,
    //   // video_file: uploadedVideo, // Saves the Cloudinary URL or local path depending on env
    //   status: status || "active",
    // });

    const uploaded = req.files?.video_file?.[0]
      ? extractUploadedFile(req.files.video_file[0])
      : null;

    const brandVideo = await BrandVideo.create({
      name: name.trim(),
      url: url || null,
      video_file: uploaded?.url || null,
      public_id: uploaded?.public_id || null,
      status: status || "active",
    });

    return res.status(201).json({
      status: true,
      message: "Brand video added successfully",
      data: brandVideo,
    });
  } catch (error) {
    // if (uploadedVideo && fs.existsSync(uploadedVideo)) {
    //   fs.unlinkSync(uploadedVideo);
    // }

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// const updateBrandVideo = async (req, res) => {
//   let uploadedVideo = null;

//   try {
//     const { id } = req.params;
//     const { name, url, status } = req.body;

//     const brandVideo = await BrandVideo.findById(id);

//     // if (!brandVideo) {
//     //   if (req.files?.video_file?.[0]?.path) {
//     //     fs.unlinkSync(req.files.video_file[0].path);
//     //   }

//     if (!brandVideo) {
//       return res.status(404).json({
//         status: false,
//         message: "Brand video not found",
//       });

//       const oldPublicId = brandVideo.public_id;

//       return res.status(404).json({
//         status: false,
//         message: "Brand video not found",
//       });
//     }

//     // uploadedVideo = req.files?.video_file?.[0]?.path || null;

//     // const oldVideo = brandVideo.video_file;

//     // if (name !== undefined) {
//     //   brandVideo.name = name;
//     // }

//     // if (url !== undefined) {
//     //   brandVideo.url = url;
//     // }

//     // if (status !== undefined) {
//     //   brandVideo.status = status;
//     // }

//     // if (uploadedVideo) {
//     //   brandVideo.video_file = uploadedVideo;
//     // }

//     // await brandVideo.save();

//     // // New video saved successfully
//     // // delete old video
//     // if (uploadedVideo && oldVideo && fs.existsSync(oldVideo)) {
//     //   fs.unlinkSync(oldVideo);
//     // }

//     // const localTempPath = req.files?.video_file?.[0]?.path;
//     // let uploadedVideo = null;
//     // if (localTempPath) {
//     //   uploadedVideo = await storageService.uploadFile(
//     //     localTempPath,
//     //     "brand-videos",
//     //   );
//     //   if (fs.existsSync(localTempPath)) fs.unlinkSync(localTempPath);

//     //   const oldVideo = brandVideo.video_file;
//     //   brandVideo.video_file = uploadedVideo;
//     //   if (oldVideo) {
//     //     await storageService.deleteFile(oldVideo);
//     //   }
//     // }

//     // if (req.files?.video_file?.[0]) {
//     //   const uploaded = extractUploadedFile(req.files.video_file[0]);

//     //   if (brandVideo.public_id) {
//     //     await deleteFile(brandVideo.public_id);
//     //   }

//     //   brandVideo.video_file = uploaded.url;
//     //   brandVideo.public_id = uploaded.public_id;
//     // }

//     if (req.files?.video_file?.[0]) {
//       const uploaded = extractUploadedFile(req.files.video_file[0]);

//       brandVideo.video_file = uploaded.url;
//       brandVideo.public_id = uploaded.public_id;
//     }

//     if (name !== undefined) {
//       brandVideo.name = name;
//     }

//     if (url !== undefined) {
//       brandVideo.url = url;
//     }

//     if (status !== undefined) {
//       brandVideo.status = status;
//     }

//     await brandVideo.save();

//     if (oldPublicId && req.files?.video_file?.[0]) {
//       await deleteFile(oldPublicId);
//     }

//     return res.status(200).json({
//       status: true,
//       message: "Brand video updated successfully",
//       data: brandVideo,
//     });
//   } catch (error) {
//     // If DB save fails, remove newly uploaded video
//     // if (uploadedVideo && fs.existsSync(uploadedVideo)) {
//     //   fs.unlinkSync(uploadedVideo);
//     // }

//     return res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };




const updateBrandVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url, status } = req.body;

    const brandVideo = await BrandVideo.findById(id);

    if (!brandVideo) {
      return res.status(404).json({
        status: false,
        message: "Brand video not found",
      });
    }

    // Old Cloudinary Public ID
    const oldPublicId = brandVideo.public_id;

    // New video upload hua hai
    if (req.files?.video_file?.[0]) {
      const uploaded = extractUploadedFile(req.files.video_file[0]);

      brandVideo.video_file = uploaded.url;
      brandVideo.public_id = uploaded.public_id;
    }

    // Update fields
    if (name !== undefined) {
      brandVideo.name = name.trim();
    }

    if (url !== undefined) {
      brandVideo.url = url;
    }

    if (status !== undefined) {
      brandVideo.status = status;
    }

    // Save DB
    await brandVideo.save();

    // DB save hone ke baad old video delete karo
    if (req.files?.video_file?.[0] && oldPublicId) {
      await deleteVideoFromCloud(oldPublicId);
    }

    return res.status(200).json({
      status: true,
      message: "Brand video updated successfully",
      data: brandVideo,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// GET ALL BRAND VIDEOS
// ==========================================
const getAllBrandVideos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const totalRecords = await BrandVideo.countDocuments(filter);

    const data = await BrandVideo.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      status: true,
      message: "Brand videos fetched successfully",
      totalRecords,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getSingleBrandVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await BrandVideo.findById(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Brand video not found",
      });
    }

    return res.status(200).json({
      status: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteBrandVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const brandVideo = await BrandVideo.findById(id);

    if (!brandVideo) {
      return res.status(404).json({
        status: false,
        message: "Brand video not found",
      });
    }

    // if (brandVideo.video_file && fs.existsSync(brandVideo.video_file)) {
    //   fs.unlinkSync(brandVideo.video_file);
    // }

    // if (brandVideo.video_file) {
    //   await storageService.deleteFile(brandVideo.video_file);
    // }

    if (brandVideo.public_id) {
      await deleteVideoFromCloud(brandVideo.public_id);
    }

    await BrandVideo.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Brand video deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addBrandVideo,
  updateBrandVideo,
  getAllBrandVideos,
  getSingleBrandVideo,
  deleteBrandVideo,
};
