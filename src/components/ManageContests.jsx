import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageContests.css";

const ManageContests = () => {
  const [contests, setContests] = useState([]);
  const [activeTab, setActiveTab] = useState("All Contests");
  const [showPopup, setShowPopup] = useState(false);
  const [viewContest, setViewContest] = useState(null);

  const [newContest, setNewContest] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    organization: "Admin", // ADD THIS LINE

    questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }],
  });

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contests");
      setContests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  const filteredContests = () => {
    switch (activeTab) {
      case "Contests By You":
        return contests.filter((c) => c.organization === "Admin");
      case "Contests By Company":
        return contests.filter((c) => c.organization !== "Admin");
      default:
        return contests;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContest({ ...newContest, [name]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...newContest.questions];
    updated[index][field] = value;
    setNewContest({ ...newContest, questions: updated });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...newContest.questions];
    updated[qIndex].options[oIndex] = value;

    // Remove correct answer if it's not among options anymore
    if (!updated[qIndex].options.includes(updated[qIndex].correctAnswer)) {
      updated[qIndex].correctAnswer = "";
    }

    setNewContest({ ...newContest, questions: updated });
  };

  const addQuestion = () => {
    setNewContest({
      ...newContest,
      questions: [
        ...newContest.questions,
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
    });
  };

  const handleDeleteQuestion = (index) => {
    const updated = [...newContest.questions];
    updated.splice(index, 1);
    setNewContest({ ...newContest, questions: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = localStorage.getItem("role") || "admin";
      await axios.post("http://localhost:5000/api/contests", {
        ...newContest,
        createdBy: role,
      });
      setShowPopup(false);
      setNewContest({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        questions: [
          { question: "", options: ["", "", "", ""], correctAnswer: "" },
        ],
      });
      fetchContests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="manage-contests">
      <h2>Manage Contests</h2>

      <div className="tabs">
        {["All Contests", "Contests By You", "Contests By Company"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={activeTab === tab ? "active" : ""}
            >
              {tab}
            </button>
          )
        )}
      </div>

      <button className="create-btn" onClick={() => setShowPopup(true)}>
        + Create New Contest
      </button>

      <div className="contest-list">
        {filteredContests().map((contest, index) => (
          <div
            key={index}
            className="contest-card"
            onClick={() => setViewContest(contest)}
            style={{ cursor: "pointer" }}
          >
            <h3>{contest.name}</h3>
            <p>{contest.description}</p>
            <p>
              <strong>Start Date:</strong> {contest.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {contest.endDate}
            </p>
            <p>
              <strong>Created By:</strong> {contest.organization}
            </p>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <form onSubmit={handleSubmit}>
              <h3>Create New Contest</h3>

              <input
                type="text"
                name="name"
                placeholder="Contest Name"
                value={newContest.name}
                onChange={handleInputChange}
                required
              />

              <textarea
                name="description"
                placeholder="Contest Description"
                value={newContest.description}
                onChange={handleInputChange}
                required
              />

              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={newContest.startDate}
                onChange={handleInputChange}
                required
              />

              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={newContest.endDate}
                onChange={handleInputChange}
                required
              />

              {newContest.questions.map((q, qIndex) => (
                <div key={qIndex} className="question-block">
                  <button
                    type="button"
                    className="delete-question-btn"
                    onClick={() => handleDeleteQuestion(qIndex)}
                    title="Delete Question"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>

                  <input
                    type="text"
                    placeholder="Question"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, "question", e.target.value)
                    }
                    required
                  />

                  {q.options.map((opt, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      required
                    />
                  ))}

                  <select
                    value={q.correctAnswer}
                    onChange={(e) =>
                      handleQuestionChange(
                        qIndex,
                        "correctAnswer",
                        e.target.value
                      )
                    }
                    required
                  >
                    <option value="">Select Correct Answer</option>
                    {q.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt || `Option ${i + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <button type="button" onClick={addQuestion}>
                + Add Question
              </button>
              <button type="submit">Create Contest</button>
              <button type="button" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {viewContest && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>{viewContest.name}</h3>
            <p>
              <strong>Description:</strong> {viewContest.description}
            </p>
            <p>
              <strong>Start Date:</strong> {viewContest.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {viewContest.endDate}
            </p>
            <p>
              <strong>Organization:</strong> {viewContest.organization}
            </p>

            <div>
              <h4>Questions:</h4>
              {viewContest.questions?.map((q, idx) => (
                <div key={idx} className="question-view">
                  <p>
                    <strong>Q{idx + 1}:</strong> {q.question}
                  </p>
                  <ul>
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Correct Answer:</strong> {q.correctAnswer}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={async () => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this contest?"
                  )
                ) {
                  try {
                    await axios.delete(
                      `http://localhost:5000/api/contests/${viewContest._id}`
                    );
                    setViewContest(null);
                    fetchContests();
                  } catch (err) {
                    console.error("Delete failed", err);
                  }
                }
              }}
              className="delete-btn"
              style={{
                marginTop: "10px",
                margin:"5px",
                backgroundColor: "#d63a0fff", // greenish
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              🗑 Delete Contest
            </button>

            <button
              onClick={() => setViewContest(null)}
              style={{
                marginTop: "10px",
                backgroundColor: "#4CAF50", // greenish
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContests;
