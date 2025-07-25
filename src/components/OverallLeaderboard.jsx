import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OverallLeaderboard.css";

const OverallLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

useEffect(() => {
  axios
    .get("http://localhost:5000/api/leaderboard/overall/leaderboard")
    .then((res) => setLeaderboard(res.data))
    .catch((err) =>
      console.error("Error fetching overall leaderboard:", err)
    );
}, []);

  return (
    <div className="leaderboard">
      <h2>🏆 Overall Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Email</th>
            <th>Problems Solved</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length === 0 ? (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          ) : (
            leaderboard.map((entry, index) => (
              <tr key={entry.userId}>
                <td>{index + 1}</td>
                <td>{entry.name || "Anonymous"}</td>
                <td>{entry.email || "N/A"}</td>
                <td>{entry.problemsSolved}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OverallLeaderboard;
