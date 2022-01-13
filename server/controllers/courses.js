import courseClass from "../models/courseClass.js";
import user from "../models/user.js";
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
    res.json({ message: "Post deleted successfully" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await courseClass.findById(courseId);
    console.log(course.students);
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
    courseClass.updateOne(
      { _id: courseId },
      { $addToSet: { students: student } },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
    // res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
