import React from 'react';
import Sensei from '../images/Sensei.png';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div id="landing-page">
      <nav className="landing-header">
        <div className="header-logo">
          <span className="sensei-landing-logo">Sensei</span>
          <h5>for AUB</h5>
        </div>
      </nav>
      <div className="landing-panel">
        <div class="landing-text">
          <h1 class="landing-title">Welcome to Sensei</h1>
          <h3 class="landing-sub-title">
            A University Utility Software designed to revolutionize the
            classroom.
          </h3>

          <Link to="/LoginPage" className="removeUnderline">
            <div class="landing-button">Get Started</div>
          </Link>
        </div>
        <img className="landing-image" src={Sensei} alt="Sensei Logo" />
      </div>
    </div>
  );
}

export default LandingPage;
