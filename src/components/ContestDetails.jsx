import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ContestDetails.css"; 

const ContestDetails = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchContest();
    checkRegistrationStatus();
  }, []);

  const fetchContest = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/contests/${id}`);
      setContest(res.data);
    } catch (err) {
      console.error("Failed to fetch contest details", err);
    }
  };

  const checkRegistrationStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
      const registeredIds = res.data.registeredContests.map(c => c._id);
      setIsRegistered(registeredIds.includes(id));
    } catch (err) {
      console.error("Failed to check registration", err);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/register-contest", {
        userId,
        contestId: id,
      });
      setIsRegistered(true);
      alert("Registered successfully!");
    } catch (err) {
      alert("Registration failed or already registered.");
    }
  };

  const handleStartNow = () => {
    navigate(`/contest/${id}`);
  };

  if (!contest) return <p>Loading...</p>;

  return (
    <div className="contest-details">
      <h1>{contest.name}</h1>
      <p><strong>Organization:</strong> {contest.organization}</p>
      <p><strong>Date:</strong> {new Date(contest.date).toDateString()}</p>
      <p><strong>Description:</strong> {contest.description}</p>
      <p><strong>Status:</strong> {contest.status}</p>
      <p><strong>Category:</strong> {contest.category}</p>

      {isRegistered ? (
        contest.status === "active" ? (
          <button className="start-btn" onClick={handleStartNow}>Start Now</button>
        ) : (
          <button className="registered-btn" disabled>Already Registered</button>
        )
      ) : (
        <button className="register-btn" onClick={handleRegister}>Register</button>
      )}
    </div>
  );
};

export default ContestDetails;
