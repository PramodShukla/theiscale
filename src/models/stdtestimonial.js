const mongoose = require("mongoose");

const StSchema = new mongoose.Schema({
  m_st_video: { type: String, default: null }, // uploaded video
  m_st_url: { type: String, default: null },   // youtube link

  // m_st_status: { 
  //   type: String, 
  //   default: "active",
  //   enum:["active","inactive"]
  // },

   m_st_status: { 
    type: Number, 
    default: 1,
    enum:[1,0]
  },

  m_st_added_on: { 
    type: Date, 
    default: Date.now 
  },

  m_st_updated_on: { 
    type: Date, 
    default: null 
  }
});

module.exports = mongoose.model("stdtestimonial", StSchema);  