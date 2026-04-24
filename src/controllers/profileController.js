const Candidate = require("../models/master_candidates_tbl");

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware

    const user = await Candidate.findById(userId);

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      status: true,
      data: {
        registrationDate: user.c_register_date,
        firstName: user.c_first_name,
        lastName: user.c_last_name,
        parentName: user.c_user_parent,
        mobileNumber: user.c_contact,
        altMobileNumber: user.c_alt_contact,
        whatsappNumber: user.c_whatsapp,
        email: user.c_email,
        dob: user.c_dob,
        gender: user.c_gender,
        state: user.c_current_state,
        city: user.c_current_city,
        pincode: user.c_current_pincode,
        address: `${user.c_current_address1} ${user.c_current_address2}`,
        occupation: user.m_occupation,
        biography: user.c_bio,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};