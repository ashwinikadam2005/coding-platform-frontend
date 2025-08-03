import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProblems.css";

const AddProblems = () => {
  const [problems, setProblems] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const navigate = useNavigate(); // ← for navigation

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/problem")
      .then((res) => setProblems(res.data))
      .catch((err) => console.error("Failed to fetch problems:", err));
  }, []);

  const filteredProblems =
    difficultyFilter === "All"
      ? problems
      : problems.filter((p) => p.difficulty === difficultyFilter);

  const closeModal = () => setSelectedProblem(null);

  return (
    <div>
      <div className="add-problems-container">

        {/* 🔗 Navigate to /create when clicked */}
        <button className="add-button" onClick={() => navigate("/create")}>
          + Add New Problem
        </button>

        <h2>Available Problems</h2>

        <div className="filter-section">
          <label>Filter by Difficulty: </label>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="card-grid">
          {filteredProblems.map((problem) => (
            <div
              key={problem._id}
              className={`problem-card ${problem.difficulty.toLowerCase()}`}
              onClick={() => setSelectedProblem(problem)}
            >
              <h3>{problem.title}</h3>
              <p><strong>Difficulty:</strong> {problem.difficulty}</p>
              <p><strong>Category:</strong> {problem.category}</p>
              <p className="description">{problem.description?.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>

      {selectedProblem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProblem.title}</h2>
            <p><strong>Difficulty:</strong> {selectedProblem.difficulty}</p>
            <p><strong>Category:</strong> {selectedProblem.category}</p>
            <p><strong>Description:</strong> {selectedProblem.description}</p>
            <p><strong>Input Format:</strong> {selectedProblem.inputFormat}</p>
            <p><strong>Output Format:</strong> {selectedProblem.outputFormat}</p>

            <div>
              <strong>Sample Test Cases:</strong>
              <ul>
                {selectedProblem.sampleTestCases?.map((tc, index) => (
                  <li key={index}>
                    <b>Input:</b> {tc.input} <br />
                    <b>Expected Output:</b> {tc.expectedOutput}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Hidden Test Cases:</strong>
              <ul>
                {selectedProblem.testCases?.map((tc, index) => (
                  <li key={index}>
                    <b>Input:</b> {tc.input} <br />
                    <b>Expected Output:</b> {tc.expectedOutput}
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-actions">
              <button className="edit-button" onClick={() => alert("Edit functionality coming soon!")}>Edit</button>
              <button className="close-button" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProblems;
