const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

// Config Cloudinary using your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "bcbhmpgp",
  api_key: process.env.CLOUDINARY_API_KEY || "699654349155336",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const STORAGE_PROVIDER = process.env.STORAGE_PROVIDER || "local";

/**
 * Uploads local file to Cloudinary or falls back to local path.
 */
const uploadFile = async (localFilePath, folderName) => {
  if (!localFilePath) return null;

  if (STORAGE_PROVIDER === "cloudinary") {
    try {
      const uploadResult = await cloudinary.uploader.upload(localFilePath, {
        folder: folderName,
        resource_type: "auto", // handles image/video/pdf automatically
      });
      return uploadResult.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  }
  // Default fallback: return local file path
  return localFilePath;
};

/**
 * Deletes file from Cloudinary or local disk.
 */
const deleteFile = async (fileUrlOrPath) => {
  if (!fileUrlOrPath) return false;

  if (STORAGE_PROVIDER === "cloudinary") {
    try {
      const parts = fileUrlOrPath.split("/");
      const filenameWithExtension = parts.pop();
      const folder = parts.pop();
      const publicId = `${folder}/${filenameWithExtension.split(".")[0]}`;

      let resourceType = "image";
      if (fileUrlOrPath.match(/\.(mp4|mkv|avi|mov)$/i)) {
        resourceType = "video";
      } else if (fileUrlOrPath.match(/\.pdf$/i)) {
        resourceType = "raw";
      }

      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });
      return result.result === "ok";
    } catch (error) {
      console.error("Cloudinary delete error:", error);
      return false;
    }
  }

  // Local fallback
  if (fs.existsSync(fileUrlOrPath)) {
    fs.unlinkSync(fileUrlOrPath);
    return true;
  }
  return false;
};

module.exports = {
  uploadFile,
  deleteFile,
};
