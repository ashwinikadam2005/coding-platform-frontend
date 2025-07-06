import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="container">
          <h1 className="logo">CodeRank</h1>
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/choose-role">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-content">
          <h2>Practice Coding. Compete. Get Hired.</h2>
          <p>
            Solve real-world challenges, participate in contests, and sharpen
            your skills — just like HackerRank.
          </p>

          <div className="cta-buttons">
            <Link to="/choose-role">
              <button className="btn green">Start Free Trial</button>
            </Link>
            <Link to="/demo">
              <button className="btn outline">For Developers</button>
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://media.istockphoto.com/id/1448124439/vector/web-development-programming-and-code-testing-ui-concept-with-laptop-displaying-futuristic.jpg?s=2048x2048&w=is&k=20&c=0X5erQ6XjaLMfwWd3zUoigSAFSiFMHQAgw0mz2EvgvI="
            alt="coding"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} CodeRank. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
