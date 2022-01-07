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
export const fetchCourses = (uniqueId) => API.get("/courses/"+uniqueId);
export const createCourse = (newCourse) => API.post("/courses", newCourse);
export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);