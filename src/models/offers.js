const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    m_offer_title: {
      type: String,
      required: true,
      trim: true,
    },

  

    m_offer_image: {
      type: String,
      default: null,
    },


    m_offer_des: {
      type: String,
      default: null,
      trim:true
    },

    

    m_offer_url: {
      type: String,
      default: null,
    },

   

    m_offer_priority: {
      type: Number,
      default: 0,
    },

    

    m_offer_started: {
      type: Date,
      default: null,
      trim:true
    },

    
    m_offer_status: {
      type: Number,
      enum: [0, 1],
      default: 1,
      // 1 = Active , 0 = Inactive
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "offers",
  offerSchema
);