import courseClass from "../models/courseClass.js";
//takes schema from models

//Logic for routes

export const getCourses = async (req, res) => {
  try {
    const currentUserUniqueId = req.params.id;
    console.log(currentUserUniqueId);
    const courses = await courseClass.find({creator: currentUserUniqueId});
    console.log(courses);

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
