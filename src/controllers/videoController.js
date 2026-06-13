const axios = require("axios");
const Lecture = require("../models/lecture");
const Enrollment = require("../models/course_enrollment");

const getVideoDetails = async (videoId) => {
  try {
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      {},
      {
        headers: {
          Authorization: `Apisecret ${process.env.VDOCIPHER_API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("VdoCipher Error:", error.response?.data || error.message);

    throw error;
  }
};

const playVideo = async (req, res) => {
  try {
    const { topic_id } = req.body;

    if (!topic_id) {
      return res.status(400).json({
        status: false,
        message: "topic_id is required",
      });
    }

    // GET LECTURE

    const lecture = await Lecture.findById(topic_id).populate(
      "ml_subject",
      "m_subject_title m_subject_course",
    );

    if (!lecture) {
      return res.status(404).json({
        status: false,
        message: "Lecture not found",
      });
    }

    // console.log("LECTURE =>", lecture._id);
    // console.log("YT TYPE =>", lecture.ml_yt_type);
    // console.log("VIDEO ID =>", lecture.ml_vdocipher_id);
    // console.log("FILE =>", lecture.ml_file);

    // SUBJECT CHECK

    const subject = lecture.ml_subject;

    if (!subject) {
      return res.status(404).json({
        status: false,
        message: "Subject not found",
      });
    }

    // COURSE CHECK

    const courseId = subject.m_subject_course;

    if (!courseId) {
      return res.status(400).json({
        status: false,
        message: "Course not linked with subject",
      });
    }

    // ENROLLMENT CHECK

    const enrollment = await Enrollment.findOne({
      user_id: req.user.id,
      course_id: courseId,
      status: "active",
    }).lean();

    // console.log("ENROLLMENT =>", enrollment);

    if (!enrollment) {
      return res.status(403).json({
        status: false,
        message: "You are not enrolled in this course",
      });
    }

    // PAYMENT CHECK

    if (
      enrollment.course_type === "paid" &&
      enrollment.payment_status !== "success"
    ) {
      return res.status(403).json({
        status: false,
        message: "Payment not completed",
      });
    }

    // EXPIRY CHECK

    if (
      enrollment.access_type === "limited" &&
      enrollment.expiry_date &&
      new Date() > new Date(enrollment.expiry_date)
    ) {
      return res.status(403).json({
        status: false,
        message: "Course access expired",
      });
    }

    // VDOCIPHER VIDEO

    if (Number(lecture.ml_yt_type) === 2) {
      const videoId = lecture.ml_vdocipher_id;

      if (!videoId) {
        return res.status(400).json({
          status: false,
          message: "VdoCipher Video ID not found",
        });
      }

      const videoDetails = await getVideoDetails(videoId);

      const src = `https://player.vdocipher.com/v2/?otp=${videoDetails.otp}&playbackInfo=${videoDetails.playbackInfo}`;

      return res.status(200).json({
        status: true,
        src,
        sub: subject.m_subject_title || "",
        topic: lecture.ml_title || "",
      });
    }

    // NORMAL VIDEO FILE

    if (lecture.ml_file) {
      return res.status(200).json({
        status: true,
        src: lecture.ml_file,
        sub: subject.m_subject_title || "",
        topic: lecture.ml_title || "",
      });
    }

    return res.status(400).json({
      status: false,
      message: "No video found for this lecture",
    });
  } catch (error) {
    console.error("PLAY VIDEO ERROR =>", error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  playVideo,
};
