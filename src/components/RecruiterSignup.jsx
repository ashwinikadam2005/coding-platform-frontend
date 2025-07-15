import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RecruiterSignup.css";

const steps = [
  { id: 1, label: "Company Info", fields: ["companyName", "website"] },
  { id: 2, label: "Your Details", fields: ["recruiterName", "role", "contact"] },
  { id: 3, label: "Credentials", fields: ["email", "password"] },
];

const initialData = {
  companyName: "",
  website: "",
  recruiterName: "",
  role: "",
  contact: "",
  email: "",
  password: "",
};

const labels = {
  companyName: "Company Name",
  website: "Company Website",
  recruiterName: "Your Name",
  role: "Your Role",
  contact: "Contact Number",
  email: "Email Address",
  password: "Password",
};

const RecruiterSignup = () => {
  const [formData, setFormData] = useState(initialData);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  const currentStep = steps[stepIndex];

  const validate = () => {
    const errs = {};
    currentStep.fields.forEach((field) => {
      const value = formData[field].trim();
      if (!value) {
        errs[field] = "This field is required";
      } else {
        if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
          errs.email = "Please enter a valid email address";
        }
        if (field === "password" && value.length < 8) {
          errs.password = "Password must be at least 8 characters";
        }
        if (field === "contact" && !/^[0-9]{10}$/.test(value)) {
          errs.contact = "Enter a valid 10-digit contact number";
        }
      }
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const isCurrentStepValid = () => {
    return currentStep.fields.every((field) => {
      const value = formData[field].trim();
      if (!value) return false;
      if (field === "email") return /\S+@\S+\.\S+/.test(value);
      if (field === "password") return value.length >= 8;
      if (field === "contact") return /^[0-9]{10}$/.test(value);
      return true;
    });
  };

  const handleNext = () => {
    if (!validate()) return;
    if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStepIndex(stepIndex - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/recruiters/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerMessage(data.message || "Something went wrong");
      } else {
        setServerMessage(data.message);
        alert("Recruiter account created!");
        setFormData(initialData);
        setStepIndex(0);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setServerMessage("Network error. Please try again.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="recruiter-navbar">
        <div className="recruiter-navbar-logo">CodeRank</div>
        <Link to="/login" className="recruiter-navbar-login">Login</Link>
      </nav>

      {/* Layout */}
      <div className="recruiter-signup-page">
        {/* Image Section */}
        <div className="recruiter-signup-image-section">
          <img
            src="/assets/recruiter.jpg"
            alt="Recruiter Illustration"
            className="recruiter-signup-image"
          />
        </div>

        {/* Form Section */}
        <div className="recruiter-signup-wrapper">
          <div className="recruiter-signup-header">
            <h2>Begin Your Journey to Smarter Hiring</h2>
            <p className="recruiter-subtext">
              Quick signup. No credit card required. Work email only.
            </p>
          </div>

          <div className="recruiter-progress">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={`recruiter-step ${i <= stepIndex ? "active" : ""}`}
              >
                {s.label}
              </div>
            ))}
          </div>

          {serverMessage && (
            <div className="recruiter-server-message">
              {serverMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="recruiter-signup-form">
            {currentStep.fields.map((field) => (
              <div key={field} className="recruiter-input-group">
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  placeholder={labels[field]}
                  value={formData[field]}
                  onChange={handleChange}
                />
                {errors[field] && (
                  <span className="recruiter-error">{errors[field]}</span>
                )}
              </div>
            ))}

            <div className="recruiter-btn-group">
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="recruiter-active-btn"
                >
                  Back
                </button>
              )}
              {stepIndex < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className={
                    isCurrentStepValid()
                      ? "recruiter-active-btn"
                      : "recruiter-disabled-btn"
                  }
                  disabled={!isCurrentStepValid()}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className={
                    isCurrentStepValid()
                      ? "recruiter-active-btn"
                      : "recruiter-disabled-btn"
                  }
                  disabled={!isCurrentStepValid()}
                >
                  Create Account
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecruiterSignup;
