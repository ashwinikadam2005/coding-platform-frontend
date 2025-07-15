import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Practice.css";
import ProblemCard from "./ProblemCard";

const tabs = ["Problems", "My Progress"];
const categories = ["All", "Array", "Linked List", "Strings", "Graphs", "Stack"];
const statusOptions = ["All", "Solved", "Unsolved"];

const Practice = () => {
  const [selectedTab, setSelectedTab] = useState("Problems");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [problems, setProblems] = useState([]);
  const [solvedIds, setSolvedIds] = useState([]);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/problem")
      .then((res) => setProblems(res.data))
      .catch((err) => console.error("Error fetching problems:", err));

    axios
      .get(`http://localhost:5000/api/solved?userId=${currentUserId}`)
      .then((res) => {
        const solved = res.data.map((item) => item.problemId.toString());
        setSolvedIds(solved);
      })
      .catch((err) => console.error("Error fetching solved problems:", err));
  }, [currentUserId]);

  const filteredProblems = problems.filter((p) => {
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    const isSolved = solvedIds.includes(p._id.toString());
    const matchStatus =
      selectedStatus === "All" ||
      (selectedStatus === "Solved" && isSolved) ||
      (selectedStatus === "Unsolved" && !isSolved);
    return matchCategory && matchStatus;
  });

  return (
    <div className="practice-page">
      <div className="practice-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {selectedTab === "Problems" && (
        <>
          <div className="practice-header">
            <h2>Practice Problems</h2>
            <div className="dropdown-filters">
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>

              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="problems-list">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => (
                <ProblemCard
                  key={problem._id}
                  problem={problem}
                  isSolved={solvedIds.includes(problem._id.toString())}
                />
              ))
            ) : (
              <p>No problems match your filters.</p>
            )}
          </div>
        </>
      )}

      {selectedTab === "My Progress" && (
        <div className="my-progress-section">
          <p>My Progress section coming soon!</p>
        </div>
      )}
    </div>
  );
};

export default Practice;
