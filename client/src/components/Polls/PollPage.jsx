import React from 'react';
import VerticalNavBar from '../widgets/VerticalNavBar';
import { Navigate } from 'react-router-dom';
const Poll = () => {
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
              <input className="std-input"></input>
            </div>
            <div>
              <div className="input-container">
                <label className="answer-options">Answer Options</label>
                <input className="std-input" placeholder="Option 1"></input>
              </div>
              <div className="input-container">
                <input className="std-input" placeholder="Option 2"></input>
              </div>
              <div className="input-container">
                <input className="std-input" placeholder="Option 3"></input>
              </div>
            </div>
            <div className="add-option">
              <button className="form-button fit-content flex-center">
                <i class="icons uil uil-plus"></i>
                <span className="poll-button-text">Add option</span>
              </button>
            </div>
            <div className="create-poll">
              <button type="submit" className="form-button fit-content">
                Create poll
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poll;
