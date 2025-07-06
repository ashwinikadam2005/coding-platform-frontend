import React, { useEffect, useState } from "react";
import axios from "axios";
import ProblemCard from "./ProblemCard"; // Already built

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/problem")
      .then(res => setProblems(res.data))
      .catch(err => console.error("Error fetching problems", err));
  }, []);

  return (
    <div>
      <h2 style={{ margin: "20px" }}>Practice Problems</h2>
      {problems.map((problem) => (
        <ProblemCard key={problem._id} problem={problem} />
      ))}
    </div>
  );
};

export default ProblemList;
