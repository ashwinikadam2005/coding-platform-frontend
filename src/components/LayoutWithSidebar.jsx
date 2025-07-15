import React from "react";
import Sidebar from "./Sidebar";
import "./LayoutWithSidebar.css"; 

const LayoutWithSidebar = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="main-content">{children}</div>
    </>
  );
};

export default LayoutWithSidebar;
