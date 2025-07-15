import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProblemCard.css";

const ProblemCard = ({ problem, isSolved }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/run", { state: { problem } });
  };

  return (
    <div className="problem-card">
      <div className="card-content" onClick={handleClick}>
        <h3>{problem.title}</h3>
        <p>{problem.description}</p>
        <div className="card-meta">
          <span className="category">{problem.category}</span>
          <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
        </div>
      </div>

      <div className="solve-status">
        <button
          className={`solve-btn ${isSolved ? "solved" : ""}`}
          onClick={handleClick}
        >
          {isSolved ? "✅ Solved" : "Solve Challenge"}
        </button>
      </div>
    </div>
  );
};

export default ProblemCard;
