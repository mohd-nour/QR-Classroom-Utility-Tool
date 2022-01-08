import courseClass from "../models/courseClass.js";
import mongoose from "mongoose";
//takes schema from models

//Logic for routes

export const getCourses = async (req, res) => {
  try {
    const currentUserUniqueId = req.params.id;
    const courses = await courseClass.find({creator: currentUserUniqueId});

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
