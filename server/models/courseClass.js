import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  instituteId: { type: String },
});

const courseSchema = mongoose.Schema({
  courseName: String, //EECE
  courseNumber: Number, //502
  creator: String, //Dr. Ali El Hajj
  students: [userSchema], //Array of enrolled students
  schedule: String,
  startTime: String, //Time of class
  endTime: String,
  sessions: [String], //Session
});

//Session {
// sessionNumber: 0 + 1
// attendance: [String] //Stores Student ID
// }

const courseClass = mongoose.model("courseClass", courseSchema);

export default courseClass;
