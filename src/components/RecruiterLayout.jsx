// src/layouts/RecruiterLayout.jsx
import React from "react";
import RecruiterNavbar from "./RecruiterNavbar";

const RecruiterLayout = ({ children }) => {
  return (
    <>
      <RecruiterNavbar />
      <div style={{ padding: "20px" }}>{children}</div>
    </>
  );
};

export default RecruiterLayout;
