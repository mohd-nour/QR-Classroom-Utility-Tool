import React from 'react';
import VerticalNavBar from '../widgets/VerticalNavBar';
import { Navigate, Link } from 'react-router-dom';

const ViewPolls = () => {
  if (localStorage.getItem('profile') == null) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <div className="view-polls-column">
          <h2 className="view-poll-title">Your Polls</h2>
          <div className="poll-card">
            <h2>Quiz 1 Date</h2>
            <div className="flex-row">
              <div className="creator-section">
                <div className="post-avatar"></div>
                <div className="post-info">
                  <h5>Ali El Hajj</h5>
                  <h6 className="sub-info">40 minutes ago • EECE 490</h6>
                </div>
              </div>
              <Link to="/Polls" className="removeUnderline white">
                <button className="form-button fit-content">
                  <span>View Results</span>
                </button>
              </Link>
            </div>
          </div>

          <div className="poll-card">
            <h2>Quiz 1 Date</h2>
            <div className="flex-row">
              <div className="creator-section">
                <div className="post-avatar"></div>
                <div className="post-info">
                  <h5>Ali El Hajj</h5>
                  <h6 className="sub-info">40 minutes ago • EECE 490</h6>
                </div>
              </div>
              <Link to="/Polls" className="removeUnderline white">
                <button className="form-button fit-content">
                  <span>View Results</span>
                </button>
              </Link>
            </div>
          </div>

          <div className="poll-card">
            <h2>Quiz 1 Date</h2>
            <div className="flex-row">
              <div className="creator-section">
                <div className="post-avatar"></div>
                <div className="post-info">
                  <h5>Ali El Hajj</h5>
                  <h6 className="sub-info">40 minutes ago • EECE 490</h6>
                </div>
              </div>
              <Link to="/Polls" className="removeUnderline white">
                <button className="form-button fit-content">
                  <span>View Results</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPolls;
