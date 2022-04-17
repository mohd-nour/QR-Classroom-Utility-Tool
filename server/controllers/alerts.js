import ProfessorAlert from "../models/professorAlert.js";
//import user from "../models/user.js";
//import mongoose from "mongoose";
//import courseClass from "../models/courseClass.js";


export const getAlertsProfessor = async (req, res) => {
    try {
        const professorId = req.params.professorId;
        const alerts = await ProfessorAlert.find({ professorId: professorId });
        res.status(200).json(alerts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getAlertsStudent = async (req, res) => {
    try {
        const arrayOfClassesIds = req.body;
        const alerts = await ProfessorAlert.find({
            classId: { $in: arrayOfClassesIds }
        });
        res.status(200).json(alerts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addAlert = async (req, res) => {
    try {
        const professorId = req.params.professorId;
        const courseId = req.params.courseId;
        const { message, courseTitle } = req.body;
        const newAlert = new ProfessorAlert({
        message: message,
        classId: courseId,
        professorId: professorId,
        courseTitle: courseTitle
        });
        await newAlert.save();
        res.json(newAlert);
    } catch (error) {
        res.json(error);
    }
}