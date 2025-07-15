import React, { useState } from "react";
import "./RecruiterLogin.css";

const RecruiterLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    alert(`Login:\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="recruiter-page">
      <div className="left-panel">
        <img
          src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-42ac-61f7-854a-1c12f3c1194e/raw?se=2025-07-07T14%3A42%3A57Z&sp=r&sv=2024-08-04&sr=b&scid=b82b8d6f-969a-5cc7-bbd4-65d24351ee60&skoid=c953efd6-2ae8-41b4-a6d6-34b1475ac07c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-07T10%3A53%3A19Z&ske=2025-07-08T10%3A53%3A19Z&sks=b&skv=2024-08-04&sig=8eQPGTtyiOJHHLiArwglxddTu44NeAjjC1/0bQJrvAE%3D"
          alt="CodrRank"
          className="side-image"
        />
        <h1>Welcome Back, Recruiter!</h1>
        <p>Find the right talent faster with HackerRank for Work.</p>
      </div>

      <div className="right-panel">
        <div className="login-box">
          <h2>Recruiter Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Email or Username</label>
            <input
              type="text"
              placeholder="Enter your email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecruiterLogin;
