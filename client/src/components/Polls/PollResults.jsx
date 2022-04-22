import React, { useEffect, useState } from 'react';
import VerticalNavBar from '../widgets/VerticalNavBar';

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

const PollResults = () => {
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <div className="result-container">
          <h1 className="question">
            Which program are you most comfortable with?
          </h1>
          <div className="answer-container">
            <Progress answer="Python" valueEnd={40} />
            <Progress answer="JavaScript" valueEnd={45} />
            <Progress answer="Java" valueEnd={15} />
            <Progress answer="C++" valueEnd={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollResults;
