import React, { useState } from "react";

function AlertForm(props) {
  const [alertData, setAlertData] = useState({
    course: "",
    message: "",
    creator: localStorage.getItem("currentUserUniqueId"),
    createdAt: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="alert-widget">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="alert-column">
          <textarea
            name="alert"
            placeholder="What's happening?"
            id="alertInput"
            className="alert-input"
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
                className="alert-selector"
                value={alertData.course}
                onChange={(e) =>
                  setAlertData({
                    ...alertData,
                    course: e.target.value,
                  })
                }
              >
                <option value="">EECE 502</option>
              </select>

              <input
                className="date-picker"
                type="date"
                name="dueDate"
                id="startTime"
                value={alertData.date}
                onChange={(e) =>
                  setAlertData({
                    ...alertData,
                    date: e.target.value,
                  })
                }
              ></input>
            </div>
            <button type="submit" className="alert-save">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AlertForm;
