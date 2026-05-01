const Job = require("../models/company_requirement");
const JobApplication = require("../models/company_requirement_application");

// ===============================
// ADD JOB
// ===============================
const addJob = async (req, res) => {
  try {
    const jobData = {
      job_title: req.body.job_title,
      company_name: req.body.company_name,

      company_logo: req.files?.company_logo?.[0]?.path || req.body.company_logo,

      job_locations: req.body.location || [],

      salary: {
        min: req.body.salary?.min,
        max: req.body.salary?.max,
      },

      salary_type:
        req.body.salary?.type === "monthly" ? "per_month" : "per_annum",

      experience: {
        min: req.body.experience?.min,
        max: req.body.experience?.max,
        label: req.body.experience?.unit,
      },

      job_description: req.body.job_description,

      application_link: req.body.apply_link,

      company_social_links: {
        linkedin: req.body.social_links?.linkedin,
        website: req.body.social_links?.website,
        twitter: req.body.social_links?.twitter,
        instagram: req.body.social_links?.instagram,
      },

      status: 1,
    };

    const job = await Job.create(jobData);

    res.status(201).json({
      status: true,
      message: "Job created",
      data: job,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// GET ALL JOBS (FILTER + PAGINATION)
// ===============================
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

    let filter = { status: 1 };

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
        "company_logo job_title company_name salary job_locations experience",
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

// ===============================
// GET JOB BY ID
// ===============================
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

// ===============================
// UPDATE JOB
// ===============================
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job not found",
      });
    }

    // 🔥 FIX START

    if (req.body.salary) {
      const salary = JSON.parse(req.body.salary);

      job.salary = {
        min: salary.min,
        max: salary.max,
      };

      job.salary_type = salary.type === "monthly" ? "per_month" : "per_annum";
    }

    if (req.body.experience) {
      const exp = JSON.parse(req.body.experience);

      job.experience = {
        min: exp.min,
        max: exp.max,
        label: exp.unit,
      };
    }

    // normal fields
    if (req.body.job_title) job.job_title = req.body.job_title;
    if (req.body.company_name) job.company_name = req.body.company_name;
    if (req.body.job_description)
      job.job_description = req.body.job_description;
    if (req.body.apply_link) job.application_link = req.body.apply_link;

    // locations
    if (req.body.location) {
      job.job_locations = Array.isArray(req.body.location)
        ? req.body.location
        : [req.body.location];
    }

    // 🔥 logo update (important)
    if (req.files?.company_logo) {
      job.company_logo = req.files.company_logo[0].path;
    }

    job.updated_at = new Date();

    const updated = await job.save();

    res.json({
      status: true,
      message: "Updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// DELETE JOB
// ===============================
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

// ===============================
// APPLY JOB (LOGIN REQUIRED - middleware se control)
// ===============================
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({
        status: false,
        message: "jobId required",
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

module.exports = {
  addJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyJob,
};
