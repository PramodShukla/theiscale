const mongoose = require("mongoose");

const notesEnrollmentSchema = new mongoose.Schema(
{
user_id: {
type: mongoose.Schema.Types.ObjectId,
ref: "candidates",
required: true,
},


notes_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "notes",
  required: true,
},

enrollment_status: {
  type: Number,
  enum: [0,1],
  default: 1,
},

access_type: {
  type: String,
  enum: ["lifetime", "limited"],
  default: "lifetime",
},

expiry_date: {
  type: Date,
  default: null,
},

enrolled_at: {
  type: Date,
  default: Date.now,
},


},
{
timestamps: true,
},
);

module.exports = mongoose.model(
"notes_enrollment",
notesEnrollmentSchema,
);
