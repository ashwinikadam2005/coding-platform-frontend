import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RecruiterNavbar.css";

const RecruiterNavbar = () => {
  const navigate = useNavigate();
  const recruiter = JSON.parse(localStorage.getItem("recruiter"));

  const handleLogout = () => {
    localStorage.removeItem("recruiter");
    navigate("/");
  };

  return (
    <nav className="rnav-main">
      <div className="rnav-logo">
        <Link to="/recruiter/dashboard">CodeRank</Link>
      </div>
      <ul className="rnav-links">
        <li><Link to="/recruiter/dashboard">Dashboard</Link></li>
        <li><Link to="/recruiter/tests">Tests</Link></li>
        <li><Link to="/recruiter/candidates">Candidates</Link></li>
        <li><Link to="/recruiter/interviews">Interviews</Link></li>
        <li><Link to="/recruiter/profile">Profile</Link></li>
        <li onClick={handleLogout} className="rnav-logout-btn">Logout</li>
      </ul>
      {recruiter && <span className="rnav-welcome-msg">Hi, {recruiter.name}</span>}
    </nav>
  );
};

export default RecruiterNavbar;
