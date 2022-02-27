import React from "react";

function AlertWidget(props) {
  return (
    <div>
      <div className="alert-card">
        <div class="creator-section">
          <div className="post-avatar"></div>
          <div className="post-info">
            <h4>Mohamad El Arab</h4>
            <h5 className="sub-info">
              10 mins ago • {props.alertData.courseTitle}
            </h5>
          </div>
        </div>
        <div className="post-content">
          {/* <span>{props.alertData.message}</span> */}
          <span>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.
          </span>
        </div>
      </div>
    </div>
  );
}

export default AlertWidget;
