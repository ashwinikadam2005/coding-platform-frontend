import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaUserTie } from "react-icons/fa";
import "./ChooseRole.css";

const ChooseRole = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleChoice = (role) => {
    setSelectedRole(role);
  };

  const handleCreateAccount = () => {
    if (selectedRole === "developer") navigate("/developer-signup");
    else if (selectedRole === "recruiter") navigate("/recruiter-signup");
  };

  return (
    <div className="role-container">
      <div className="role-header">
        <h2>Welcome to CodeRank</h2>
        <p>Choose the option that best describes you.</p>
      </div>

      <div className="role-options">
        <div
          className={`role-card ${
            selectedRole === "developer" ? "selected" : ""
          }`}
          onClick={() => handleChoice("developer")}
        >
          <div className="icon-wrapper developer">
            <FaUserGraduate size={40} />
          </div>
          <h3>I’m a Developer</h3>
          <p>Practice coding, participate in challenges, and get hired.</p>
        </div>

        <div
          className={`role-card ${
            selectedRole === "recruiter" ? "selected" : ""
          }`}
          onClick={() => handleChoice("recruiter")}
        >
          <div className="icon-wrapper recruiter">
            <FaUserTie size={40} />
          </div>
          <h3>I’m Hiring</h3>
          <p>Assess developers, manage interviews, and hire the best talent.</p>
        </div>
      </div>

      <div className="create-account-wrapper">
        <button
          className="create-account-btn"
          onClick={handleCreateAccount}
          disabled={!selectedRole}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default ChooseRole;
