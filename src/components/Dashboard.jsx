import React from "react";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <DashboardHome />
      </div>
    </div>
  );
};

export default Dashboard;
