// src/components/AdminLayout.jsx
import React from "react";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <div style={{ paddingTop: "70px" }}>{children}</div>
    </>
  );
};

export default AdminLayout;
