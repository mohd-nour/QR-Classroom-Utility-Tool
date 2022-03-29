import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchCourses = (uniqueId) => API.get("/courses/" + uniqueId);
export const createCourse = (newCourse) => API.post("/courses", newCourse);
export const deleteCourse = (id) => API.delete("/courses/" + id);
export const updateCourse = (id, updatedCourse) =>
  API.patch("/courses/" + id, updatedCourse);

export const fetchStudents = (courseId) =>
  API.get("/courses/enroll/" + courseId);
export const addStudent = (courseId, studentId) =>
  API.post("/courses/enroll/" + courseId + "/" + studentId);
export const removeStudent = (courseId, studentId) =>
  API.post("/courses/enroll/removeStudent/" + courseId + "/" + studentId);

export const addSession = (courseId) =>
  API.patch("/courses/sessions/addSession/" + courseId);
export const removeSession = (courseId, sessionNumber) =>
  API.patch("/courses/sessions/addSession/" + courseId + "/" + sessionNumber);

export const getSessions = (courseId) =>
  API.get("/courses/sessions/getSessions/" + courseId);
export const addStudentToSession = (studentId, classId, sessionNumber) =>
  API.patch(
    "/courses/sessions/markAttendance/" + classId + "/" + sessionNumber,
    studentId
  );
export const getStudentsFromSession = (classId, sessionNumber) =>
  API.get(
    "/courses/sessions/getSessionAttendance/" + classId + "/" + sessionNumber
  );

export const getSingleSession = (classId, sessionNumber) =>
  API.get(
    "/courses/sessions/getSingleSession/" + classId + "/" + sessionNumber
  );

export const finalizeSession = (classId, sessionNumber) =>
  API.patch(
    "/courses/sessions/finalizeSession/" + classId + "/" + sessionNumber
  );

export const closeSession = (classId, sessionNumber, closedObject) =>
  API.patch(
    "/courses/sessions/closeSession/" + classId + "/" + sessionNumber,
  closedObject);

export const signin = (formData) => API.post("/users/signin/web", formData);
export const signup = (formData) => API.post("/users/signup", formData);
export const verifyAccount = (email, verficationToken) => API.patch("/users/verifyAccount/"+email+"/"+verficationToken);

export const sendEmail = (emailData) =>
  API.post("/forgotPassword/sendEmail", emailData);
export const resetPasswordClient = (newPassword, id, token) =>
  API.patch("/forgotPassword/resetPass/" + id + "/" + token, newPassword);

export const fetchAlerts = (professorId) => 
  API.get("/alerts/getAlerts/"+professorId);

export const addAlert = (professorId, courseId, messageAndTitle) => 
  API.post("/alerts/addAlert/"+professorId+"/"+courseId, messageAndTitle);


export const fetchGradeSheets = (courseId) => API.get("/gradeSheets/fetchGradeSheets/"+courseId);

export const postGradeSheet = (courseId, deliverable, students_grades) => 
  API.post("/gradeSheets/postGradeSheet/",{courseId: courseId, deliverable: deliverable, students_grades: students_grades});

export const updateGradeSheet = (courseId, deliverable, students_grades, gradeSheetId) => 
  API.patch("/gradeSheets/updateGradeSheet/", {courseId: courseId, deliverable: deliverable, students_grades: students_grades, gradeSheetId: gradeSheetId});
