import courseClass from "../models/courseClass.js";
import user from "../models/user.js";
import Session from "../models/session.js";
import mongoose from "mongoose";
//takes schema from models

//Logic for routes

export const getCourses = async (req, res) => {
  try {
    const currentUserUniqueId = req.params.id;
    const courses = await courseClass.find({ creator: currentUserUniqueId });

    res.status(200).json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  const course = req.body;

  const newCourse = new courseClass(course);

  try {
    await newCourse.save();

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const { id: _id } = req.params;
  const course = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No course with this ID");
  } else {
    const updatedCourse = await courseClass.findByIdAndUpdate(_id, course, {
      new: true,
    });
    res.json(updatedCourse);
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No course with this ID");
  } else {
    await courseClass.findByIdAndRemove(id);
    await Session.deleteMany({classId: id});
    res.json({ message: "Post deleted successfully" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await courseClass.findById(courseId);
    res.status(200).json(course.students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addStudent = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.params.studentId;
    const student = await user.findOne({ instituteId: studentId });
    if (student) {
      courseClass.updateOne(
        { _id: courseId },
        { $addToSet: { students: student } },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.status(200).json(student);
          }
        }
      );
    } else {
      res.send(err);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const removeStudent = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.params.studentId;
    const student = await user.findOne({ instituteId: studentId });
    if (student) {
      courseClass.updateOne(
        { _id: courseId },
        { $pull: { students: {"instituteId": studentId} } },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.status(200).json(student);
          }
        }
      );
    } else {
      res.send(err);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addSession = async (req, res) => {
  try {
    const courseId = req.params.classId;
    const course = await courseClass.findOne({ _id: courseId });
    if (course) {
      const currentSessionNumber = course.currentSession;
      const newSession = new Session({sessionNumber: currentSessionNumber, classId: courseId, attendedStudents: []});
      await newSession.save();
      courseClass.updateOne(
        { _id: courseId },
        { $addToSet: { sessions: {sessionNumber: currentSessionNumber, sessionUniqueId: newSession._id} }, $set: {currentSession: currentSessionNumber+1} },
        function (err, result) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            res.status(200).json(newSession);
          }
        }
      );
    }
    else {
      res.send(err);
    }
  } 
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSessions = async (req, res) => {
  try {
    const courseId = req.params.classId;
    const course = await courseClass.findById(courseId);
    res.status(200).json(course.sessions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

