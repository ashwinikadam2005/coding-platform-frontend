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
  const [progress, setProgress] = useState(null);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const problemsRes = await axios.get("http://localhost:5000/api/problem");
        setProblems(problemsRes.data);

        const solvedRes = await axios.get(
          `http://localhost:5000/api/solved?userId=${currentUserId}`
        );
        const solved = solvedRes.data.map((item) => item.problemId.toString());
        setSolvedIds(solved);

        const progressRes = await axios.get(
          `http://localhost:5000/api/progress/${currentUserId}`
        );
        setProgress(progressRes.data);
      } catch (err) {
        console.error("Error fetching practice data:", err);
      }
    };

    if (currentUserId) {
      fetchData();
    }
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
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
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
        <div className="my-progress-section fade-in">
          <h2 className="progress-title">🚀 Your Coding Journey</h2>

          {progress ? (
            (() => {
              const level = Math.floor(progress.points / 150);
              const nextStarPoints = 100 - (progress.points % 100);
              const nextBadgeStars = 5 - (progress.stars % 5);
              const motivationalMessage =
                progress.points < 100
                  ? "Keep going! You're close to your first star! 💪"
                  : nextBadgeStars === 1
                  ? "1 more ⭐ for your next badge! Almost there! 🏆"
                  : "Great job! Keep climbing! 🚀";

              return (
                <div className="progress-container">
                  <div className="progress-cards">
                    <div className="progress-card level-card">
                      <span className="icon">🏅</span>
                      <p>Level</p>
                      <h3>{level}</h3>
                    </div>
                    <div className="progress-card">
                      <span className="icon">🎯</span>
                      <p>Points</p>
                      <h3>{progress.points}</h3>
                    </div>
                    <div className="progress-card">
                      <span className="icon">⭐</span>
                      <p>Stars</p>
                      <h3>{progress.stars}</h3>
                    </div>
                    <div className="progress-card">
                      <span className="icon">🎖️</span>
                      <p>Badges</p>
                      <h3>{progress.badges}</h3>
                    </div>
                  </div>

                  <div className="progress-bar-section">
                    <div className="bar-wrapper">
                      <h4>⭐ Progress to Next Star</h4>
                      <div className="progress-bar">
                        <div
                          className="progress-fill star"
                          style={{ width: `${progress.points % 100}%` }}
                        />
                      </div>
                      <p>{nextStarPoints} more points to next ⭐</p>
                    </div>

                    <div className="bar-wrapper">
                      <h4>🎖️ Badge Progress</h4>
                      <div className="progress-bar">
                        <div
                          className="progress-fill badge"
                          style={{ width: `${(progress.stars % 5) * 20}%` }}
                        />
                      </div>
                      <p>{nextBadgeStars} more ⭐ to next 🎖️</p>
                    </div>
                  </div>

                  <div className="motivational-box">
                    <p>{motivationalMessage}</p>
                  </div>
                </div>
              );
            })()
          ) : (
            <p className="text-center text-gray-600">Loading progress...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Practice;
