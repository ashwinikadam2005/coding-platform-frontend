import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="navbar">
        <div className="container">
          <h1 className="logo">CodeRank</h1>
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/choose-role">Sign Up</Link>
          </nav>
        </div>
      </header>

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
            {/* <Link to="/editor">
              <button className="btn link">For Developers</button>
            </Link> */}
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://undraw.co/api/illustrations/5b607164-e66d-4377-938b-e19a40836b88"
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
