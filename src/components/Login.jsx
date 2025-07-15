import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        // ✅ Store token and userId
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Sign-In coming soon!");
  };

  return (
    <div className="login-container">
      <h2>Login to CodeRank</h2>

      <button className="google-btn" onClick={handleGoogleLogin}>
        <FcGoogle size={22} style={{ marginRight: "10px" }} />
        Sign in with Google
      </button>

      <div className="divider">or</div>

      <form onSubmit={handleSubmit} className="login-form">
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

        <button type="submit">Login</button>
      </form>

      <p className="bottom-text">
        Don't have an account? <Link to="/developer-signup">Create one</Link>
      </p>
    </div>
  );
};

export default Login;
