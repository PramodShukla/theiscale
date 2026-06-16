const axios = require("axios");

const sendSms = async (message, mobile, dltid) => {
  try {
    const response = await axios.post(
      "http://api.msg91.com/api/sendhttp.php",
      null,
      {
        params: {
          authkey: "306537AEgE6Y0PTXM85de4b274",
          mobiles: mobile,
          message,
          sender: "THEiSC",
          route: 4,
          DLT_TE_ID: dltid,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = sendSms;