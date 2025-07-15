import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Contests.css";

const Contests = () => {
  const [contests, setContests] = useState({ active: [], upcoming: [] });
  const [registeredContests, setRegisteredContests] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // ensure this is set after login/signup

  useEffect(() => {
    fetchContests();
    fetchUserRegisteredContests();
  }, []);

  const fetchContests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contests");
      const today = new Date();
      const sorted = { active: [], upcoming: [] };

      res.data.forEach((contest) => {
        const contestDate = new Date(contest.date);
        if (contestDate.toDateString() === today.toDateString()) {
          sorted.active.push(contest);
        } else if (contestDate > today) {
          sorted.upcoming.push(contest);
        }
      });
      setContests(sorted);
    } catch (err) {
      console.error("Error loading contests", err);
    }
  };

  const fetchUserRegisteredContests = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
      const registeredIds = res.data.registeredContests.map((c) => c._id);
      setRegisteredContests(registeredIds);
    } catch (err) {
      console.error("Error loading user data", err);
    }
  };

  const handleRegister = async (contestId, e) => {
    e.stopPropagation();
    try {
      await axios.post("http://localhost:5000/api/users/register-contest", {
        userId,
        contestId,
      });
      setRegisteredContests([...registeredContests, contestId]);
      alert("Registered successfully!");
    } catch (err) {
      alert("Already registered or error occurred.");
    }
  };

  const handleStartTest = (contestId, e) => {
    e.stopPropagation();
    navigate(`/contest/${contestId}`);
  };

  const handleViewDetails = (contestId) => {
    navigate(`/contest-details/${contestId}`);
  };

  const renderCard = (contest, isActive = false) => {
    const contestDate = new Date(contest.date).toDateString();
    const regDeadline = new Date(contest.date);
    regDeadline.setDate(regDeadline.getDate() - 2);

    const isRegistered = registeredContests.includes(contest._id);

    return (
      <div
        key={contest._id}
        className="contest-card"
        onClick={() => handleViewDetails(contest._id)}
      >
        <div className="contest-org">{contest.organization}</div>
        <h3>{contest.name}</h3>
        <p>{contest.description}</p>
        <p><strong>Date:</strong> {contestDate}</p>
        <p><strong>Status:</strong> {contest.status}</p>

        {!isActive && (
          <>
            <p><strong>Registration Last Date:</strong> {regDeadline.toDateString()}</p>
            {isRegistered ? (
              <button className="registered-btn" disabled>Registered</button>
            ) : (
              <button
                className="register-btn"
                onClick={(e) => handleRegister(contest._id, e)}
              >
                Register
              </button>
            )}
          </>
        )}

        {isActive && isRegistered && (
          <button className="start-btn" onClick={(e) => handleStartTest(contest._id, e)}>
            Start Contest
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="contest-page">
      <h1>Contests</h1>
      <div className="contest-section">
        <h2>🟢 Active Contests</h2>
        {contests.active.length > 0 ? (
          contests.active.map((contest) => renderCard(contest, true))
        ) : (
          <p>No active contests.</p>
        )}
      </div>
      <div className="contest-section">
        <h2>🕐 Upcoming Contests</h2>
        {contests.upcoming.length > 0 ? (
          contests.upcoming.map((contest) => renderCard(contest, false))
        ) : (
          <p>No upcoming contests.</p>
        )}
      </div>
    </div>
  );
};

export default Contests;
