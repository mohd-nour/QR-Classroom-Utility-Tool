import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse, updateCourse } from "../../actions/courses";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

function AddClassComponent(props) {
  const [value, setValue] = React.useState(null);

  const [courseData, setCourseData] = useState({
    courseName: "",
    courseNumber: "",
    creator: localStorage.getItem("currentUserUniqueId"),
    schedule: "MWF",
    students: [],
    startTime: "",
    endTime: "",
  });

  const currentCourse = useSelector((state) => state.currentCourse);

  const course = useSelector((state) =>
    currentCourse
      ? state.courses.find((course) => course._id === currentCourse.courseId)
      : null
  );

  useEffect(() => {
    if (course) {
      setCourseData(course);
    }
  }, [course]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentCourse) {
      dispatch(updateCourse(currentCourse.courseId, courseData, navigate));
    } else {
      dispatch(createCourse(courseData, navigate));
    }
  };
  return (
    <div id="addClassComponent">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="addClass-column">
          <h3 id="form-title">{currentCourse ? "EDIT CLASS" : "ADD CLASS"}</h3>
          <div className="input-container">
            <label>Course Name</label>
            <input
              name="courseName"
              placeholder="ex: EECE"
              id="courseName"
              className="addClass-input"
              value={courseData.courseName}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  courseName: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="input-container">
            <label>Course Number</label>
            <input
              name="courseNumber"
              placeholder="ex: 502"
              id="courseName"
              className="addClass-input"
              value={courseData.courseNumber}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  courseNumber: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="input-container">
            <label>Schedule</label>
            <select
              className="addClass-input"
              value={courseData.schedule}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  schedule: e.target.value,
                })
              }
            >
              <option value="MWF">MWF</option>
              <option value="MW">MW</option>
              <option value="TR">TR</option>
              <option value="M">M</option>
              <option value="T">T</option>
              <option value="W">W</option>
              <option value="R">R</option>
              <option value="F">F</option>
            </select>
          </div>
          <div className="time-container">
            <div>
              <label>Starting time</label>
              {/* <input
                name="startTime"
                type="time"
                placeholder="ex: 10:00"
                id="startTime"
                className="time-input without"
                value={courseData.startTime}
                onChange={(e) => {
                  console.log(courseData);
                  setCourseData({
                    ...courseData,
                    startTime: e.target.value,
                  });
                }}
              ></input> */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      style={{
                        height: 50,
                        width: 165,
                        marginTop: 5,
                        marginRight: 10,
                        color: "#393c41",
                      }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div>
              <label>Ending time</label>
              {/* <input
                name="endTime"
                type="time"
                placeholder="ex: 10:50"
                id="endTime"
                className="time-input without"
                value={courseData.endTime}
                onChange={(e) => {
                  console.log(courseData);
                  setCourseData({
                    ...courseData,
                    endTime: e.target.value,
                  });
                }}
              ></input> */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      InputProps={{
                        disableUnderline: true,
                      }}
                      style={{
                        height: 50,
                        width: 165,
                        marginTop: 5,
                        color: "#393c41",
                      }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddClassComponent;
