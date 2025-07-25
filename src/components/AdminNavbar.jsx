// src/components/AdminNavbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-logo">Admin Panel</div>
      <div className="admin-navbar-links">
        <Link to="/admin-dashboard">Dashboard</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
