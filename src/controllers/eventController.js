const Event = require("../models/event");
const slugify = require("slugify");
const fs = require("fs");


const deleteUploadedFiles = (files) => {
  if (!files) return;

  Object.values(files).forEach((fileArray) => {
    fileArray.forEach((file) => {
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
  });
};


const addEvent = async (req, res) => {
  try {
    const { m_event_title } = req.body;

    if (!m_event_title) {
      return res.status(400).json({
        status: false,
        message: "Event title is required",
      });
    }

    let slug = slugify(m_event_title, { lower: true, strict: true });

    const exists = await Event.findOne({ m_event_slug: slug });
    if (exists) {
      slug = `${slug}-${Date.now()}`;
    }

    const event = await Event.create({
      m_event_title,
      m_event_slug: slug,

      m_event_category: req.body.m_event_category?.trim(),

      m_event_date_start: req.body.m_event_date_start,
      m_event_date_end: req.body.m_event_date_end,

      m_event_time_start: req.body.m_event_time_start,
      m_event_time_end: req.body.m_event_time_end,

      m_event_skill_level: req.body.m_event_skill_level,
      m_event_certificate: req.body.m_event_certificate?.trim(),

      m_event_lang: req.body.m_event_lang,
      m_event_host: req.body.m_event_host,

      m_event_url: req.body.m_event_url,
      m_event_link: req.body.m_event_link,

      m_event_contact_no: req.body.m_event_contact_no,
      m_event_whatsapp_no: req.body.m_event_whatsapp_no,

      m_event_desc: req.body.m_event_desc,

      m_event_no_of_enroll: req.body.m_event_no_of_enroll,
      m_event_order: req.body.m_event_order,

      m_event_status: req.body.m_event_status?.trim() || "active",

      // FILES
      m_event_banner: req.files?.m_event_banner?.[0]?.path,
      m_event_file: req.files?.m_event_file?.[0]?.path,
    });

    res.json({
      status: true,
      message: "Event created",
      data: event,
    });

  } catch (err) {

    //  ERROR → FILE DELETE
    deleteUploadedFiles(req.files);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};


const getAllEvents = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      category,
      status,
    } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    let filter = {};

    // =========================
    // 🔍 SEARCH (title, host)
    // =========================
    if (search) {
      filter.$or = [
        { m_event_title: { $regex: search, $options: "i" } },
        { m_event_host: { $regex: search, $options: "i" } },
      ];
    }

    // =========================
    //  CATEGORY FILTER
    // =========================
    if (category) {
      filter.m_event_category = category;
    }

    // =========================
    //  STATUS FILTER
    // =========================
    if (status) {
      filter.m_event_status = status;
    }

    // =========================
    //  TOTAL COUNT
    // =========================
    const total = await Event.countDocuments(filter);

    // =========================
    //  FETCH DATA
    // =========================
    const data = await Event.find(filter)
      .populate("m_event_category", "m_ec_title")
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // =========================
    //  RESPONSE
    // =========================
    res.json({
      status: true,
      message: "Events fetched successfully",
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data,
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};


const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        status: false,
        message: "Event not found",
      });
    }

    Object.keys(req.body).forEach((key) => {
      event[key] = req.body[key];
    });

    //  banner update
    if (req.files?.m_event_banner) {
      if (event.m_event_banner && fs.existsSync(event.m_event_banner)) {
        fs.unlinkSync(event.m_event_banner);
      }
      event.m_event_banner = req.files.m_event_banner[0].path;
    }

    //  pdf update
    if (req.files?.m_event_file) {
      if (event.m_event_file && fs.existsSync(event.m_event_file)) {
        fs.unlinkSync(event.m_event_file);
      }
      event.m_event_file = req.files.m_event_file[0].path;
    }

    await event.save();

    res.json({
      status: true,
      message: "Updated successfully",
      data: event,
    });

  } catch (err) {

    //  ERROR → NEW FILE DELETE
    deleteUploadedFiles(req.files);

    res.status(500).json({ status: false, message: err.message });
  }
};


const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        status: false,
        message: "Event not found",
      });
    }

    //  delete files
    [event.m_event_banner, event.m_event_file].forEach((file) => {
      if (file && fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: "Deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};



const getAllEventsDropdown = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
    } = req.query;

    page = parseInt(page) || 1;

    limit = parseInt(limit) || 10;

    // ======================================
    // FILTER
    // ======================================

    const filter = {
      m_event_status: "active",
    };

    // ======================================
    // SEARCH
    // ======================================

    if (search) {
      filter.m_event_title = {
        $regex: search,
        $options: "i",
      };
    }

    // ======================================
    // TOTAL
    // ======================================

    const totalRecords =
      await Event.countDocuments(filter);

    // ======================================
    // DATA
    // ======================================

    const data = await Event.find(filter)
      .select(`
        _id
        m_event_title
      `)

      .sort({
        m_event_title: 1,
      })

      .skip((page - 1) * limit)

      .limit(limit)

      .lean();

    // ======================================
    // RESPONSE
    // ======================================

    return res.status(200).json({
      status: true,

      current_page: page,

      total_pages: Math.ceil(
        totalRecords / limit,
      ),

      total_records: totalRecords,

      has_more:
        page * limit < totalRecords,

      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getAllEventsDropdown,
};
  
