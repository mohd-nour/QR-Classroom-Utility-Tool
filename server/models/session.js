import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  instituteId: { type: String },
});

const sessionSchema = mongoose.Schema({
  sessionNumber: { type: Number, required: true },
  classId: { type: String, required: true },
  attendedStudents: [studentSchema],
  finalized: { type: Boolean, default: false }
});

export default mongoose.model("Session", sessionSchema);
