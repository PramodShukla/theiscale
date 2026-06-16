const Candidate = require("../models/candidates");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateTokenUser } = require("../utils/token");
// const Candidate = require("../models/candidate");
const sendSms = require("../utils/sendSms");
const { generateResetToken, generateRegisterToken } = require("../utils/token");

// REGISTER
// exports.register = async (req, res) => {
//   try {
//     const { fname, lname, email, password, contact, whatsapp, gender } =
//       req.body;

//     if (
//       !fname ||
//       !lname ||
//       !email ||
//       !password ||
//       !contact ||
//       !whatsapp ||
//       !gender
//     ) {
//       return res.status(400).send({
//         status: false,
//         message: "All fields are required",
//       });
//     }

//     const existingUser = await Candidate.findOne({ c_email: email });
//     if (existingUser) {
//       return res.status(400).send({
//         status: false,
//         message: "User already exists",
//       });
//     }

//     //  HASH PASSWORD
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await Candidate.create({
//       candidate_idno: Date.now().toString(),
//       c_register_date: new Date(),

//       c_first_name: fname,
//       c_last_name: lname,
//       c_display_name: fname,

//       c_email: email,
//       c_password: hashedPassword,
//       c_password_update: 0,

//       c_contact: contact,
//       c_alt_contact: contact,

//       c_fcm_id: "NA",
//       c_user_session_token: "NA",
//       c_user_otp: "0000",

//       c_user_status: 1,

//       c_whatsapp: whatsapp,
//       c_gender: gender,
//       c_dob: null,
//       c_age: 0,

//       c_bio: "NA",
//       m_occupation: "NA",

//       c_guardian: "NA",

//       c_current_address1: "NA",
//       c_current_address2: "NA",

//       c_current_country: 0,
//       c_current_state: null,
//       c_current_city: null,
//       c_current_district: "NA",
//       c_current_area: 0,
//       c_current_pincode: "000000",

//       c_permanent_address1: "NA",
//       c_permanent_address2: "NA",
//       c_permanent_state: "NA",
//       c_permanent_city: "NA",
//       c_permanent_pincode: "000000",

//       c_category: "NA",

//       c_governmentId_number: "NA",
//       c_pan_number: "NA",

//       c_idProof_image: "NA",
//       c_idProof_type: "NA",

//       c_profile_image: "NA",
//       c_sign_image: "NA",

//       remember_token: "NA",

//       c_mobile_verified: 0,
//       c_email_verified: 0,

//       c_user_wallet_amount: 0,
//       c_user_wallet_added: 0,
//       c_user_wallet_winings: 0,

//       //  remaining required fields dummy fill
//       c_number1: "NA",
//       c_number2: "NA",
//       c_number3: "NA",
//       c_email1: "NA",
//       c_email2: "NA",
//       c_email3: "NA",
//       c_novisits: 0,
//       address_type: 0,
//       notify_date: new Date(),
//       is_subscribe: 0,
//       subscription_end: new Date(),
//       next_apply_date: new Date(),
//       c_user_parent: "NA",
//       m_parent_mobile: 0,
//       m_roll_number: "NA",
//       m_father_name: "NA",
//       m_mother_name: "NA",
//       m_f_occupation: "NA",
//       m_m_occupation: "NA",
//       m_blood_group: "NA",
//       c_adhar_no: "NA",
//       c_adhar_file: "NA",
//       c_pan_no: "NA",
//       c_pan_file: "NA",
//       c_upi_id: "NA",
//       c_assign_batch: 0,
//       c_user_refer_by: null,
//       c_user_referal_code: "NA",
//       c_user_refered_users: 0,
//     });

//     res.status(201).send({
//       status: true,
//       message: "User registered successfully",
//       // data: user,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({
//       status: false,
//       message: e.message,
//     });
//   }
// };
// exports.register = async (req, res) => {
//   try {
//     const { fname, lname, email, password, whatsapp, gender } = req.body;

//     const mobile = req.registerUser.mobile;

//     const existingEmail = await Candidate.findOne({
//       c_email: email,
//     });

//     if (existingEmail) {
//       return res.status(400).json({
//         status: false,
//         message: "Email already registered",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await Candidate.findOneAndUpdate(
//       {
//         c_contact: mobile,
//       },
//       {
//         candidate_idno: Date.now().toString(),

//         c_register_date: new Date(),

//         c_first_name: fname,
//         c_last_name: lname,
//         c_display_name: fname,

//         c_email: email,
//         c_password: hashedPassword,

//         c_contact: mobile,
//         c_alt_contact: mobile,

//         c_whatsapp: whatsapp,

//         c_gender: gender,

//         c_mobile_verified: 1,
//         c_user_status: 1,

//         c_user_otp: null,
//         c_otp_expiry: null,
//       },
//       {
//         new: true,
//       },
//     );

//     return res.status(201).json({
//       status: true,
//       message: "Registration successful",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

// exports.sendRegisterOtp = async (req, res) => {
//   try {
//     const { mobile } = req.body;

//     if (!mobile) {
//       return res.status(400).json({
//         status: false,
//         message: "Mobile number required",
//       });
//     }

//     const existingUser = await Candidate.findOne({
//       c_contact: mobile,
//     });

//     if (existingUser) {
//       return res.status(200).json({
//         status: false,
//         action: "login",
//         message: "Mobile number already registered. Please login.",
//       });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     const message = `${otp} is the OTP to authenticate login credential. Do not share with anyone. - The iScale`;

//     await sendSms(message, mobile, "1307173398514201568");

//     await Candidate.updateOne(
//       { c_contact: mobile },
//       {
//         c_user_otp: otp,
//         c_otp_expiry: new Date(Date.now() + 5 * 60 * 1000),
//       },
//       { upsert: true },
//     );

//     return res.status(200).json({
//       status: true,
//       message: "OTP sent successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

// exports.verifyRegisterOtp = async (req, res) => {
//   try {
//     const { mobile, otp } = req.body;

//     const user = await Candidate.findOne({
//       c_contact: mobile,
//     });

//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "OTP not found",
//       });
//     }

//     if (user.c_user_otp !== otp) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid OTP",
//       });
//     }

//     if (!user.c_otp_expiry || user.c_otp_expiry < new Date()) {
//       return res.status(400).json({
//         status: false,
//         message: "OTP expired",
//       });
//     }

//     const registerToken = generateRegisterToken(mobile);

//     return res.status(200).json({
//       status: true,
//       message: "OTP verified",
//       registerToken,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };


// //  LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Candidate.findOne({ c_email: email });

    if (!user) {
      return res.status(400).send({
        status: false,
        message: "User not found",
      });
    }

    //  bcrypt compare
    const isMatch = await bcrypt.compare(password, user.c_password);

    if (!isMatch) {
      return res.status(400).send({
        status: false,
        message: "Invalid password",
      });
    }

    // Generate token for user
    const token = generateTokenUser(user);

    res.status(200).send({
      status: true,
      message: "Login successful",
      token: token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

// exports.sendOtp = async (req, res) => {
//   try {
//     const { mobile } = req.body;

//     const user = await Candidate.findOne({
//       c_contact: mobile,
//     });

//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "User not found",
//       });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.c_user_otp = otp;

//     user.c_otp_expiry = new Date(Date.now() + 5 * 60 * 1000);

//     await user.save();

//     const message = `${otp} is the OTP to authenticate login credential. Do not share with anyone. - The iScale`;

//     await sendSms(message, mobile, "1307173398514201568");

//     return res.status(200).json({
//       status: true,
//       message: "OTP sent successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

// exports.verifyOtp = async (req, res) => {
//   try {
//     const { mobile, otp } = req.body;

//     const user = await Candidate.findOne({
//       c_contact: mobile,
//     });

//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "User not found",
//       });
//     }

//     if (user.c_user_otp !== otp) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid OTP",
//       });
//     }

//     if (!user.c_otp_expiry || user.c_otp_expiry < new Date()) {
//       return res.status(400).json({
//         status: false,
//         message: "OTP expired",
//       });
//     }

//     const token = generateTokenUser(user);

//     user.c_user_otp = null;
//     user.c_otp_expiry = null;

//     await user.save();

//     return res.status(200).json({
//       status: true,
//       message: "Login successful",
//       token,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

exports.sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({
        status: false,
        message: "Mobile number required",
      });
    }

    let user = await Candidate.findOne({
      c_contact: mobile,
    });

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Existing User
    if (user) {
      user.c_user_otp = otp;
      user.c_otp_expiry = new Date(
        Date.now() + 5 * 60 * 1000
      );

      await user.save();
    }

    // New User
    else {
      user = await Candidate.create({
        c_contact: mobile,
        c_user_otp: otp,
        c_otp_expiry: new Date(
          Date.now() + 5 * 60 * 1000
        ),
      });
    }

    const message =
      `${otp} is the OTP to authenticate login credential. Do not share with anyone. - The iScale`;

    await sendSms(
      message,
      mobile,
      "1307173398514201568"
    );

    return res.status(200).json({
      status: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

    return res.status(500).json({
      status: false,
      message: error.message,
    });

  }
};

exports.verifyOtp = async (req, res) => {
  try {

    const { mobile, otp } = req.body;

    const user = await Candidate.findOne({
      c_contact: mobile,
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (user.c_user_otp !== otp) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    if (
      !user.c_otp_expiry ||
      user.c_otp_expiry < new Date()
    ) {
      return res.status(400).json({
        status: false,
        message: "OTP expired",
      });
    }

    // OTP clear
    user.c_user_otp = null;
    user.c_otp_expiry = null;

    await user.save();

    // Existing Registered User
    if (
      user.c_first_name &&
      user.c_email
    ) {

      const token =
        generateTokenUser(user);

      return res.status(200).json({
        status: true,
        action: "login",
        message: "Login successful",
        token,
      });
    }

    // New User
    const registerToken =
      generateRegisterToken(mobile);

    return res.status(200).json({
      status: true,
      action: "register",
      message: "Complete registration",
      registerToken,
    });

  } catch (error) {

    return res.status(500).json({
      status: false,
      message: error.message,
    });

  }
};

exports.register = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      whatsapp,
      gender,
    } = req.body;

    const mobile = req.registerUser.mobile;

    if (
      !fname ||
      !lname ||
      !email ||
      !whatsapp ||
      !gender
    ) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // Mobile se temporary user find karo
    const user = await Candidate.findOne({
      c_contact: mobile,
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Already registered check
    if (user.c_first_name) {
      return res.status(400).json({
        status: false,
        message: "User already registered",
      });
    }

    // Email duplicate check
    const existingEmail =
      await Candidate.findOne({
        c_email: email,
      });

    if (existingEmail) {
      return res.status(400).json({
        status: false,
        message: "Email already registered",
      });
    }

    // Update User
    user.c_first_name = fname;
    user.c_last_name = lname;
    user.c_display_name = fname;

    user.c_email = email;

    user.c_whatsapp = whatsapp;
    user.c_gender = gender;

    user.c_mobile_verified = 1;
    user.c_user_status = 1;

    user.c_register_date = new Date();
    user.candidate_idno =
      Date.now().toString();

    await user.save();

    // Direct Login Token
    const token =
      generateTokenUser(user);

    return res.status(201).json({
      status: true,
      message:
        "Registration successful",
      token,
    });

  } catch (error) {

    return res.status(500).json({
      status: false,
      message: error.message,
    });

  }
};


// Forget password
exports.sendForgotPasswordOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    const user = await Candidate.findOne({
      c_contact: mobile,
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.c_user_otp = otp;

    user.c_otp_expiry = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    // const message =
    //   `${otp} is the OTP to reset your password. Do not share with anyone. - The iScale`;

    const message = `${otp} is the OTP to authenticate login credential. Do not share with anyone. - The iScale`;

    await sendSms(message, mobile, "1307173398514201568");

    // console.log("SMS RESPONSE =>", smsResponse);

    return res.status(200).json({
      status: true,
      message: "OTP sent successfully for forget passsword",
      // smsResponse,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const user = await Candidate.findOne({
      c_contact: mobile,
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (user.c_user_otp !== otp) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    if (!user.c_otp_expiry || user.c_otp_expiry < new Date()) {
      return res.status(400).json({
        status: false,
        message: "OTP expired",
      });
    }

    const resetToken = generateResetToken(user);

    return res.status(200).json({
      status: true,
      message: "OTP verified successfully",
      resetToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirm_password } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({
        status: false,
        message: "Password and Confirm Password do not match",
      });
    }

    const user = await Candidate.findById(req.resetUser.id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.c_password = hashedPassword;

    user.c_password_update = 1;

    user.c_user_otp = null;
    user.c_otp_expiry = null;

    await user.save();

    return res.status(200).json({
      status: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// exports.applogin = async (req, res) => {
//   try {
//     const { user_mobile, user_pass } = req.body;

//     // Validation
//     if (!user_mobile || !user_pass) {
//       return res.status(400).json({
//         response: "error",
//         message: "user_mobile and user_pass are required",
//       });
//     }

//     // Mobile number se user find karo
//     const user = await Candidate.findOne({
//       c_contact: Number(user_mobile),
//     });

//     if (!user) {
//       return res.status(404).json({
//         response: "error",
//         message: "User not found",
//       });
//     }

//     // Password check
//     const isMatch = await bcrypt.compare(
//       user_pass,
//       user.c_password
//     );

//     if (!isMatch) {
//       return res.status(401).json({
//         response: "error",
//         message: "Invalid Password",
//       });
//     }

//     // Success Response
//     return res.status(200).json({
//       response: "success",
//       message: "Login Successfully",
//       user: [
//         {
//           c_id: user._id,
//           c_first_name: user.c_first_name,
//           c_email: user.c_email,
//           c_contact: String(user.c_contact),
//           c_gender: user.c_gender,
//           c_current_address1: user.c_current_address1,
//         },
//       ],
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       response: "error",
//       message: error.message,
//     });
//   }
// };
