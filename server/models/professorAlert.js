import mongoose from "mongoose";

const alertSchema = mongoose.Schema({
  message: { type: String, required: true },
  classId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  professorId: { type: String, required: true }
});


const ProfessorAlert = mongoose.model("ProfessorAlert", alertSchema);

export default ProfessorAlert;
