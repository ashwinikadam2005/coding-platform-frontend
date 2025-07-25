import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { FaHome, FaLaptopCode, FaTrophy, FaUser, FaBriefcase, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">CodeRank</h2>

      <nav className="nav-links">
        <NavLink to="/dashboard" activeclassname="active"><FaHome /> Dashboard</NavLink>
        <NavLink to="/practice"><FaLaptopCode /> Practice</NavLink>
        <NavLink to="/contests"><FaTrophy /> Contests</NavLink>
        <NavLink to="/overall-leaderboard"><FaClipboardList /> Leaderboard</NavLink>
        <NavLink to="/interview-prep"><FaBriefcase /> Interview Prep</NavLink>
        <NavLink to="/jobs"><FaBriefcase /> Jobs</NavLink>
        <NavLink to="/profile"><FaUser /> Profile</NavLink>
        <button className="logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
      </nav>
    </div>
  );
};

export default Sidebar;
