import React, { useState } from 'react';
import VerticalNavBar from '../widgets/VerticalNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { createPoll } from '../../actions/polls';


function courseOption(course) {
  return (
    <option key={course._id} value={course._id}>
      {course.courseName + ' ' + course.courseNumber}
    </option>
  );
}

const createOptionBox = (option) => {
  return (
    <div className="input-container" key={option.optionNumber}>
      <input
        className="std-input"
        placeholder={'Option ' + option.optionNumber}
        onChange={(e) => {
          option.optionValue = e.target.value;
        }}
        required
      ></input>
    </div>
  );
};

const Poll = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const professorName = user ? user.result.name : '';
  const [selectedCourse, setSelectedCourse] = useState({
    course: "",
    courseTitle: ""
  });
  const [title, setTitle] = useState("");
  const [currentOptionNumber, setCurrentOptionNumber] = useState(3);
  const [options, setOptions] = useState([
    { optionNumber: 1, optionValue: '' },
    { optionNumber: 2, optionValue: '' },
  ]);
  const addOptionBox = () => {
    setOptions([
      ...options,
      {
        optionNumber: currentOptionNumber,
        optionValue: '',
      },
    ]);
    setCurrentOptionNumber((prev) => prev + 1);
  };
  const createNewPoll = () => {
    if (selectedCourse.course !== ""){
      dispatch(createPoll(selectedCourse.course, options, localStorage.getItem('currentUserUniqueId'), title, professorName, selectedCourse.courseTitle));
    }
    else{
      swal('You did not pick a course', { icon: 'warning' });
    }
  };
  if (localStorage.getItem('profile') == null) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <div className="polls-panel flex-center">
          <h2 className="title">Create a Poll</h2>
          <div className="poll-container">
            <div className="input-container">
              <label>Title</label>
              <input required className="std-input" onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div>
              <label className="answer-options">Answer Options</label>
              {options.map(createOptionBox)}
            </div>
            <div className="add-option">
              <button
                className="form-button fit-content flex-center"
                onClick={addOptionBox}
              >
                <i className="icons uil uil-plus"></i>
                <span className="poll-button-text">Add option</span>
              </button>
            </div>
            <div className="create-poll">
              <select 
              className="selector poll-selector"
              onChange={(e) => setSelectedCourse({
                course: e.target.value,
                courseTitle: e.target.selectedOptions[0].text
              })}
              >
                <option value="">Select a class</option>
                {courses.map(courseOption)}
              </select>
              <button
                type="submit"
                className="form-button fit-content"
                onClick={createNewPoll}
              >
                Create poll
              </button>
              <Link to="/Polls" className="removeUnderline white">
                <button className="form-button fit-content poll-view-button">
                  <span>View Polls</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poll;
