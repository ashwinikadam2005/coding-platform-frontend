import React from "react";
import { Link } from "react-router-dom";
import "./LoginOptions.css";

const LoginOptions = () => {
  return (
    <div className="lo-container">
      {/* Navbar */}
      <header className="lo-navbar">
        <div className="lo-navbar-content">
          <h1 className="lo-logo">CodeRank</h1>
          <nav>
            <Link to="/choose-role" className="lo-signup-link">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Login Options */}
      <div className="lo-options">
        {/* Company Login */}
        <div className="lo-box lo-company-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            alt="Company Icon"
            className="lo-icon"
          />
          <h2>Company Login</h2>
          <p>
            Manage job postings, assess candidate submissions, and streamline your hiring process.
          </p>
          <p>
            Gain insights into developer performance and find the right fit for your tech team.
          </p>
          <Link to="/recruiter-login" className="lo-login-btn">Login as Company</Link>
          <p className="lo-bottom-text">
            New here? <Link to="/recruiter-signup" className="lo-small-link">Create a recruiter account</Link>
          </p>
        </div>

        {/* Developer Login */}
        <div className="lo-box lo-developer-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
            alt="Developer Icon"
            className="lo-icon"
          />
          <h2>Developer Login</h2>
          <p>
            Solve coding challenges, join contests, and showcase your skills to top recruiters.
          </p>
          <p>
            Build your portfolio and grow your programming experience with real-world problems.
          </p>
          <Link to="/developer-login" className="lo-login-btn">Login as Developer</Link>
          <p className="lo-bottom-text">
            New here? <Link to="/developer-signup" className="lo-small-link">Create a developer account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginOptions;
