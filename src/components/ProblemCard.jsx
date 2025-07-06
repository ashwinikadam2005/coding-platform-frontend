import React from "react";
import "./ProblemCard.css";
import { useNavigate } from "react-router-dom";

const ProblemCard = ({ problem }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/run", { state: { problem } }); // 👈 Pass the problem via route state
  };

  return (
    <div className="problem-card" onClick={handleClick}>
      <h3>{problem.title}</h3>
      <p>{problem.description}</p>
      <div className="card-meta">
        <span className="category">{problem.category}</span>
        <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
          {problem.difficulty}
        </span>
      </div>
    </div>
  );
};

export default ProblemCard;
