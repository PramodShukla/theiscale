const Job = require("../models/company_requirement");
const JobApplication = require("../models/company_requirement_application");
const fs = require("fs");

const addJob = async (req, res) => {
  try {
    const jobData = {
      job_title: req.body.job_title,

      company_name: req.body.company_name,

      company_logo: req.files?.company_logo?.[0]?.path || req.body.company_logo,

      last_date_to_apply: req.body.last_date_to_apply || null,

      recruiter_mobile_no: req.body.recruiter_mobile_no || null,

      recruiter_whatsapp_no: req.body.recruiter_whatsapp_no || null,

      recruiter_date: req.body.recruiter_date || null,

      recruiter_expire_date: req.body.recruiter_expire_date || null,

      job_locations: req.body.location || [],

      salary: {
        min: req.body.salary_from || 0,
        max: req.body.salary_to || 0,
      },

      salary_type: req.body.salary_type || "PM",

      experience: req.body.experience || null,

      job_description: req.body.job_description,

      application_link: req.body.apply_link,

      company_social_links: {
        linkedin: req.body.social_links?.linkedin,
        website: req.body.social_links?.website,
        twitter: req.body.social_links?.twitter,
        instagram: req.body.social_links?.instagram,
      },
      order: req.body.order || 0,

      status: req.body.status || "open",
    };

    const job = await Job.create(jobData);

    res.status(201).json({
      status: true,
      message: "Job created",
      data: job,
    });
  } catch (err) {
    if (req.files?.company_logo?.[0]?.path) {
      fs.unlink(req.files.company_logo[0].path, (unlinkErr) => {
        if (unlinkErr) {
          console.log("File delete error:", unlinkErr.message);
        }
      });
    }

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      location,
      minSalary,
      maxSalary,
      exp,
    } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    let filter = { status: "open" };

    // LOCATION FILTER
    if (location) {
      filter.job_locations = {
        $elemMatch: {
          $regex: location,
          $options: "i", // case-insensitive
        },
      };
    }
    // SALARY FILTER
    if (minSalary || maxSalary) {
      filter["salary.min"] = { $gte: Number(minSalary || 0) };
      filter["salary.max"] = { $lte: Number(maxSalary || 99999999) };
    }

    // EXPERIENCE FILTER (months)
    if (exp) {
      filter["experience.max"] = { $gte: Number(exp) };
    }

    const total = await Job.countDocuments(filter);

    const data = await Job.find(filter)
      .select(
        "company_logo job_title company_name salary salary_type job_locations experience order",
      )
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      status: true,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job not found",
      });
    }

    res.json({
      status: true,
      data: job,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    const oldLogo = job.company_logo;

    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job not found",
      });
    }

    if ("salary_from" in req.body) {
      job.salary.min = req.body.salary_from || 0;
    }

    if ("salary_to" in req.body) {
      job.salary.max = req.body.salary_to || 0;
    }

    if ("salary_type" in req.body) {
      job.salary_type = req.body.salary_type || "PM";
    }

    if ("experience" in req.body) {
      job.experience = req.body.experience || null;
    }

    // normal fields
    if (req.body.job_title) job.job_title = req.body.job_title;
    if (req.body.company_name) job.company_name = req.body.company_name;
    if (req.body.job_description)
      job.job_description = req.body.job_description;
    if (req.body.apply_link) job.application_link = req.body.apply_link;

    if (req.body.recruiter_mobile_no) {
      job.recruiter_mobile_no = req.body.recruiter_mobile_no;
    }

    if (req.body.recruiter_whatsapp_no) {
      job.recruiter_whatsapp_no = req.body.recruiter_whatsapp_no;
    }

    if (req.body.recruiter_date) {
      job.recruiter_date = req.body.recruiter_date;
    }

    if (req.body.recruiter_expire_date) {
      job.recruiter_expire_date = req.body.recruiter_expire_date;
    }

    if (req.body.last_date_to_apply) {
      job.last_date_to_apply = req.body.last_date_to_apply;
    }

    // locations
    if (req.body.location) {
      job.job_locations = Array.isArray(req.body.location)
        ? req.body.location
        : [req.body.location];
    }

    //  logo update (important)
    if (req.files?.company_logo) {
      job.company_logo = req.files.company_logo[0].path;
    }

    if ("order" in req.body) {
      job.order = req.body.order || 0;
    }
    if ("status" in req.body) {
      job.status = req.body.status || "open";
    }

    job.updated_at = new Date();

    const updated = await job.save();

    if (req.files?.company_logo && oldLogo && fs.existsSync(oldLogo)) {
      fs.unlink(oldLogo, (err) => {
        if (err) {
          console.log("Old image delete error:", err.message);
        }
      });
    }

    res.json({
      status: true,
      message: "Updated successfully",
      data: updated,
    });
  } catch (err) {
    if (req.files?.company_logo?.[0]?.path) {
      fs.unlink(req.files.company_logo[0].path, (unlinkErr) => {
        if (unlinkErr) {
          console.log("File delete error:", unlinkErr.message);
        }
      });
    }

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job not found",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({
        status: false,
        message: "jobId required",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job not found",
      });
    }

    const exists = await JobApplication.findOne({
      job_id: jobId,
      user_id: req.user.id, // req.user._id nahi, token me id hai
    });

    if (exists) {
      return res.status(400).json({
        status: false,
        message: "Already applied",
      });
    }

    const application = await JobApplication.create({
      job_id: jobId,
      user_id: req.user.id,
    });

    res.json({
      status: true,
      message: "Applied successfully",
      data: application,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const getAllUniqueJobTitles = async (req, res) => {
  try {
    const data = await Job.distinct("job_title", {
      status: "open",
    });

    return res.status(200).json({
      status: true,

      total: data.length,

      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

const changeJobStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job not found",
      });
    }

    job.status = job.status === "open" ? "closed" : "open";

    job.updated_at = new Date();

    await job.save();

    return res.status(200).json({
      status: true,
      message: `Job status changed to ${job.status}`,
      data: job.status,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyJob,
  getAllUniqueJobTitles,
  changeJobStatus
};
