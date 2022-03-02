import mongoose from "mongoose";

const gradeEntry = mongoose.Schema({
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    grade: { type: Number, required: true }
});

const gradeSheetSchema = mongoose.Schema({
    deliverable: { type: String, required: true },
    courseId: { type: String, required: true },
    students: [gradeEntry]
});

export default mongoose.model("gradeSheet", gradeSheetSchema);

