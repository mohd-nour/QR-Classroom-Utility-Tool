import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization =
      "Bearer " + JSON.parse(localStorage.getItem("profile").token);
  }
  return req;
});

export const fetchCourses = () => API.get("/courses");
export const createCourse = (newCourse) => API.post("/courses", newCourse);
export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);
