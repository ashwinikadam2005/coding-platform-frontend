import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Practice.css";
import ProblemCard from "./ProblemCard";

const tabs = ["Problems", "Submissions", "Leaderboard", "My Progress"];
const categories = ["All", "Array", "Linked List", "Strings", "Graphs", "Stack"];

const Practice = () => {
  const [selectedTab, setSelectedTab] = useState("Problems");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/problem")
      .then((res) => {
        setProblems(res.data);
      })
      .catch((err) => {
        console.error("Error fetching problems:", err);
      });
  }, []);

  const filteredProblems =
    selectedCategory === "All"
      ? problems
      : problems.filter((p) => p.category === selectedCategory);

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
            <div className="category-tab">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="problems-list">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => (
                <ProblemCard key={problem._id} problem={problem} />
              ))
            ) : (
              <p>No problems found in this category.</p>
            )}
          </div>
        </>
      )}

      {selectedTab !== "Problems" && (
        <div className="coming-soon">
          <p>{selectedTab} section coming soon!</p>
        </div>
      )}
    </div>
  );
};

export default Practice;
