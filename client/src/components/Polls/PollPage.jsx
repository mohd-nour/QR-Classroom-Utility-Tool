import React, { useState } from 'react';
import VerticalNavBar from '../widgets/VerticalNavBar';
import { Navigate } from 'react-router-dom';

const createOptionBox = (option) => {
  return (
    <div className="input-container" key={option.optionNumber}>
      <input className="std-input" placeholder={"Option "+option.optionNumber} onChange={(e) => {
        option.optionValue = e.target.value
      }}></input>
    </div>
  )
}


const Poll = () => {
  const [currentOptionNumber, setCurrentOptionNumber] = useState(3);
  const [options, setOptions] = useState([{optionNumber: 1, optionValue: ""}, {optionNumber: 2, optionValue: ""}]);
  const addOptionBox = () => {
    setOptions([...options, {
      optionNumber: currentOptionNumber,
      optionValue: ""
    }])
    setCurrentOptionNumber((prev) => prev+1);
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
              <input className="std-input"></input>
            </div>
            <div>
              <label className="answer-options">Answer Options</label>
              {options.map(createOptionBox)}
            </div>
            <div className="add-option">
              <button className="form-button fit-content flex-center" onClick={addOptionBox}>
                <i className="icons uil uil-plus"></i>
                <span className="poll-button-text">Add option</span>
              </button>
            </div>
            <div className="create-poll">
              <button type="submit" className="form-button fit-content" onClick={() => console.log(options)}>
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
