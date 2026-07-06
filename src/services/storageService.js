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
      // console.log(uploadResult);
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
const deleteFile = async (fileIdentifier) => {
  if (!fileIdentifier) return false;

  if (STORAGE_PROVIDER === "cloudinary") {
    try {
      let resourceType = "image";

      if (fileIdentifier.match(/\.(mp4|mkv|avi|mov)$/i)) {
        resourceType = "video";
      } else if (fileIdentifier.match(/\.pdf$/i)) {
        resourceType = "raw";
      }

      const result = await cloudinary.uploader.destroy(fileIdentifier, {
        resource_type: resourceType,
      });

      // console.log("Cloudinary Delete Result =>", result);

      return result.result === "ok" || result.result === "not found";
    } catch (error) {
      console.error("Cloudinary delete error:", error);
      return false;
    }
  }

  // Local Storage
  if (fs.existsSync(fileIdentifier)) {
    fs.unlinkSync(fileIdentifier);
    return true;
  }

  return false;
};

const deleteVideoFromCloud = async (publicId) => {
  if (!publicId) return false;

  if (STORAGE_PROVIDER === "cloudinary") {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "video",
      });

      console.log("Cloudinary Video Delete:", result);

      return result.result === "ok" || result.result === "not found";
    } catch (error) {
      console.error("Cloudinary video delete error:", error);
      return false;
    }
  }

  if (fs.existsSync(publicId)) {
    fs.unlinkSync(publicId);
    return true;
  }

  return false;
};

const extractUploadedFile = (file) => {
  if (!file) {
    return null;
  }

  return {
    url: file.path,
    public_id: file.filename,
  };
};

const uploadFileWithMeta = async (localFilePath, folderName) => {
  if (!localFilePath) return null;

  if (STORAGE_PROVIDER === "cloudinary") {
    try {
      const uploadResult = await cloudinary.uploader.upload(localFilePath, {
        folder: folderName,
        resource_type: "auto",
      });

      // console.log(uploadResult);

      return {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        resource_type: uploadResult.resource_type,
      };
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  }

  return {
    url: localFilePath,
    public_id: null,
    resource_type: null,
  };
};

module.exports = {
  uploadFile,
  deleteFile,
  deleteVideoFromCloud,
  extractUploadedFile,
  uploadFileWithMeta,
};
