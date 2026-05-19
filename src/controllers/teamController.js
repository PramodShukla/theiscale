const fs = require("fs");
const path = require("path");

const Team = require("../models/our_teams");


// DELETE FILE HELPER

const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.log("File delete error:", error.message);
  }
};



const addTeam = async (req, res) => {
  try {
    const {
      member_name,
      member_position,
      member_expertise,
      member_experience,
      member_linkedin,
      member_bio,
      member_type,
      member_status,
      member_order,
    } = req.body;

    const uploadedImage =
      req.files?.member_image?.[0]?.filename || "";

    // validation
    if (!member_name) {
      if (uploadedImage) {
        deleteFile(path.join("src/uploads/team", uploadedImage));
      }

      return res.status(400).json({
        status: false,
        message: "Member name is required",
      });
    }

    const team = await Team.create({
      member_name,

      ...(member_position && {
        member_position,
      }),

      ...(member_expertise && {
        member_expertise,
      }),

      ...(member_experience && {
        member_experience,
      }),

      ...(member_linkedin && {
        member_linkedin,
      }),

      ...(member_bio && {
        member_bio,
      }),

      ...(member_type && {
        member_type,
      }),

      ...(member_status !== undefined && {
        member_status,
      }),

      ...(member_order && {
        member_order,
      }),

      ...(uploadedImage && {
        member_image: uploadedImage,
      }),
    });

    return res.status(201).json({
      status: true,
      message: "Team added successfully",
      data: team,
    });
  } catch (error) {
    if (req.files?.member_image?.[0]?.filename) {
      deleteFile(
        path.join(
          "src/uploads/team",
          req.files.member_image[0].filename
        )
      );
    }

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTeam = await Team.findById(id);

    const uploadedImage =
      req.files?.member_image?.[0]?.filename || "";

    if (!existingTeam) {
      if (uploadedImage) {
        deleteFile(path.join("src/uploads/team", uploadedImage));
      }

      return res.status(404).json({
        status: false,
        message: "Team member not found",
      });
    }

    const updateData = {};

    // only update incoming fields
    const fields = [
      "member_name",
      "member_position",
      "member_expertise",
      "member_experience",
      "member_linkedin",
      "member_bio",
      "member_type",
      "member_status",
      "member_order",
    ];

    fields.forEach((field) => {
      if (
        req.body[field] !== undefined &&
        req.body[field] !== ""
      ) {
        updateData[field] = req.body[field];
      }
    });

    // image update
    if (uploadedImage) {
      updateData.member_image = uploadedImage;
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    // delete old image after successful update
    if (
      uploadedImage &&
      existingTeam.member_image
    ) {
      deleteFile(
        path.join(
          "src/uploads/team",
          existingTeam.member_image
        )
      );
    }

    return res.status(200).json({
      status: true,
      message: "Team updated successfully",
      data: updatedTeam,
    });
  } catch (error) {
    // delete new uploaded image if error
    if (req.files?.member_image?.[0]?.filename) {
      deleteFile(
        path.join(
          "src/uploads/team",
          req.files.member_image[0].filename
        )
      );
    }

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


const getAllTeam = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search,
      type,
      status,
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

    // search
    if (search) {
      filter.$or = [
        {
          member_name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          member_position: {
            $regex: search,
            $options: "i",
          },
        },
        {
          member_expertise: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // type filter
    if (type !== undefined && type !== "") {
      filter.member_type = Number(type);
    }

    // status filter
    if (status !== undefined && status !== "") {
      filter.member_status = Number(status);
    }

    const total = await Team.countDocuments(filter);

    const team = await Team.find(filter)
      .select(
        "member_name member_position member_image member_expertise member_experience member_linkedin member_type member_status"
      )
      .sort({
        member_order: 1,
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      status: true,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: team,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


const getSingleTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({
        status: false,
        message: "Team member not found",
      });
    }

    return res.status(200).json({
      status: true,
      data: team,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


const getTeamDropdown = async (req, res) => {
  try {
    const { type } = req.query;

    const filter = {};

    if (type !== undefined && type !== "") {
      filter.member_type = Number(type);
    }

    const team = await Team.find(filter)
      .select("_id member_name")
      .sort({
        member_name: 1,
      });

    return res.status(200).json({
      status: true,
      data: team,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({
        status: false,
        message: "Team member not found",
      });
    }

    // delete image
    if (team.member_image) {
      deleteFile(
        path.join(
          "src/uploads/team",
          team.member_image
        )
      );
    }

    await Team.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addTeam,
  updateTeam,
  getAllTeam,
  getSingleTeam,
  getTeamDropdown,
  deleteTeam,
};