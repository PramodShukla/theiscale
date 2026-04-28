const Lecture = require("../models/master_lecture_tbl");
const Subject = require("../models/master_subject_tbl");
const fs = require("fs");

// ===============================
// ADD TOPIC
// ===============================
const addTopic = async (req, res) => {
  try {
    const {
      ml_subject,
      ml_title,
      ml_code,
      ml_type,
      ml_status,
      ml_stype,
      ml_video_id
    } = req.body;

    if (!ml_subject || !ml_title) {
      return res.status(400).json({
        status: false,
        message: "Subject and title are required",
      });
    }

    const subject = await Subject.findById(ml_subject);
    if (!subject) {
      return res.status(404).json({
        status: false,
        message: "Subject not found",
      });
    }

    let videoFile = null;
    let pdfFile = null;

    if (req.files?.["ml_file"]) {
      videoFile = req.files["ml_file"][0].path;
    }

    if (req.files?.["ml_pdffile"]) {
      pdfFile = req.files["ml_pdffile"][0].path;
    }

    const newTopic = new Lecture({
      ml_subject,
      ml_title,
      ml_code,
      ml_type,
      ml_stype,
      ml_video_id: ml_video_id || "",
      ml_file: videoFile,
      ml_pdffile: pdfFile,
      ml_status: ml_status ? Number(ml_status) : 1,
      ml_added_on: new Date(),
    });

    const saved = await newTopic.save();

    res.status(201).json({
      status: true,
      message: "Topic added successfully",
      data: saved,
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


// ===============================
// GET TOPICS BY SUBJECT
// ===============================
const getTopicsBySubject = async (req, res) => {
  try {
    const { subject_id } = req.params;

    const data = await Lecture.find({
      ml_subject: subject_id,
    }).sort({ _id: -1 });

    res.json({
      status: true,
      data,
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


// ===============================
// UPDATE TOPIC
// ===============================
const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;

    const topic = await Lecture.findById(id);
    if (!topic) {
      return res.status(404).json({
        status: false,
        message: "Topic not found",
      });
    }

    const {
      ml_title,
      ml_code,
      ml_type,
      ml_status,
      ml_stype,
      ml_video_id
    } = req.body;

    // UPDATE FIELDS
    if (ml_title) topic.ml_title = ml_title;
    if (ml_code) topic.ml_code = ml_code;
    if (ml_type) topic.ml_type = ml_type;
    if (ml_stype) topic.ml_stype = ml_stype;
    if (ml_video_id) topic.ml_video_id = ml_video_id;
    if (ml_status !== undefined) topic.ml_status = Number(ml_status);

    // ===============================
    // FILE UPDATE
    // ===============================

    // VIDEO FILE
    if (req.files?.["ml_file"]) {
      if (topic.ml_file && fs.existsSync(topic.ml_file)) {
        fs.unlinkSync(topic.ml_file);
      }
      topic.ml_file = req.files["ml_file"][0].path;
    }

    // PDF FILE
    if (req.files?.["ml_pdffile"]) {
      if (topic.ml_pdffile && fs.existsSync(topic.ml_pdffile)) {
        fs.unlinkSync(topic.ml_pdffile);
      }
      topic.ml_pdffile = req.files["ml_pdffile"][0].path;
    }

    topic.ml_modified_on = new Date();

    const updated = await topic.save();

    res.json({
      status: true,
      message: "Topic updated successfully",
      data: updated,
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


// ===============================
// DELETE TOPIC
// ===============================
const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;

    const topic = await Lecture.findById(id);
    if (!topic) {
      return res.status(404).json({
        status: false,
        message: "Topic not found",
      });
    }

    if (topic.ml_file && fs.existsSync(topic.ml_file)) {
      fs.unlinkSync(topic.ml_file);
    }

    if (topic.ml_pdffile && fs.existsSync(topic.ml_pdffile)) {
      fs.unlinkSync(topic.ml_pdffile);
    }

    await Lecture.findByIdAndDelete(id);

    res.json({
      status: true,
      message: "Topic deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  addTopic,
  getTopicsBySubject,
  updateTopic,
  deleteTopic,
};