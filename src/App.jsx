import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import ChooseRole from "./components/ChooseRole";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Practice from "./components/Practice";
import CodeRunner from "./components/CodeRunner";
import LayoutWithSidebar from "./components/LayoutWithSidebar";

function App() {
  return (
    <Routes>
      {/* ✅ Routes without sidebar */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/choose-role" element={<ChooseRole />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* ✅ Routes with sidebar */}
      <Route
        path="/dashboard"
        element={
          <LayoutWithSidebar>
            <Dashboard />
          </LayoutWithSidebar>
        }
      />
      <Route
        path="/practice"
        element={
          <LayoutWithSidebar>
            <Practice />
          </LayoutWithSidebar>
        }
      />
      <Route
        path="/run"
        element={
          <LayoutWithSidebar>
            <CodeRunner />
          </LayoutWithSidebar>
        }
      />
    </Routes>
  );
}

export default App;
