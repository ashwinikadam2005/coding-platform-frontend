// src/components/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy credentials
    const adminEmail = "admin@coderank.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} className="admin-login-form">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
