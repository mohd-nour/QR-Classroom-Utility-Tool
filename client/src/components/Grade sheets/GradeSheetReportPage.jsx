import React from 'react';
import VerticalNavBar from '../widgets/VerticalNavBar';
import { Navigate } from 'react-router-dom';
import BarChart from '../widgets/BarChart';

const GradeReport = () => {
  if (localStorage.getItem('profile') == null) {
    return <Navigate to="/"></Navigate>;
  }

  const state = {
    labels: [
      '201900001',
      '201900002',
      '201900003',
      '201900004',
      '201900005',
      '201900006',
      '201900007',
      '201900008',
      '201900009',
      '201900010',
      '201900011',
      '201900012',
      '201900013',
      '201900014',
      '201900015',
      '201900016',
      '201900017',
      '201900018',
      '201900019',
      '201900020',
      '201900021',
      '201900022',
      '201900023',
      '201900024',
    ],
    datasets: [
      {
        label: 'Grade',
        data: [
          56, 57, 58, 59, 60, 61, 70, 71, 72, 73, 74, 75, 76, 77, 81, 82, 83,
          91, 92, 93, 94, 95, 96, 98,
        ],
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
            <h3 class="stat-header">Grade Statistics</h3>
            <div className="stats-left">
              <div className="stat-card">
                <h2 className="stat-title">24</h2>
                <h5>Participants</h5>
              </div>
              <div className="stat-card">
                <h2 className="stat-title">81</h2>
                <h5>Average</h5>
              </div>
              <div className="stat-card">
                <h2 className="stat-title">15</h2>
                <h5>Deviation</h5>
              </div>
              <div className="stat-card">
                <h2 className="stat-title">81</h2>
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
                <h1>98</h1>
              </div>
              <div className="stat-profile">
                <div className="stat-identity">
                  <h4>Mohamad Abdallah</h4>
                  <h4>201902730</h4>
                </div>
                <div className="avatar"></div>
              </div>
            </div>
            <div className="stat-card-right">
              <div>
                <h3>Lowest Grade</h3>
                <h1>56</h1>
              </div>
              <div className="stat-profile">
                <div className="stat-identity">
                  <h4>John Doe</h4>
                  <h4>201902732</h4>
                </div>
                <div className="avatar"></div>
              </div>
            </div>
            <div className="stat-card-right">
              <div>
                <h3>Below Average</h3>
                <div className="average-stat">
                  <h1>10</h1>
                  <h5>(41.6%)</h5>
                </div>
              </div>
              <div class="vertical"></div>
              <div>
                <h3>Above Average</h3>
                <div className="average-stat">
                  <h1>14</h1>
                  <h5>(58.3%)</h5>
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
