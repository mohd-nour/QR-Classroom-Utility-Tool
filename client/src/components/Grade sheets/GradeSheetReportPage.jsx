import React from 'react';
import VerticalNavBar from '../widgets/VerticalNavBar';
import { Navigate, useLocation } from 'react-router-dom';
import BarChart from '../widgets/BarChart';

const computeStatistics = (studentsList) => {
  console.log(studentsList);
  var grades = [];
  var IDs = [];
  var minGrade = 100;
  var minID = '';
  var minName = '';
  var maxGrade = 0;
  var maxID = '';
  var maxName = '';
  const median = (arr) => {
    let middle = Math.floor(arr.length / 2);
    arr = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0
      ? arr[middle]
      : (arr[middle - 1] + arr[middle]) / 2;
  };

  const getStandardDeviation = (arr) => {
    const n = arr.length;
    const mean = arr.reduce((a, b) => a + b) / n;
    return Math.sqrt(
      arr.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
    );
  };

  for (var i = 0; i < studentsList.length; i++) {
    grades.push(parseFloat(studentsList[i].grade));
    IDs.push(studentsList[i].instituteId);
    if (minGrade >= studentsList[i].grade) {
      minGrade = studentsList[i].grade;
      minID = studentsList[i].instituteId;
      minName = studentsList[i].name;
    }
    if (maxGrade <= studentsList[i].grade) {
      maxGrade = studentsList[i].grade;
      maxID = studentsList[i].instituteId;
      maxName = studentsList[i].name;
    }
  }
  var average = 0;
  for (var i = 0; i < grades.length; i++) {
    average += grades[i];
  }
  average = average / grades.length;
  console.log(grades);

  var below_avg = 0;
  var above_avg = 0;
  for (var i = 0; i < grades.length; i++) {
    if (grades[i] >= average) {
      above_avg += 1;
    }
    if (grades[i] < average) {
      below_avg += 1;
    }
  }

  return [
    grades,
    IDs,
    minGrade,
    minID,
    minName,
    maxGrade,
    maxID,
    maxName,
    average.toFixed(2),
    median(grades),
    getStandardDeviation(grades).toFixed(2),
    below_avg,
    above_avg,
  ];
};

const GradeReport = () => {
  const location = useLocation();
  if (localStorage.getItem('profile') == null) {
    return <Navigate to="/"></Navigate>;
  }
  const studentsList = location.state.gradeSheet.students;
  const [
    grades,
    IDs,
    minGrade,
    minID,
    minName,
    maxGrade,
    maxID,
    maxName,
    average,
    median,
    deviation,
    below_avg,
    above_avg,
  ] = computeStatistics(studentsList);

  const state = {
    labels: IDs,
    datasets: [
      {
        label: 'Grade',
        data: grades,
        backgroundColor: '#6200EE',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 2,
      },
    ],
  };

  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <h1 className="report-title">Grade Sheet Report</h1>
        <div className="report-panel">
          <div className="report-left">
            <h3 className="stat-header">Grade Statistics</h3>
            <div className="stats-left">
              <div className="stat-card">
                <h2 className="stat-title">{studentsList.length}</h2>
                <h5>Participants</h5>
              </div>
              <div className="stat-card">
                <h2 className="stat-title">{average}</h2>
                <h5>Average</h5>
              </div>
              <div className="stat-card">
                <h2 className="stat-title">{deviation}</h2>
                <h5>Deviation</h5>
              </div>
              <div className="stat-card">
                <h2 className="stat-title">{median}</h2>
                <h5>Median</h5>
              </div>
              <div className="stat-card">
                <h2 className="stat-title">3</h2>
                <h5>Absentees</h5>
              </div>
            </div>
            <div className="stat-bargraph">
              <BarChart chartData={state} />
            </div>
          </div>
          <div className="report-right">
            <div className="stat-card-right">
              <div>
                <h3>Highest Grade</h3>
                <h1>{maxGrade}</h1>
              </div>
              <div className="stat-profile">
                <div className="stat-identity">
                  <h4>{maxName}</h4>
                  <h4>{maxID}</h4>
                </div>
                <div className="avatar"></div>
              </div>
            </div>
            <div className="stat-card-right">
              <div>
                <h3>Lowest Grade</h3>
                <h1>{minGrade}</h1>
              </div>
              <div className="stat-profile">
                <div className="stat-identity">
                  <h4>{minName}</h4>
                  <h4>{minID}</h4>
                </div>
                <div className="avatar"></div>
              </div>
            </div>
            <div className="stat-card-right">
              <div>
                <h3>Below Average</h3>
                <div className="average-stat">
                  <h1>{below_avg}</h1>
                  <h5>
                    ({((below_avg * 100) / studentsList.length).toFixed(2)}%)
                  </h5>
                </div>
              </div>
              <div className="vertical"></div>
              <div>
                <h3>Above Average</h3>
                <div className="average-stat">
                  <h1>{above_avg}</h1>
                  <h5>
                    ({((above_avg * 100) / studentsList.length).toFixed(2)}%)
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeReport;
