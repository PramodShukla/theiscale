const Classes = require("../models/classes");
const Category = require("../models/category");
const Course = require("../models/course");
const mongoose = require("mongoose");

// =====================================
// CHECK VALID VALUE
// =====================================
const isValidValue = (value) => {
  return (
    value !== undefined &&
    value !== null &&
    value !== "" &&
    value !== "null" &&
    value !== "undefined"
  );
};

// =====================================
// ADD CLASS
// =====================================
const addClass = async (req, res) => {
  try {
    const {
      m_class_name,
      m_class_category,
      m_class_course,
      m_class_link,
      m_class_intro,
      m_class_description,
      m_class_status,
    } = req.body;

    // =====================================
    // REQUIRED VALIDATION
    // =====================================
    if (!isValidValue(m_class_name)) {
      return res.status(400).json({
        status: false,
        message: "Class name is required",
      });
    }

    // =====================================
    // CHECK CATEGORY
    // =====================================
    if (isValidValue(m_class_category)) {
      if (!mongoose.Types.ObjectId.isValid(m_class_category)) {
        return res.status(400).json({
          status: false,
          message: "Invalid category id",
        });
      }

      const categoryExists = await Category.findById(
        m_class_category,
      );

      if (!categoryExists) {
        return res.status(404).json({
          status: false,
          message: "Category not found",
        });
      }
    }

    // =====================================
    // CHECK COURSE
    // =====================================
    let courseData = null;

    if (isValidValue(m_class_course)) {
      if (!mongoose.Types.ObjectId.isValid(m_class_course)) {
        return res.status(400).json({
          status: false,
          message: "Invalid course id",
        });
      }

      courseData = await Course.findById(m_class_course);

      if (!courseData) {
        return res.status(404).json({
          status: false,
          message: "Course not found",
        });
      }
    }

    // =====================================
    // CHECK COURSE BELONGS TO CATEGORY
    // =====================================
    if (
      isValidValue(m_class_category) &&
      isValidValue(m_class_course)
    ) {
      if (
        courseData.m_course_category?.toString() !==
        m_class_category.toString()
      ) {
        return res.status(400).json({
          status: false,
          message:
            "Selected course does not belong to selected category",
        });
      }
    }

    // =====================================
    // CREATE OBJECT
    // =====================================
    const classData = {
      m_class_name,
      m_class_status: isValidValue(m_class_status)
        ? Number(m_class_status)
        : 1,
    };

    if (isValidValue(m_class_category)) {
      classData.m_class_category = m_class_category;
    }

    if (isValidValue(m_class_course)) {
      classData.m_class_course = m_class_course;
    }

    if (isValidValue(m_class_link)) {
      classData.m_class_link = m_class_link;
    }

    if (isValidValue(m_class_intro)) {
      classData.m_class_intro = m_class_intro;
    }

    if (isValidValue(m_class_description)) {
      classData.m_class_description = m_class_description;
    }

    // =====================================
    // CREATE CLASS
    // =====================================
    const newClass = await Classes.create(classData);

    return res.status(201).json({
      status: true,
      message: "Class added successfully",
      data: newClass,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// =====================================
// UPDATE CLASS
// =====================================
const updateClass = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALID CLASS ID
    // =====================================
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid class id",
      });
    }

    // =====================================
    // FIND EXISTING CLASS
    // =====================================
    const existingClass = await Classes.findById(id);

    if (!existingClass) {
      return res.status(404).json({
        status: false,
        message: "Class not found",
      });
    }

    // =====================================
    // UPDATE OBJECT
    // =====================================
    const updateData = {};

    // =====================================
    // CLASS NAME
    // =====================================
    if (isValidValue(req.body.m_class_name)) {
      updateData.m_class_name = req.body.m_class_name;
    }

    // =====================================
    // CATEGORY VALIDATION
    // =====================================
    if (isValidValue(req.body.m_class_category)) {
      if (
        !mongoose.Types.ObjectId.isValid(
          req.body.m_class_category,
        )
      ) {
        return res.status(400).json({
          status: false,
          message: "Invalid category id",
        });
      }

      const categoryExists = await Category.findById(
        req.body.m_class_category,
      );

      if (!categoryExists) {
        return res.status(404).json({
          status: false,
          message: "Category not found",
        });
      }

      updateData.m_class_category =
        req.body.m_class_category;
    }

    // =====================================
    // COURSE VALIDATION
    // =====================================
    if (isValidValue(req.body.m_class_course)) {
      if (
        !mongoose.Types.ObjectId.isValid(
          req.body.m_class_course,
        )
      ) {
        return res.status(400).json({
          status: false,
          message: "Invalid course id",
        });
      }

      const courseExists = await Course.findById(
        req.body.m_class_course,
      );

      if (!courseExists) {
        return res.status(404).json({
          status: false,
          message: "Course not found",
        });
      }

      updateData.m_class_course =
        req.body.m_class_course;
    }

    // =====================================
    // CHECK COURSE BELONGS TO CATEGORY
    // =====================================
    const finalCategory =
      req.body.m_class_category ||
      existingClass.m_class_category;

    const finalCourse =
      req.body.m_class_course ||
      existingClass.m_class_course;

    if (
      finalCategory &&
      finalCourse
    ) {
      const courseData = await Course.findById(
        finalCourse,
      );

      if (!courseData) {
        return res.status(404).json({
          status: false,
          message: "Course not found",
        });
      }

      if (
        courseData.m_course_category?.toString() !==
        finalCategory.toString()
      ) {
        return res.status(400).json({
          status: false,
          message:
            "Selected course does not belong to selected category",
        });
      }
    }

    // =====================================
    // OTHER FIELDS
    // =====================================
    if (isValidValue(req.body.m_class_link)) {
      updateData.m_class_link =
        req.body.m_class_link;
    }

    if (isValidValue(req.body.m_class_intro)) {
      updateData.m_class_intro =
        req.body.m_class_intro;
    }

    if (isValidValue(req.body.m_class_description)) {
      updateData.m_class_description =
        req.body.m_class_description;
    }

    if (isValidValue(req.body.m_class_status)) {
      updateData.m_class_status = Number(
        req.body.m_class_status,
      );
    }

    // =====================================
    // UPDATE CLASS
    // =====================================
    const updatedClass =
      await Classes.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        },
      );

    return res.status(200).json({
      status: true,
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// =====================================
// GET ALL CLASSES
// =====================================
const getAllClasses = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    // =====================================
    // FILTER
    // =====================================
    const filter = {};

    if (isValidValue(search)) {
      filter.m_class_name = {
        $regex: search,
        $options: "i",
      };
    }

    // =====================================
    // TOTAL
    // =====================================
    const total = await Classes.countDocuments(
      filter,
    );

    // =====================================
    // GET DATA
    // =====================================
    const classes = await Classes.find(filter)
      .populate(
        "m_class_category",
        "m_category_name",
      )
      .populate(
        "m_class_course",
        "m_course_title",
      )
      .select(
        `
        m_class_name
        m_class_link
        m_class_category
        m_class_course
        m_class_status
        createdAt
      `,
      )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      status: true,
      message: "Classes fetched successfully",
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: classes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// =====================================
// GET SINGLE CLASS
// =====================================
const getSingleClass = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALID ID
    // =====================================
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid class id",
      });
    }

    // =====================================
    // FIND CLASS
    // =====================================
    const singleClass = await Classes.findById(id)
      .populate(
        "m_class_category",
        "m_category_name",
      )
      .populate(
        "m_class_course",
        "m_course_title",
      );

    if (!singleClass) {
      return res.status(404).json({
        status: false,
        message: "Class not found",
      });
    }

    return res.status(200).json({
      status: true,
      data: singleClass,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// =====================================
// DELETE CLASS
// =====================================
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // VALID ID
    // =====================================
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid class id",
      });
    }

    // =====================================
    // FIND CLASS
    // =====================================
    const existingClass = await Classes.findById(
      id,
    );

    if (!existingClass) {
      return res.status(404).json({
        status: false,
        message: "Class not found",
      });
    }

    // =====================================
    // DELETE CLASS
    // =====================================
    await Classes.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addClass,
  updateClass,
  getAllClasses,
  getSingleClass,
  deleteClass,
};