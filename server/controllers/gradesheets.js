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
};
  
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

export const getStudentGrades = async (req, res) => {
  try {
      console.log("get grades student");
      const instituteId = req.params.instituteId;
      const gradeSheets = await GradeSheet.find();
      var currentSheet;
      var result = [];
      var appendedObject = {};
      for (var i=0; i<gradeSheets.length;i++){
        currentSheet = gradeSheets[i].students;
        for (var j=0; j<gradeSheets[i].students.length; j++){
          if (currentSheet[j].instituteId === instituteId){
            appendedObject = {
              grade: currentSheet[j].grade,
              deliverable: gradeSheets[i].deliverable
            }
            result.push(appendedObject);
          }
        }
      }
      res.status(200).json(result);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};