const Notes = require("../models/notes");

const NotesCategory = require("../models/notes_category");

const NotesSubCategory = require("../models/notes_subcategory");

const Subject = require("../models/subject");

const Training = require("../models/course_training");

const mongoose = require("mongoose");

const NotesEnrollment = require("../models/notes_enrollment");
const fs = require("fs");

// DELETE FILE FUNCTION
// ======================================================

const path = require("path");

const deleteFile = (filePath) => {
  try {
    if (!filePath) return;

    // absolute path
    const fullPath = path.resolve(filePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);

      console.log("Deleted File:", fullPath);
    } else {
      console.log("File Not Found:", fullPath);
    }
  } catch (error) {
    console.log("File Delete Error:", error.message);
  }
};

// ======================================================
// PARSE ARRAY FUNCTION
// ======================================================

const parseArrayField = (field) => {
  try {
    if (!field || field === "" || field === "[]" || field === "[ ' ' ]") {
      return null;
    }

    // already array
    if (Array.isArray(field)) {
      return field.length > 0 ? field : null;
    }

    // string array convert
    if (typeof field === "string") {
      // single quote => double quote
      const fixedString = field.replace(/'/g, '"').replace(/\s+/g, " ").trim();

      const parsed = JSON.parse(fixedString);

      if (!Array.isArray(parsed)) {
        return null;
      }

      // trim every item
      const cleanedArray = parsed
        .map((item) => (typeof item === "string" ? item.trim() : item))
        .filter((item) => item !== "" && item !== null);

      return cleanedArray.length > 0 ? cleanedArray : null;
    }

    return null;
  } catch (error) {
    return null;
  }
};

const addNotes = async (req, res) => {
  let imagePath = null;

  let pdfPath = null;

  try {
    let {
      notes_category_id,
      notes_subcategory_id,
      notes_name,
      notes_keywords,
      notes_intro,
      notes_description,
      notes_status,
      notes_type,
      notes_price,
      notes_offer_price,
      no_of_ratings,
      no_of_students_enrolled,
      subjects,
      training_highlights,
    } = req.body;

    // =========================
    // TRIM VALUES
    // =========================

    notes_category_id = notes_category_id?.trim();

    notes_subcategory_id = notes_subcategory_id?.trim();

    notes_name = notes_name?.trim();

    notes_keywords = notes_keywords?.trim();

    notes_intro = notes_intro?.trim();

    notes_description = notes_description?.trim();

    notes_status = notes_status?.trim();

    notes_type = notes_type?.trim();

    // =========================
    // FILES
    // =========================

    imagePath = req.files?.notes_image?.[0]?.path || null;

    pdfPath = req.files?.notes_pdf?.[0]?.path || null;

    // =========================
    // REQUIRED VALIDATION
    // =========================

    if (!notes_name) {
      deleteFile(imagePath);

      deleteFile(pdfPath);

      return res.status(400).json({
        status: false,
        message: "Notes name is required",
      });
    }

    // =========================
    // CATEGORY CHECK
    // =========================

    if (notes_category_id) {
      const category = await NotesCategory.findById(notes_category_id);

      if (!category) {
        deleteFile(imagePath);

        deleteFile(pdfPath);

        return res.status(404).json({
          status: false,
          message: "Notes category not found",
        });
      }
    }

    // =========================
    // SUBCATEGORY CHECK
    // =========================

    if (notes_subcategory_id) {
      const subCategory = await NotesSubCategory.findById(notes_subcategory_id);

      if (!subCategory) {
        deleteFile(imagePath);

        deleteFile(pdfPath);

        return res.status(404).json({
          status: false,
          message: "Notes subcategory not found",
        });
      }

      // =========================
      // RELATION CHECK
      // =========================

      if (
        notes_category_id &&
        String(subCategory.notes_category_id) !== String(notes_category_id)
      ) {
        deleteFile(imagePath);

        deleteFile(pdfPath);

        return res.status(400).json({
          status: false,
          message:
            "This notes sub category does not belong to this notes category",
        });
      }
    }

    // =========================
    // PARSE ARRAYS
    // =========================

    const parsedSubjects = parseArrayField(subjects);

    const parsedTraining = parseArrayField(training_highlights);

    // =========================
    // CREATE NOTES
    // =========================

    const notes = await Notes.create({
      notes_category_id: notes_category_id || null,

      notes_subcategory_id: notes_subcategory_id || null,

      notes_name,

      notes_keywords: notes_keywords || null,

      notes_intro: notes_intro || null,

      notes_description: notes_description || null,

      notes_image: imagePath,

      notes_pdf: pdfPath,

      notes_status: Number(notes_status) || 1,

      notes_type: Number(notes_type) || 1,

      notes_price: notes_price || 0,

      notes_offer_price: notes_offer_price || 0,

      no_of_ratings: no_of_ratings || 0,

      no_of_students_enrolled: no_of_students_enrolled || 0,

      subjects: parsedSubjects || null,

      training_highlights: parsedTraining || null,
    });

    return res.status(201).json({
      status: true,

      message: "Notes added successfully",

      data: notes,
    });
  } catch (error) {
    deleteFile(imagePath);

    deleteFile(pdfPath);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const status = req.query.status || "";

    const notes_type = req.query.notes_type || "";

    let filter = {};

    // =========================
    // SEARCH
    // =========================

    if (search) {
      filter.notes_name = {
        $regex: search,
        $options: "i",
      };
    }

    // =========================
    // STATUS FILTER
    // =========================

    if (status) {
      filter.notes_status = status;
    }

    // =========================
    // TYPE FILTER
    // =========================

    if (notes_type) {
      filter.notes_type = notes_type;
    }

    const data = await Notes.find(filter)

      .populate({
        path: "notes_category_id",
        select: "_id nc_name",
      })

      .populate({
        path: "notes_subcategory_id",
        select: "_id notes_subcategory_name",
      })

      .populate({
        path: "subjects",
        select: "_id m_subject_title",
      })

      .populate({
        path: "training_highlights",
        select: "_id title",
      })

      .sort({
        createdAt: -1,
      })

      .skip(skip)

      .limit(limit);

    const totalRecords = await Notes.countDocuments(filter);

    return res.status(200).json({
      status: true,

      current_page: page,

      total_pages: Math.ceil(totalRecords / limit),

      total_records: totalRecords,

      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getSingleNotes = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Notes.findById(id)

      .populate({
        path: "notes_category_id",
        select: "_id nc_name",
      })

      .populate({
        path: "notes_subcategory_id",
        select: "_id notes_subcategory_name",
      })

      .populate({
        path: "subjects",
        select: "_id m_subject_title",
      })

      .populate({
        path: "training_highlights",
        select: "_id title",
      });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Notes not found",
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

const changeNotesStatus = async (req, res) => {
  try {
    const id = req.params.id;

    const notes = await Notes.findById(id);

    if (!notes) {
      return res.status(404).json({
        status: false,
        message: "Notes not found",
      });
    }

    notes.notes_status =
      notes.notes_status === 1 ? 0 : 1;

    await notes.save();

    return res.status(200).json({
      status: true,

      message: "Notes status updated successfully",

      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateNotes = async (req, res) => {
  let newImage = null;

  let newPdf = null;

  try {
    const id = req.params.id;

    const notes = await Notes.findById(id);

    if (!notes) {
      deleteFile(req.files?.notes_image?.[0]?.path);

      deleteFile(req.files?.notes_pdf?.[0]?.path);

      return res.status(404).json({
        status: false,
        message: "Notes not found",
      });
    }

    // =========================
    // OLD FILES
    // =========================

    const oldImage = notes.notes_image;

    const oldPdf = notes.notes_pdf;

    // =========================
    // NEW FILES
    // =========================

    newImage = req.files?.notes_image?.[0]?.path || null;

    newPdf = req.files?.notes_pdf?.[0]?.path || null;

    // =========================
    // BODY
    // =========================

    let {
      notes_category_id,
      notes_subcategory_id,
      notes_name,
      notes_keywords,
      notes_intro,
      notes_description,
      notes_status,
      notes_type,
      notes_price,
      notes_offer_price,
      no_of_ratings,
      no_of_students_enrolled,
      subjects,
      training_highlights,
    } = req.body;

    // =========================
    // TRIM VALUES
    // =========================

    notes_category_id = notes_category_id?.trim();

    notes_subcategory_id = notes_subcategory_id?.trim();

    notes_name = notes_name?.trim();

    notes_keywords = notes_keywords?.trim();

    notes_intro = notes_intro?.trim();

    notes_description = notes_description?.trim();

    notes_status = notes_status?.trim();

    notes_type = notes_type?.trim();

    // =========================
    // RELATION VALIDATION
    // =========================

    if (notes_category_id || notes_subcategory_id) {
      const finalCategoryId = notes_category_id || notes.notes_category_id;

      const finalSubCategoryId =
        notes_subcategory_id || notes.notes_subcategory_id;

      const subCategory = await NotesSubCategory.findOne({
        _id: finalSubCategoryId,

        notes_category_id: finalCategoryId,
      });

      if (!subCategory) {
        deleteFile(newImage);

        deleteFile(newPdf);

        return res.status(400).json({
          status: false,

          message:
            "This notes sub category does not belong to this notes category",
        });
      }
    }

    // =========================
    // UPDATE FIELDS
    // =========================

    if (notes_category_id) {
      notes.notes_category_id = notes_category_id;
    }

    if (notes_subcategory_id) {
      notes.notes_subcategory_id = notes_subcategory_id;
    }

    if (notes_name) {
      notes.notes_name = notes_name;
    }

    if (notes_keywords) {
      notes.notes_keywords = notes_keywords;
    }

    if (notes_intro) {
      notes.notes_intro = notes_intro;
    }

    if (notes_description) {
      notes.notes_description = notes_description;
    }

    if (notes_status) {
      notes.notes_status = notes_status;
    }

    if (notes_type) {
      notes.notes_type = notes_type;
    }

    if (notes_price !== undefined) {
      notes.notes_price = notes_price;
    }

    if (notes_offer_price !== undefined) {
      notes.notes_offer_price = notes_offer_price;
    }

    if (no_of_ratings !== undefined) {
      notes.no_of_ratings = no_of_ratings;
    }

    if (no_of_students_enrolled !== undefined) {
      notes.no_of_students_enrolled = no_of_students_enrolled;
    }

    // =========================
    // SUBJECTS
    // =========================

    if (subjects !== undefined) {
      const parsedSubjects = parseArrayField(subjects);

      notes.subjects = parsedSubjects;
    }

    // =========================
    // TRAINING HIGHLIGHTS
    // =========================

    if (training_highlights !== undefined) {
      const parsedTraining = parseArrayField(training_highlights);

      notes.training_highlights = parsedTraining;
    }

    // =========================
    // FILES UPDATE
    // =========================

    if (newImage) {
      notes.notes_image = newImage;
    }

    if (newPdf) {
      notes.notes_pdf = newPdf;
    }

    // =========================
    // SAVE
    // =========================

    await notes.save();

    // =========================
    // DELETE OLD FILES
    // =========================

    if (newImage) {
      deleteFile(oldImage);
    }

    if (newPdf) {
      deleteFile(oldPdf);
    }

    return res.status(200).json({
      status: true,

      message: "Notes updated successfully",

      data: notes,
    });
  } catch (error) {
    deleteFile(newImage);

    deleteFile(newPdf);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const id = req.params.id;

    const notes = await Notes.findById(id);

    if (!notes) {
      return res.status(404).json({
        status: false,
        message: "Notes not found",
      });
    }

    // =========================
    // DELETE FILES
    // =========================

    deleteFile(notes.notes_image);

    deleteFile(notes.notes_pdf);

    // =========================
    // DELETE DOCUMENT
    // =========================

    await Notes.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,

      message: "Notes deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getAllUserNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const notes_category_id = req.query.notes_category_id || "";

    const notes_subcategory_id = req.query.notes_subcategory_id || "";

    let filter = {
      notes_status: 1,
    };

    // =========================
    // SEARCH
    // =========================

    if (search) {
      filter.notes_name = {
        $regex: search,
        $options: "i",
      };
    }

    // =========================
    // CATEGORY FILTER
    // =========================

    if (notes_category_id) {
      filter.notes_category_id = notes_category_id;
    }

    // =========================
    // SUBCATEGORY FILTER
    // =========================

    if (notes_subcategory_id) {
      filter.notes_subcategory_id = notes_subcategory_id;
    }

    // =========================
    // NOTES
    // =========================

    const notes = await Notes.find(filter)

      .populate({
        path: "notes_category_id",
        select: "_id nc_name",
      })

      .populate({
        path: "notes_subcategory_id",
        select: "_id notes_subcategory_name",
      })

      .populate({
        path: "subjects",
        select: "_id m_subject_title",
      })

      .select(
        "_id notes_name notes_image subjects notes_category_id notes_subcategory_id",
      )

      .sort({
        createdAt: -1,
      })

      .skip(skip)

      .limit(limit)

      .lean();

    // =========================
    // ENROLLMENT CHECK
    // =========================

    const notesIds = notes.map((item) => item._id);

    const enrollments = await NotesEnrollment.find({
      user_id: req.user.id,
      notes_id: {
        $in: notesIds,
      },
      enrollment_status: 1,
    }).select("notes_id");

    const enrolledIds = enrollments.map((item) => item.notes_id.toString());

    // =========================
    // FINAL RESPONSE
    // =========================

    const finalData = notes.map((item) => ({
      ...item,

      is_enrolled: enrolledIds.includes(item._id.toString()),
    }));

    const totalRecords = await Notes.countDocuments(filter);

    return res.status(200).json({
      status: true,

      current_page: page,

      total_pages: Math.ceil(totalRecords / limit),

      total_records: totalRecords,

      data: finalData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

const getSingleUserNotes = async (req, res) => {
  try {
    const { id } = req.params;

    // =========================
    // VALIDATION
    // =========================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,

        message: "Invalid notes id",
      });
    }

    // =========================
    // NOTES FIND
    // =========================

    const notes = await Notes.findById(id)

      .populate({
        path: "notes_category_id",
        select: "_id nc_name",
      })

      .populate({
        path: "notes_subcategory_id",
        select: "_id notes_subcategory_name",
      })

      .populate({
        path: "subjects",
        select: "_id m_subject_title",
      })

      .populate({
        path: "training_highlights",
        select: "_id title",
      });

    if (!notes) {
      return res.status(404).json({
        status: false,

        message: "Notes not found",
      });
    }

    // =========================
    // ENROLLMENT CHECK
    // =========================

    const enrollment = await NotesEnrollment.findOne({
      user_id: req.user.id,

      notes_id: id,

      enrollment_status: 1,
    });

    return res.status(200).json({
      status: true,

      is_enrolled: enrollment ? true : false,

      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

const enrollNotes = async (req, res) => {
  try {
    const { notes_id } = req.params;

    // =========================
    // VALIDATION
    // =========================

    if (!mongoose.Types.ObjectId.isValid(notes_id)) {
      return res.status(400).json({
        status: false,

        message: "Invalid notes id",
      });
    }

    // =========================
    // NOTES CHECK
    // =========================

    const notes = await Notes.findById(notes_id);

    if (!notes) {
      return res.status(404).json({
        status: false,

        message: "Notes not found",
      });
    }

    // =========================
    // ALREADY ENROLLED
    // =========================

    const alreadyEnrolled = await NotesEnrollment.findOne({
      user_id: req.user.id,

      notes_id,

      enrollment_status: 1,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        status: false,

        message: "You already enrolled this notes",
      });
    }

    // =========================
    // ENROLL
    // =========================

    const enrollment = await NotesEnrollment.create({
      user_id: req.user.id,

      notes_id,

      enrollment_status: 1,
    });

    return res.status(201).json({
      status: true,

      message: "Notes enrolled successfully",

      data: enrollment,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

const getMyEnrolledNotes = async (req, res) => {
  try {
    const enrollments = await NotesEnrollment.find({
      user_id: req.user.id,

      enrollment_status: 1,
    })

      .populate({
        path: "notes_id",

        populate: [
          {
            path: "notes_category_id",

            select: "_id nc_name",
          },

          {
            path: "notes_subcategory_id",

            select: "_id notes_subcategory_name",
          },

          {
            path: "subjects",

            select: "_id m_subject_title",
          },
        ],
      })

      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      status: true,

      total_records: enrollments.length,

      data: enrollments,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};


module.exports = {
  addNotes,

  getAllNotes,

  getSingleNotes,

  changeNotesStatus,

  updateNotes,

  deleteNotes,

  getAllUserNotes,

  getSingleUserNotes,

  enrollNotes,

  getMyEnrolledNotes,
};
