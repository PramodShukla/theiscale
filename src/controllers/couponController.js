const Coupon = require("../models/coupon");

const Course = require("../models/course");
const TestPackage = require("../models/test_package");
const Notes = require("../models/notes");
const Webinar = require("../models/webinar");

const getAllCoupons = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      from_date,
      to_date,
      coupon_type,
      coupon_status,
      search = "",
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {};

    if (search) {
      filter.$or = [
        {
          coupon_code: {
            $regex: search,
            $options: "i",
          },
        },

        {
          coupon_title: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (from_date || to_date) {
      filter.coupon_start_date = {};

      if (from_date) {
        filter.coupon_start_date.$gte = new Date(from_date);
      }

      if (to_date) {
        filter.coupon_start_date.$lte = new Date(to_date);
      }
    }

    if (coupon_type) {
      filter.coupon_type = coupon_type;
    }

    if (coupon_status) {
      filter.coupon_status = coupon_status;
    }

    const total = await Coupon.countDocuments(filter);

    const coupons = await Coupon.find(filter)
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const finalData = await Promise.all(
      coupons.map(async (coupon) => {
        let typeData = null;
        let type_name = null;

        if (coupon.coupon_type === "course") {
          typeData = await Course.findById(coupon.coupon_type_id);

          type_name = typeData?.m_course_title || null;
        } else if (coupon.coupon_type === "testpackage") {
          typeData = await TestPackage.findById(coupon.coupon_type_id);

          type_name = typeData?.m_package_title || null;
        } else if (coupon.coupon_type === "notes") {
          typeData = await Notes.findById(coupon.coupon_type_id);

          type_name = typeData?.notes_name || null;
        } else if (coupon.coupon_type === "webinar") {
          typeData = await Webinar.findById(coupon.coupon_type_id);

          type_name = typeData?.m_webinar_title || null;
        }

        return {
          _id: coupon._id,

          coupon_code: coupon.coupon_code,

          coupon_title: coupon.coupon_title,

          coupon_type: coupon.coupon_type,

          type_name,

          total_coupon: coupon.total_coupon,

          used_coupon: coupon.used_coupon,

          coupon_min_amount: coupon.coupon_min_amount,

          coupon_max_amount: coupon.coupon_max_amount,

          coupon_discount: coupon.coupon_discount,

          coupon_discount_type: coupon.coupon_discount_type,

          coupon_start_date: coupon.coupon_start_date,

          coupon_end_date: coupon.coupon_end_date,

          coupon_visible: coupon.coupon_visible,

          coupon_status: coupon.coupon_status,

          type_data: typeData
            ? {
                _id: typeData._id,
                name: type_name,
              }
            : null,
        };
      }),
    );

    res.json({
      status: true,

      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },

      data: finalData,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const getSingleCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        status: false,
        message: "Coupon not found",
      });
    }

    let typeData = null;
    let type_name = null;

    if (coupon.coupon_type === "course") {
      typeData = await Course.findById(coupon.coupon_type_id);

      type_name = typeData?.m_course_title || null;
    } else if (coupon.coupon_type === "testpackage") {
      typeData = await TestPackage.findById(coupon.coupon_type_id);

      type_name = typeData?.m_package_title || null;
    } else if (coupon.coupon_type === "notes") {
      typeData = await Notes.findById(coupon.coupon_type_id);

      type_name = typeData?.notes_name || null;
    } else if (coupon.coupon_type === "webinar") {
      typeData = await Webinar.findById(coupon.coupon_type_id);

      type_name = typeData?.m_webinar_title || null;
    }

    res.json({
      status: true,

      data: {
        ...coupon.toObject(),

        type_data: typeData
          ? {
              _id: typeData._id,
              name: type_name,
            }
          : null,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const addCoupon = async (req, res) => {
  try {
    const { coupon_title } = req.body;

    if (!coupon_title) {
      return res.status(400).json({
        status: false,
        message: "Coupon title is required",
      });
    }

    const data = await Coupon.create({
      coupon_code: req.body.coupon_code,

      coupon_title,

      coupon_type: req.body.coupon_type,

      coupon_type_id: req.body.coupon_type_id,

      coupon_discount_type: req.body.coupon_discount_type,

      coupon_discount: req.body.coupon_discount || 0,

      coupon_min_amount: req.body.coupon_min_amount || 0,

      coupon_max_amount: req.body.coupon_max_amount || 0,

      coupon_start_date: req.body.coupon_start_date,

      coupon_end_date: req.body.coupon_end_date,

      coupon_details: req.body.coupon_details,

      total_coupon: req.body.total_coupon || 0,

      coupon_visible: req.body.coupon_visible || "yes",

      coupon_status: req.body.coupon_status || "active",
    });

    res.json({
      status: true,
      message: "Coupon added successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        status: false,
        message: "Coupon not found",
      });
    }

    Object.keys(req.body).forEach((key) => {
      coupon[key] = req.body[key];
    });

    await coupon.save();

    res.json({
      status: true,
      message: "Coupon updated successfully",
      data: coupon,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const changeCouponVisible = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        status: false,
        message: "Coupon not found",
      });
    }

    coupon.coupon_visible = coupon.coupon_visible === "yes" ? "no" : "yes";

    await coupon.save();

    res.json({
      status: true,
      message: "Visibility changed",
      data: coupon,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const changeCouponStatus = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        status: false,
        message: "Coupon not found",
      });
    }

    coupon.coupon_status =
      coupon.coupon_status === "active" ? "inactive" : "active";

    await coupon.save();

    res.json({
      status: true,
      message: "Status changed",
      data: coupon,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        status: false,
        message: "Coupon not found",
      });
    }

    await Coupon.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: "Coupon deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  addCoupon,
  updateCoupon,
  getSingleCoupon,
  getAllCoupons,
  changeCouponVisible,
  changeCouponStatus,
  deleteCoupon,
};
