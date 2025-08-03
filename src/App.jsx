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
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AddProblems from "./components/AddProblems";
import CreateProblem from "./components/CreateProblem";
import OverallLeaderboard from "./components/OverallLeaderboard";
import ManageDevelopers from "./components/ManageDevelopers";
import ManageRecruiters from "./components/ManageRecruiters";
import AdminLayout from "./components/AdminLayout"; // Add this import
import ManageContests from "./components/ManageContests";
import RecruiterDashboard from "./components/RecruiterDashboard";
import RecruiterLayout from "./components/RecruiterLayout";

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

      <Route path="/recruiter/dashboard" element={<RecruiterLayout><RecruiterDashboard /></RecruiterLayout>} />


      {/* ✅ Admin-only routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin-dashboard"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/add-problems"
        element={
          <AdminLayout>
            <AddProblems />
          </AdminLayout>
        }
      />
      <Route
        path="/create"
        element={
          <AdminLayout>
            <CreateProblem />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/manage-developers"
        element={
          <AdminLayout>
            <ManageDevelopers />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/manage-recruiters"
        element={
          <AdminLayout>
            <ManageRecruiters />
          </AdminLayout>
        }
      />
            <Route
        path="/admin/manage-contests"
        element={
          <AdminLayout>
            <ManageContests />
          </AdminLayout>
        }
      />

      {/* <Route path="/admin/manage-users" element={<ManageUsers />} />
      <Route path="/admin/manage-contests" element={<ManageContests />} />
      <Route path="/admin/reports" element={<Reports />} /> */}
      {/* ✅ Routes with sidebar (Developer/Recruiter UI) */}
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
        path="/contest-details/:id"
        element={
          <LayoutWithSidebar>
            <ContestDetails />
          </LayoutWithSidebar>
        }
      />
      <Route
        path="/overall-leaderboard"
        element={
          <LayoutWithSidebar>
            <OverallLeaderboard />
          </LayoutWithSidebar>
        }
      />
    </Routes>
  );
}

export default App;
