import React from "react";
import "./RecruiterDashboard.css";

const RecruiterDashboard = () => {
  const recruiter = JSON.parse(localStorage.getItem("recruiter"));

  return (
    <div className="full-dashboard">
      <header className="dashboard-header">
        <h1>
          Welcome, <span>{recruiter?.name || "Recruiter"}</span>
        </h1>
        <p>🏢 Company: {recruiter?.company}</p>
      </header>

      <section className="dashboard-section">
        <h2>📌 Quick Links</h2>
        <div className="dashboard-links-grid">
          <div className="dashboard-card">📊 View All Tests</div>
          <div className="dashboard-card">👥 Manage Candidates</div>
          <div className="dashboard-card">📅 Schedule Interviews</div>
          <div className="dashboard-card">⚙️ Account Settings</div>
        </div>
      </section>
    </div>
  );
};

export default RecruiterDashboard;
