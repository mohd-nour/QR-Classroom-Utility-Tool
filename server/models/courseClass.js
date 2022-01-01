import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  courseName: String, //EECE
  courseNumber: Number, //502
  creator: String, //Dr. Ali El Hajj
  students: [String], //Array of enrolled students
  schedule: String,
  startTime: String, //Time of class
  endTime: String,
  sessions: [String] //Session
});

//Session {
// sessionNumber: 0 + 1
// attendance: [String] //Stores Student ID
// }

const courseClass = mongoose.model("courseClass", courseSchema);

export default courseClass;
