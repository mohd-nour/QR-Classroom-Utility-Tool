import courseClass from "../models/courseClass.js";
import user from "../models/user.js";
import Session from "../models/session.js";
import mongoose from "mongoose";
import io from "../index.js";
import GradeSheet from "../models/gradeSheet.js";
import ProfessorAlert from "../models/professorAlert.js";

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

export const getCoursesIds = async (req, res) => {
  try {
    const instituteId = req.params.instituteId;
    const currentUser = await user.findOne({
      instituteId: instituteId
    }, {
      password: 0
    });
    res.status(200).json(currentUser.classes);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}

export const getCoursesForStudents = async (req, res) => {
  try {
    const arrayOfClassesIds = req.body; // Assuming that arrayOfClassesIds is an array of classes Ids
    const courses = await courseClass.find({ 
      _id: {
          $in: arrayOfClassesIds
      }
    }, {
      currentSession: 0,
      students: 0,
      sessions: 0
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getAttendanceRecordsForStudent = async (req, res) => {
  try {
    console.log("entered attendance records");
    const arrayOfClassesIds = req.body;
    const instituteId = req.params.instituteId;
    const sessions = await Session.find({
      classId: {
        $in: arrayOfClassesIds
      }
    });
    var result = [];
    var classSessions;
    for (var i=0; i<arrayOfClassesIds.length;i++){
      classSessions = sessions.filter((session) => session.classId === arrayOfClassesIds[i]);
      var attendanceRecord = 0;
      for (var j=0; j<classSessions.length;j++){
        console.log(classSessions[j]);
        var attended = classSessions[j].attendedStudents.filter((student) => student.instituteId = instituteId);
        if (attended.length !== 0){
          attendanceRecord += 1;
        }
      }
      result.push({
        classId: arrayOfClassesIds[i],
        attendanceRecord: attendanceRecord,
        numberOfSessions: classSessions.length
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getAlertsForStudents = async (req, res) => {
  try {
    const arrayOfClassesIds = req.body; // Assuming that arrayOfClassesIds is an array of classes Ids
    const alerts = await ProfessorAlert.find({ 
      classId: {
          $in: arrayOfClassesIds
      }
    });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

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
    await Session.deleteMany({ classId: id });
    await GradeSheet.deleteMany({ courseId: id });
    await ProfessorAlert.deleteMany({ classId: id});
    await user.updateMany({},
      {$pull: { classes: id} } 
    );
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
            user.updateOne({ instituteId: studentId}, {
              $addToSet: {
                classes: courseId
              }
            }, function(err, result){
              if (err){
                res.send(err);
              }
              else{
                res.status(200).json(student);
                //io.emit(courseId);
                io.to(courseId).emit("RefreshEnrollment");
              }
            });
            //res.status(200).json(student);
            //io.emit(courseId);
            //io.to(courseId).emit("RefreshEnrollment");
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
        { $pull: { students: { instituteId: studentId } } },
        function (err, result) {
          if (err) {
            res.send(err);
          }
        }
      );
      user.findOneAndUpdate({instituteId: studentId}, { $pull: { classes: { $in: [ courseId ] } } }, function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.status(200).json(student);
        }
      });
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
      const newSession = new Session({
        sessionNumber: currentSessionNumber,
        classId: courseId,
        attendedStudents: [],
      });
      await newSession.save();
      courseClass.updateOne(
        { _id: courseId },
        {
          $addToSet: {
            sessions: {
              sessionNumber: currentSessionNumber,
              sessionUniqueId: newSession._id,
            },
          },
          $set: { currentSession: currentSessionNumber + 1 },
        },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.status(200).json(newSession);
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

export const getSessions = async (req, res) => {
  try {
    const courseId = req.params.classId;
    const sessions = await Session.find({ classId: courseId });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const removeSession = async (req, res) => {
  try {
    const courseId = req.params.classId;
    const sessionNumber = req.params.sessionNumber;
    const course = await courseClass.findOne({ _id: courseId });
    if (course) {
      const removedSession = await Session.findOneAndRemove({
        sessionNumber: sessionNumber,
        classId: courseId,
      });
      if (removedSession) {
        courseClass.updateOne(
          { _id: courseId },
          { $pull: { sessions: { sessionNumber: sessionNumber } } },
          function (err, result) {
            if (err) {
              res.send(err);
            } else {
              res.status(200).json(removedSession);
            }
          }
        );
      }
    } else {
      res.send(err);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addStudentToSession = async (req, res) => {
  try {
    console.log("adding student to session");
    var enrolled = false;
    const courseId = req.params.classId;
    const sessionNumber = req.params.sessionNumber;
    const { studentId } = req.body;
    console.log(courseId);
    console.log(sessionNumber);
    const currentCourse = await courseClass.findById(courseId);
    const currentSession = await Session.findOne({sessionNumber: sessionNumber, classId: courseId});
    if (currentSession.closed) {
      res.json({message: "This session is closed now", error: true});
    }
    else {
      currentCourse.students.forEach(async (obj) => {
        if (obj.instituteId == studentId) {
          enrolled = true;
          const student = await user.findOne(
            { instituteId: studentId },
            { password: 0 }
          );
          if (student) {
            Session.findOneAndUpdate(
              { sessionNumber: sessionNumber, classId: courseId },
              { $addToSet: { attendedStudents: student } },
              function (err, result) {
                if (err) {
                  res.send(err);
                } else {
                  res.status(200).json(student);
                  //io.emit(courseId+"/"+sessionNumber);
                  io.to(courseId+"/"+sessionNumber).emit("RefreshSession");
                }
              }
            );
          } else {
            res.send(err);
          }
        }
      });
      if (!enrolled) {
        res.send(err);
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStudentsFromSession = async (req, res) => {
  try {
    const courseId = req.params.classId;
    const sessionNumber = req.params.sessionNumber;
    const session = await Session.findOne({
      classId: courseId,
      sessionNumber: sessionNumber,
    });
    res.status(200).json(session.attendedStudents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleSession = async (req, res) => {
  try {
    const courseId = req.params.classId;
    const sessionNumber = req.params.sessionNumber;
    const session = await Session.findOne({
      classId: courseId,
      sessionNumber: sessionNumber,
    });
    res.status(200).json(session);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const finalizeSession = async (req, res) => {
  try {
    const courseId = req.params.classId;
    const sessionNumber = req.params.sessionNumber;
    if (courseId && sessionNumber) {
      Session.updateOne(
        { classId: courseId, sessionNumber: sessionNumber },
        {
          $set: { finalized: true }
        },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.status(200).json({message: "Session has been finalized"});
          }
        }
      );
    }
    else {
      res.send(err);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const closeSession = async (req, res) => {
  try {
    const courseId = req.params.classId;
    const sessionNumber = req.params.sessionNumber;
    const {closed} = req.body;
    if (courseId && sessionNumber) {
      Session.updateOne(
        { classId: courseId, sessionNumber: sessionNumber },
        {
          $set: { closed: closed }
        },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.status(200).json({message: "Session has been closed"});
          }
        }
      );
    }
    else {
      res.send(err);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
