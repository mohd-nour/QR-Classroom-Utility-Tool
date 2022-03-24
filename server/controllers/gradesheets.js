import GradeSheet from "../models/gradeSheet.js";

export const getGradeSheets = async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const gradeSheets = await GradeSheet.find({courseId: courseId});
      res.status(200).json(gradeSheets);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  
  export const postGradeSheet = async (req, res) => {
    try {
      const {deliverable, courseId, students_grades} = req.body;
      const newGradeSheet = new GradeSheet({
        students: students_grades,
        courseId: courseId,
        deliverable: deliverable
      }); // {name: "Mohamad", instituteId: "201902730", grade: "87"}
      await newGradeSheet.save();
      res.status(201).json(newGradeSheet);
    } catch (error) {
      res.status(409).json({message: error.message});
    }
  }
  
  export const updateGradeSheet = async (req, res) => {
    try {
      console.log("reached backend update grade sheet");
      const {deliverable, courseId, students_grades, gradeSheetId} = req.body;
      const updatedSheet = await GradeSheet.findByIdAndUpdate(gradeSheetId, {
        deliverable: deliverable,
        students: students_grades
      });
      res.status(201).json(updatedSheet);
    } catch (error) {
      res.status(409).json({message: error.message});
    }
  };