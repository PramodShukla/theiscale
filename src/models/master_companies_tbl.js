const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  // comp_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  comp_unique_id: { type: String, required: true },

  comp_register_date: { type: Date, required: true },

  comp_recruiterName: { type: String, default: null },
  comp_recruiterEmail: { type: String, default: null },
  comp_recruiterContact: { type: Number, default: null },
  comp_recruiterDesignation: { type: String, default: null },

  comp_name: { type: String, default: null },
  comp_website: { type: String, default: null },
  comp_email: { type: String, default: null },
  comp_contact: { type: Number, default: null },

  comp_contact2: { type: Number, required: true },
  comp_landlinecode: { type: String, required: true },
  comp_landlinecode2: { type: String, required: true },

  comp_mobile: { type: Number, required: true },
  comp_password: { type: String, required: true },

  comp_ispassword_change: { type: Number, required: true, enum:[0,1] //0=no, 1=yes
   },

  comp_otp: { type: Number, required: true },

  comp_hrDepart_head: { type: String, required: true },
  comp_hrDepart_email: { type: String, default: null },
  comp_hrDepart_contact: { type: Number, default: null },
  comp_hrDepart_mobile: { type: Number, required: true },

  comp_owner_name: { type: String, required: true },

  comp_address: { type: String, default: null },

  company_state: { type: Number, required: true },
  company_city: { type: Number, required: true },

  company_area_pincode: { type: String, required: true },

  comp_description: { type: String, default: null },

  company_pan: { type: String, required: true },
  company_pancopy: { type: String, required: true },
  company_panname: { type: String, required: true },

  comp_organization_type: { type: String, required: true },
  comp_industry_type: { type: String, required: true },

  company_pandate: { type: Date, required: true },

  company_addreestype: { type: String, required: true },
  company_addressproof: { type: String, required: true },

  comp_address_verify: { type: Number, required: true, enum:[0,1,2,3] //0=pending, 1=submitted, 2=verified, 3=suspended    
  },

  comp_address_remark: { type: String, required: true },

  m_company_logo: { type: String, required: true },

  comp_jobDescription: { type: String, default: null },

  m_company_verified: { type: Number, required: true, enum:[0,1] //0=no, 1=yes0
  },
  m_company_profile: { type: Number, required: true, enum:[0,1] //0=not done, 1=done
  },
  m_compnay_job_status: { type: Number, required: true, enum:[0,1] //0=not done, 1=done 
   },

  comp_kyc_proof: { type: String, required: true },

  m_comp_iskycdone: { type: Number, required: true, enum:[0,1,2,3] //0=pending, 1=submitted, 2=verified, 3=suspended
  },

  digital_verification: { type: Number, required: true, enum:[0,1] //0=not done, 1=done
   },

  m_comp_kyc_remark: { type: String, required: true },

  comp_notify_date: { type: String, default: null }
});

module.exports = mongoose.model("master_companies tbl", companySchema);