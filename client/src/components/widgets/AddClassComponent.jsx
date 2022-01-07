import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCourse } from "../../actions/courses";
import { useNavigate } from "react-router-dom";


function AddClassComponent() {
  const [courseData, setCourseData] = useState({
    title: "",
    creator: localStorage.getItem('currentUserUniqueId'),
    schedule: "MWF",
    students: [],
    startTime: "",
    endTime: ""
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCourse(courseData));
    navigate("/MainPage", { replace: true });
  };
  return (
    <div id="addClassComponent">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div class="addClass-column">
          <label for="courseName">Course Name</label>
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
          <label for="courseNumber">Course Number</label>
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
          <label for="schedule">Schedule</label>
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
          <div className="time-container">
            <div>
              <label for="startTime">Starting time</label>
              <input
                name="startTime"
                placeholder="ex: 10:00"
                id="startTime"
                className="time-input"
                value={courseData.startTime}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    startTime: e.target.value,
                  })
                }
              ></input>
            </div>
            <div>
              <label for="endTime">Ending time</label>
              <input
                name="endTime"
                placeholder="ex: 10:50"
                id="endTime"
                className="time-input"
                value={courseData.endTime}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    endTime: e.target.value,
                  })
                }
              ></input>
            </div>
          </div>
          <button type="submit" className="save-button">
            Save
          </button>
          <button type="submit" className="clear-button">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddClassComponent;
