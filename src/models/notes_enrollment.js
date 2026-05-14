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
  type: String,
  enum: ["active", "inactive"],
  default: "active",
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
