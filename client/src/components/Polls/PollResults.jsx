import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VerticalNavBar from '../widgets/VerticalNavBar';
import { useSelector } from 'react-redux';

const Progress = ({ valueStart = 0, valueEnd, answer }) => {
  const [value, setValue] = useState(valueStart);
  useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return (
    <div className="answer">
      {answer}
      <span
        className="percentage-bar"
        style={{
          opacity: 1,
          width: `${value}%`,
        }}
      ></span>
      <span className="percentage-value">{valueEnd}%</span>
    </div>
  );
};



const computeTotalVotes = (options) => {
  var totalVotes = 0;
  for (var i=0; i<options.length; i++){
    totalVotes += options[i].optionVotes;
  }
  return totalVotes;
}

const PollResults = () => {
  const location = useLocation();
  const pollId = location.state? location.state.data: "";
  const poll = useSelector((state) => state.polls).filter((poll) => poll._id === pollId);
  const options = poll[0].options;
  const totalVotes = computeTotalVotes(options);
  console.log(poll);
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <div className="result-container">
          <h1 className="question">
            {poll[0].title}
          </h1>
          <div className="answer-container">
            {options.map((option) => {
              var valueEnd = totalVotes === 0 ? 0: parseFloat(option.optionVotes)*100/parseFloat(totalVotes);
              return ( 
                <Progress 
                  answer={option.optionValue} 
                  valueEnd={valueEnd.toFixed(0)}
                /> 
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollResults;
