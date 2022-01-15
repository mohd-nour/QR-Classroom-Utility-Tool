import axios from "axios";
/*
const url1 = "http://localhost:5000/courses";
const url2 = "http://localhost:5000/users";

export const fetchCourses = () => axios.get(url1);
export const createCourse = (newPost) => axios.post(url1, newPost);
export const signin = (formData) => axios.post(url2+"/signin", formData);
export const signup = (formData) => axios.post(url2+"/signup", formData);
*/

const API = axios.create({ baseURL: "http://localhost:5000" });
/*
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.authorization =
        "Bearer " + JSON.parse(localStorage.getItem("profile").token);
    }
    return req;
  });
*/
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

export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);
export const sendEmail = (emailData) =>
  API.post("/forgotPassword/sendEmail", emailData);
export const resetPasswordClient = (newPassword, id, token) =>
  API.patch("/forgotPassword/resetPass/" + id + "/" + token, newPassword);
