import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { addAlert } from '../../actions/alerts';

function courseOption(course) {
  return (
    <option key={course._id} value={course._id}>
      {course.courseName + ' ' + course.courseNumber}
    </option>
  );
}

function AlertForm(props) {
  const dispatch = useDispatch();
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const name = user ? user.result.name : '';
  const [alertData, setAlertData] = useState({
    course: '',
    message: '',
    creator: localStorage.getItem('currentUserUniqueId'),
    courseTitle: '',
  });
  const courses = useSelector((state) => state.courses);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (alertData.course) {
      dispatch(
        addAlert(alertData.creator, alertData.course, {
          message: alertData.message,
          courseTitle: alertData.courseTitle,
          professorName: name,
        })
      );
      alertData.message = '';
    } else {
      swal('You did not pick a course', { icon: 'warning' });
    }
  };

  return (
    <div id="alert-widget">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="alert-column">
          <textarea
            name="alert"
            placeholder="What's happening?"
            id="alertInput"
            className="alert-input scroll"
            value={alertData.message}
            onChange={(e) =>
              setAlertData({
                ...alertData,
                message: e.target.value,
              })
            }
          ></textarea>
          <div className="alert-options">
            <div className="alert-suboptions">
              <select
                className="selector"
                value={alertData.course}
                onChange={(e) =>
                  setAlertData({
                    ...alertData,
                    course: e.target.value,
                    courseTitle: e.target.selectedOptions[0].text,
                  })
                }
              >
                <option value="">Select a class</option>
                {courses.map(courseOption)}
              </select>
            </div>
            <button type="submit" className="alert-save">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AlertForm;
