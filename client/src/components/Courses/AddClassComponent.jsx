import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, updateCourse } from '../../actions/courses';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function AddClassComponent(props) {
  const [nameEdited, setNameEdited] = useState(false);
  const [noEdited, setNoEdited] = useState(false);
  const [startEdited, setStartEdited] = useState(false);
  const [endEdited, setEndEdited] = useState(false);

  const [courseData, setCourseData] = useState({
    courseName: '',
    courseNumber: '',
    creator: localStorage.getItem('currentUserUniqueId'),
    schedule: 'MWF',
    students: [],
    startTime: '',
    endTime: '',
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = (e) => {
    if (currentCourse) {
      dispatch(updateCourse(currentCourse.courseId, courseData, navigate));
    } else {
      dispatch(createCourse(courseData, navigate));
    }
  };
  return (
    <div id="addClassComponent">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="addClass-column">
          <h3 id="form-title">{currentCourse ? 'EDIT CLASS' : 'ADD CLASS'}</h3>
          <div className="input-container">
            <label>Course Name</label>
            {currentCourse && !nameEdited ? (
              <input
                name="courseName"
                value={courseData.courseName}
                onChange={(e) => {
                  setNameEdited(true);
                  setCourseData({
                    ...courseData,
                    courseName: e.target.value,
                  });
                }}
                className="addClass-input"
              ></input>
            ) : (
              <input
                {...register('courseName', {
                  required: 'Course name is required.',
                })}
                name="courseName"
                value={courseData.courseName}
                onChange={(e) => {
                  setCourseData({
                    ...courseData,
                    courseName: e.target.value,
                  });
                }}
                className={`std-input ${
                  errors.courseName ? 'invalid-entry' : ''
                }`}
              ></input>
            )}
            {errors.courseName && (
              <p className="alert">{errors.courseName.message}</p>
            )}
          </div>

          <div className="input-container">
            <label>Course Number</label>
            {currentCourse && !noEdited ? (
              <input
                name="courseNumber"
                value={courseData.courseNumber}
                onChange={(e) => {
                  setNoEdited(true);
                  setCourseData({
                    ...courseData,
                    courseNumber: e.target.value,
                  });
                }}
                className="std-input"
              ></input>
            ) : (
              <input
                {...register('courseNumber', {
                  required: 'Course number is required.',
                })}
                name="courseNumber"
                value={courseData.courseNumber}
                onChange={(e) => {
                  setCourseData({
                    ...courseData,
                    courseNumber: e.target.value,
                  });
                }}
                className={`std-input ${
                  errors.courseNumber ? 'invalid-entry' : null
                }`}
              ></input>
            )}
            {errors.courseNumber && (
              <p className="alert">{errors.courseNumber.message}</p>
            )}
          </div>
          <div className="input-container">
            <label>Schedule</label>
            <select
              className="std-input"
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
              {currentCourse && !startEdited ? (
                <input
                  name="startTime"
                  type="time"
                  placeholder="ex: 10:00"
                  id="startTime"
                  value={courseData.startTime}
                  onChange={(e) => {
                    console.log(courseData);
                    setCourseData({
                      ...courseData,
                      startTime: e.target.value,
                    });
                  }}
                  className="std-input"
                ></input>
              ) : (
                <input
                  {...register('startTime', {
                    required: 'Start time is required.',
                  })}
                  name="startTime"
                  type="time"
                  placeholder="ex: 10:00"
                  id="startTime"
                  value={courseData.startTime}
                  onChange={(e) => {
                    console.log(courseData);
                    setCourseData({
                      ...courseData,
                      startTime: e.target.value,
                    });
                  }}
                  className={`std-input ${
                    errors.startTime ? 'invalid-entry' : null
                  }`}
                ></input>
              )}
              {errors.startTime && (
                <p className="alert">{errors.startTime.message}</p>
              )}
            </div>
            <div id="time-spacer"></div>
            <div>
              <label>Ending time</label>
              {currentCourse && !endEdited ? (
                <input
                  name="endTime"
                  type="time"
                  placeholder="ex: 10:50"
                  id="endTime"
                  value={courseData.endTime}
                  onChange={(e) => {
                    console.log(courseData);
                    setCourseData({
                      ...courseData,
                      endTime: e.target.value,
                    });
                  }}
                  className="std-input"
                ></input>
              ) : (
                <input
                  {...register('endTime', {
                    required: 'End time is required.',
                  })}
                  name="endTime"
                  type="time"
                  placeholder="ex: 10:50"
                  id="endTime"
                  value={courseData.endTime}
                  onChange={(e) => {
                    console.log(courseData);
                    setCourseData({
                      ...courseData,
                      endTime: e.target.value,
                    });
                  }}
                  className={`std-input ${
                    errors.endTime ? 'invalid-entry' : null
                  }`}
                ></input>
              )}
              {errors.endTime && (
                <p className="alert">{errors.endTime.message}</p>
              )}
            </div>
          </div>
          <button type="submit" className="form-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddClassComponent;
