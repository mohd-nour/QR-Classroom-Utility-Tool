import React from "react";


function AlertWidget(props) {
  return (
    <div>
      <div className="alert-card">
        Class {props.alertData.courseTitle} has been alerted with the following message: {props.alertData.message}
      </div>
    </div>
  );
}

export default AlertWidget;
