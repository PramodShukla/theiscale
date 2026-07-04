const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extracts public_id from Cloudinary URL and deletes the asset from Cloudinary.
 * @param {string} url - The secure URL of the asset stored in the database.
 */
const deleteFromCloudinary = async (url) => {
  if (!url || !url.startsWith("http")) return;
  try {
    const uploadMatch = url.match(/\/upload\/v\d+\/(.+)$/);
    if (!uploadMatch) return;

    const fullPath = uploadMatch[1];
    const lastDotIndex = fullPath.lastIndexOf(".");
    const publicId = lastDotIndex !== -1 ? fullPath.substring(0, lastDotIndex) : fullPath;

    let resourceType = "image";
    if (url.match(/\.(mp4|mkv|avi|mov|mpeg|webm)$/i)) {
      resourceType = "video";
    } else if (url.match(/\.pdf$/i)) {
      resourceType = "raw";
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    console.log(`Deleted from Cloudinary (${publicId}):`, result);
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
  }
};

module.exports = { deleteFromCloudinary };
