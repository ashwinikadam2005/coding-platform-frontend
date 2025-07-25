// src/components/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAddProblemClick = () => {
    navigate("/admin/add-problems");
  };

  return (
    <div>
      <AdminNavbar />
      <div className="admin-dashboard-content">
        <h1>Welcome, Admin</h1>
        <div className="admin-cards">
          <div className="admin-card">
            <h3>Manage Developers</h3>
            <p>View and manage registered developers.</p>
          </div>
          <div className="admin-card">
            <h3>Manage Recruiters</h3>
            <p>Review and manage recruiter accounts.</p>
          </div>
          <div className="admin-card">
            <h3>Manage Contests</h3>
            <p>Create, update, or delete coding contests.</p>
          </div>
          <div className="admin-card">
            <h3>View Reports</h3>
            <p>Track platform statistics and activity logs.</p>
          </div>
          <div className="admin-card" onClick={handleAddProblemClick} style={{ cursor: "pointer" }}>
            <h3>Add Problems</h3>
            <p>Create and manage coding problems for practice & contests.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
