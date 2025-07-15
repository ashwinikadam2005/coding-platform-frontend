import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        setSuccess("Account created successfully!");
        setTimeout(() => navigate("/developer-login"), 2000); 
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSignup = () => {
    alert("Google Signup functionality is not yet implemented.");
    // Later: redirect to Google OAuth endpoint here
  };

  return (
    <div className="signup-container">
      <h2>Create Your Account</h2>

      <button className="google-btn" onClick={handleGoogleSignup}>
        <FcGoogle size={22} style={{ marginRight: "10px" }} />
        Sign up with Google
      </button>

      <div className="divider">or</div>

      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
