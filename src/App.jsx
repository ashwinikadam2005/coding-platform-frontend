import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import CodeEditor from "./components/CodeEditor";
import ChooseRole from "./components/ChooseRole";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/choose-role" element={<ChooseRole />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/editor" element={<CodeEditor />} />
      <Route path="/login" element={<Login />} /> {/* ✅ Add this */}
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  );
}

export default App;
