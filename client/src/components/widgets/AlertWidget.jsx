import React, { useState } from 'react';

function AlertWidget(props) {
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  return (
    <div>
      <div className="alert-card">
        <div className="creator-section">
          <div className="post-avatar"></div>
          <div className="post-info">
            <h4>{user.result.name}</h4>
            {props.createdSince ? (
              <h5 className="sub-info">
                {props.createdSince} • {props.alertData.courseTitle}
              </h5>
            ) : (
              <h5 className="sub-info">
                Just now • {props.alertData.courseTitle}
              </h5>
            )}
          </div>
        </div>
        <div className="post-content">
          <span>{props.alertData.message}</span>
        </div>
      </div>
    </div>
  );
}

export default AlertWidget;
