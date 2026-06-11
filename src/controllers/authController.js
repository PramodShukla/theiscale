const Candidate = require("../models/candidates");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateTokenUser } = require("../utils/token");


// REGISTER
exports.register = async (req, res) => {
  try {
    const { fname, lname, email, password, contact, whatsapp, gender } = req.body;

    if (!fname || !lname || !email || !password || !contact || !whatsapp || !gender) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    const existingUser = await Candidate.findOne({ c_email: email });
    if (existingUser) {
      return res.status(400).send({
        status: false,
        message: "User already exists",
      });
    }

    //  HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Candidate.create({
      candidate_idno: Date.now().toString(),
      c_register_date: new Date(),

      c_first_name: fname,
      c_last_name: lname,
      c_display_name: fname,

      c_email: email,
      c_password: hashedPassword,
      c_password_update: 0,

      c_contact: contact,
      c_alt_contact: contact,

      c_fcm_id: "NA",
      c_user_session_token: "NA",
      c_user_otp: "0000",

      c_user_status: 1,

      c_whatsapp: whatsapp,
      c_gender: gender,
      c_dob: null,
      c_age: 0,

      c_bio: "NA",
      m_occupation: "NA",

      c_guardian: "NA",

      c_current_address1: "NA",
      c_current_address2: "NA",

      c_current_country: 0,
      c_current_state: null,
      c_current_city: null,
      c_current_district: "NA",
      c_current_area: 0,
      c_current_pincode: "000000",

      c_permanent_address1: "NA",
      c_permanent_address2: "NA",
      c_permanent_state: "NA",
      c_permanent_city: "NA",
      c_permanent_pincode: "000000",

      c_category: "NA",

      c_governmentId_number: "NA",
      c_pan_number: "NA",

      c_idProof_image: "NA",
      c_idProof_type: "NA",

      c_profile_image: "NA",
      c_sign_image: "NA",

      remember_token: "NA",

      c_mobile_verified: 0,
      c_email_verified: 0,

      c_user_wallet_amount: 0,
      c_user_wallet_added: 0,
      c_user_wallet_winings: 0,

      //  remaining required fields dummy fill
      c_number1: "NA",
      c_number2: "NA",
      c_number3: "NA",
      c_email1: "NA",
      c_email2: "NA",
      c_email3: "NA",
      c_novisits: 0,
      address_type: 0,
      notify_date: new Date(),
      is_subscribe: 0,
      subscription_end: new Date(),
      next_apply_date: new Date(),
      c_user_parent: "NA",
      m_parent_mobile: 0,
      m_roll_number: "NA",
      m_father_name: "NA",
      m_mother_name: "NA",
      m_f_occupation: "NA",
      m_m_occupation: "NA",
      m_blood_group: "NA",
      c_adhar_no: "NA",
      c_adhar_file: "NA",
      c_pan_no: "NA",
      c_pan_file: "NA",
      c_upi_id: "NA",
      c_assign_batch: 0,
      c_user_refer_by: null,
      c_user_referal_code: "NA",
      c_user_refered_users: 0,
    });

    res.status(201).send({
      status: true,
      message: "User registered successfully",
      // data: user,
    });

  } catch (e) {
    console.log(e);
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

//  LOGIN
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