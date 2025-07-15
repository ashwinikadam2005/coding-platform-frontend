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
import RecruiterSignup from "./components/RecruiterSignup";
import LoginOptions from "./components/LoginOptions";
import UserProfile from "./components/UserProfile";
import RecruiterLogin from "./components/RecruiterLogin";
import Contests from "./components/Contests";
import ContestDetails from "./components/ContestDetails";

function App() {
  return (
    <Routes>
      {/* ✅ Routes without sidebar */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginOptions />} />

      <Route path="/choose-role" element={<ChooseRole />} />
      <Route path="/developer-signup" element={<Signup />} />
      <Route path="/developer-login" element={<Login />} />
      <Route path="/recruiter-signup" element={<RecruiterSignup />} />
      <Route path="/recruiter-login" element={<RecruiterLogin />} />

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
            <Route
        path="/profile"
        element={
          <LayoutWithSidebar>
            <UserProfile />
          </LayoutWithSidebar>
        }
      />
      <Route
        path="/contests"
        element={
          <LayoutWithSidebar>
            <Contests />
          </LayoutWithSidebar>
        }
      />
      <Route
        path="//contest-details/:id"
        element={
          <LayoutWithSidebar>
            <ContestDetails />
          </LayoutWithSidebar>
        }
      />


    </Routes>
  );
}

export default App;
