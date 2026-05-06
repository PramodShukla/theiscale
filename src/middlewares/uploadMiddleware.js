const multer = require("multer");
const path = require("path");
const fs = require("fs");

// dynamic storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    // ==================
    // CATEGORY UPLOADS (Already Existing)
    // ==================
    if (file.fieldname === "category_icon") {
      folder = "src/uploads/categories/category-icon";
    } else if (file.fieldname === "category_banner") {
      folder = "src/uploads/categories/category-banner";
    }

    // ==================
    // COURSE UPLOADS (Newly Added)
    // ==================
    else if (file.fieldname === "m_course_banner") {
      folder = "src/uploads/courses/banner";
    } else if (file.fieldname === "m_course_pdf") {
      folder = "src/uploads/courses/pdf";
    } else if (file.fieldname === "m_course_feestructure") {
      folder = "src/uploads/courses/fee-structure";
    } else if (file.fieldname === "m_course_brochure") {
      folder = "src/uploads/courses/brochure";
    } else if (file.fieldname === "m_feature_image") {
      folder = "src/uploads/features";
    } else if (file.fieldname === "c_tool_img") {
      folder = "src/uploads/tools";
    } else if (file.fieldname === "m_subject_icon") {
      folder = "src/uploads/subjects/icon";
    } else if (file.fieldname === "ml_file") {
      folder = "src/uploads/topics/video";
    } else if (file.fieldname === "ml_pdffile") {
      folder = "src/uploads/topics/pdf";
    } else if (file.fieldname === "m_package_image") {
      folder = "src/uploads/test-packages";
    } else if (file.fieldname === "th_icon") {
      folder = "src/uploads/training-highlights";
    } else if (file.fieldname === "m_quiz_icon") {
      folder = "src/uploads/quiz/icon";
    } else if (file.fieldname === "m_quiz_banner") {
      folder = "src/uploads/quiz/banner";
    } else if (file.fieldname === "m_instructor_profile") {
      folder = "src/uploads/instructors";
    } else if (file.fieldname === "m_st_video") {
      folder = "src/uploads/testimonials/video";
    } else if (file.fieldname === "company_logo") {
      folder = "src/uploads/jobs/company-logo";
    } else if (file.fieldname === "m_ec_icon") {
      folder = "src/uploads/event-category/icon";
    } else if (file.fieldname === "m_ec_banner") {
      folder = "src/uploads/event-category/banner";
    } else if (file.fieldname === "m_event_banner") {
      folder = "src/uploads/events/banner";
    } else if (file.fieldname === "m_event_file") {
      folder = "src/uploads/events/files";
    } else if (file.fieldname === "m_pre_image") {
      folder = "src/uploads/ppt/person";
    } else if (file.fieldname === "m_pre_company_img") {
      folder = "src/uploads/ppt/company";
    } else if (file.fieldname === "m_client_logo") {
      folder = "src/uploads/clients/logo";
    } else if (file.fieldname === "m_allied_image") {
      folder = "src/uploads/allied";
    } else if (file.fieldname === "m_news_image") {
      folder = "src/uploads/news&updates";
    } else if (file.fieldname === "m_snews_image") {
      folder = "src/uploads/news";
    }

    // folder create if not exists
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// ==================
// FILE FILTER (Updated)
// ==================
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
  const allowedPdfTypes = ["application/pdf"];

  // Category fields - only images
  if (
    file.fieldname === "category_icon" ||
    file.fieldname === "category_banner"
  ) {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"), false);
    }
  }

  // Course banner - only images
  else if (file.fieldname === "m_course_banner") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Only JPEG, JPG, PNG images allowed for course banner"),
        false,
      );
    }
  }

  // feature image - only images
  else if (file.fieldname === "m_feature_image") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed for feature"), false);
    }
  }

  // Course PDF fields - only pdf
  else if (
    file.fieldname === "m_course_pdf" ||
    file.fieldname === "m_course_feestructure" ||
    file.fieldname === "m_course_brochure"
  ) {
    if (allowedPdfTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Only PDF files allowed for ${file.fieldname}`), false);
    }
  }

  // Course tools image - only images
  else if (file.fieldname === "c_tool_img") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed for tools"), false);
    }
  }

  // Subject icon - only images
  else if (file.fieldname === "m_subject_icon") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed for subject icon"), false);
    }
  }

  // Topic video upload
  else if (file.fieldname === "ml_file") {
    const allowedVideoTypes = ["video/mp4", "video/mkv", "video/avi"];

    if (allowedVideoTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only video files allowed"), false);
    }
  }

  // Topic PDF upload
  else if (file.fieldname === "ml_pdffile") {
    if (allowedPdfTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed for topic"), false);
    }
  }

  // Test package image - only images
  else if (file.fieldname === "m_package_image") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed for package"), false);
    }
  }

  // Training highlight image - only images
  else if (file.fieldname === "th_icon") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed"), false);
    }
  }

  // Quiz icon - only images
  else if (file.fieldname === "m_quiz_icon") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed for quiz icon"), false);
    }
  }

  // Quiz banner - only images
  else if (file.fieldname === "m_quiz_banner") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed for quiz banner"), false);
    }
  }

  // Instructor profile image - only images
  else if (file.fieldname === "m_instructor_profile") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed for instructor profile"), false);
    }
  }

  // Testimonial video upload
  else if (file.fieldname === "m_st_video") {
    const allowedVideoTypes = ["video/mp4", "video/mkv", "video/avi"];

    if (allowedVideoTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only video allowed"), false);
    }
  }

  // Company logo - only images
  else if (file.fieldname === "company_logo") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed for company logo"), false);
    }
  }

  // Event category icon/banner - only images
  else if (file.fieldname === "m_ec_icon" || file.fieldname === "m_ec_banner") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed for event category"), false);
    }
  }

  // Event banner - only images
  else if (file.fieldname === "m_event_banner") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed for event banner"), false);
    }
  }

  // Event file - only PDF
  else if (file.fieldname === "m_event_file") {
    if (allowedPdfTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF allowed for event file"), false);
    }
  }

  // Pre-placement testimonial images - only images
  else if (
    file.fieldname === "m_pre_image" ||
    file.fieldname === "m_pre_company_img"
  ) {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed for PPT"), false);
    }
  }

  // Our Client logo - only images
  else if (file.fieldname === "m_client_logo") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed for client logo"), false);
    }
  }

  // Allied image - only images
  else if (file.fieldname === "m_allied_image") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed for allied"), false);
    }
  }

  // news & update images-only images
  else if (file.fieldname === "m_news_image") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed for news & updates"), false);
    }
  }

  // news images-only images
  else if (file.fieldname === "m_snews_image") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed for news"), false);
    }
  }

  // Other fields
  else {
    cb(new Error("Unknown file field"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
});

// ==================
// COURSE UPLOAD (Multiple Fields)
// ==================
const courseUpload = upload.fields([
  { name: "m_course_banner", maxCount: 1 }, // Course Image (Required)
  { name: "m_course_pdf", maxCount: 1 }, // Course PDF (Optional)
  { name: "m_course_feestructure", maxCount: 1 }, // Fee Structure (Optional)
  { name: "m_course_brochure", maxCount: 1 }, // Brochure (Optional)
]);

const featureUpload = upload.fields([{ name: "m_feature_image", maxCount: 1 }]);

const toolUpload = upload.fields([{ name: "c_tool_img", maxCount: 1 }]);

const subjectUpload = upload.fields([{ name: "m_subject_icon", maxCount: 1 }]);

const topicUpload = upload.fields([
  { name: "ml_file", maxCount: 1 }, // video
  { name: "ml_pdffile", maxCount: 1 }, // pdf
]);

const packageUpload = upload.fields([{ name: "m_package_image", maxCount: 1 }]);

const thUpload = upload.fields([{ name: "th_icon", maxCount: 1 }]);

const quizUpload = upload.fields([
  { name: "m_quiz_icon", maxCount: 1 },
  { name: "m_quiz_banner", maxCount: 1 },
]);

const instructorUpload = upload.fields([
  { name: "m_instructor_profile", maxCount: 1 },
]);

const testimonialUpload = upload.fields([{ name: "m_st_video", maxCount: 1 }]);

const jobUpload = upload.fields([{ name: "company_logo", maxCount: 1 }]);

const eventCategoryUpload = upload.fields([
  { name: "m_ec_icon", maxCount: 1 },
  { name: "m_ec_banner", maxCount: 1 },
]);

const eventUpload = upload.fields([
  { name: "m_event_banner", maxCount: 1 },
  { name: "m_event_file", maxCount: 1 },
]);

const pptUpload = upload.fields([
  { name: "m_pre_image", maxCount: 1 },
  { name: "m_pre_company_img", maxCount: 1 },
]);

const clientUpload = upload.fields([{ name: "m_client_logo", maxCount: 1 }]);

const alliedUpload = upload.fields([{ name: "m_allied_image", maxCount: 1 }]);

const newsupdatesUpload = upload.fields([
  { name: "m_news_image", maxCount: 1 },
]);

const newsUpload = upload.fields([{ name: "m_snews_image", maxCount: 1 }]);

module.exports = {
  upload,
  courseUpload,
  featureUpload,
  toolUpload,
  subjectUpload,
  topicUpload,
  packageUpload,
  thUpload,
  quizUpload,
  instructorUpload,
  testimonialUpload,
  jobUpload,
  eventCategoryUpload,
  eventUpload,
  pptUpload,
  clientUpload,
  alliedUpload,
  newsupdatesUpload,
  newsUpload,
};
