import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./CodeRunner.css";

const tabs = ["Problem", "Submissions", "Leaderboard", "Discussions"];

const CodeRunner = () => {
  const location = useLocation();
  const problem = location.state?.problem;

  const [selectedTab, setSelectedTab] = useState("Problem");
  const [code, setCode] = useState("// Write your code here");
  const [languageId, setLanguageId] = useState(71); // Python 3 default
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [allPassed, setAllPassed] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  const API_OPTIONS = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  useEffect(() => {
    if (problem?.sampleTestCases?.length > 0) {
      setInput(problem.sampleTestCases[0].input);
    }
  }, [problem]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (selectedTab === "Submissions" && problem?._id) {
        const userId = localStorage.getItem("userId");
        console.log(userId);
        try {
          const res = await axios.get(
            `http://localhost:5000/api/submissions/${problem._id}?userId=${userId}`
          );
          setSubmissions(res.data);
        } catch (err) {
          console.error("Failed to fetch submissions:", err);
        }
      }
    };
    fetchSubmissions();
  }, [selectedTab, problem]);

  const handleLanguageChange = (e) => {
    setLanguageId(parseInt(e.target.value));
    setCode("// Write your code here");
  };

  const runCode = async () => {
    if (!code.trim()) return alert("Please enter some code to run.");
    setLoading(true);
    setOutput("");

    try {
      const res = await axios.post(
        API_OPTIONS.url,
        {
          source_code: code,
          language_id: languageId,
          stdin: input.trim(),
        },
        { headers: API_OPTIONS.headers }
      );

      const result = res.data;
      const execOutput =
        result.stdout?.trim() ?? result.stderr?.trim() ?? "No output";
      setOutput(execOutput);
    } catch (err) {
      setOutput(`Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const submitCode = async () => {
    if (!problem?.testCases?.length) return alert("No test cases found.");
    if (!code.trim()) return alert("Please write some code before submitting.");

    setLoading(true);
    setResults([]);
    setOutput("");
    let passedAll = true;
    const tempResults = [];

    for (const [index, test] of problem.testCases.entries()) {
      try {
        const res = await axios.post(
          API_OPTIONS.url,
          {
            source_code: code,
            language_id: languageId,
            stdin: test.input,
          },
          { headers: API_OPTIONS.headers }
        );

        const actualOutput =
          res.data.stdout?.trim() ?? res.data.stderr?.trim() ?? "No output";
        const passed =
          actualOutput.replace(/\s+/g, "").toLowerCase() ===
          test.expectedOutput.trim().replace(/\s+/g, "").toLowerCase();

        if (!passed) passedAll = false;

        tempResults.push({
          input: test.input,
          expected: test.expectedOutput,
          actual: actualOutput,
          passed,
        });

        await delay(1500);
      } catch (err) {
        passedAll = false;
        tempResults.push({
          input: test.input,
          expected: test.expectedOutput,
          actual: err.message,
          passed: false,
        });
      }
    }

    setResults(tempResults);
    setAllPassed(passedAll);
    const userId = localStorage.getItem("userId"); // or however you store it

    if (passedAll) {
      try {
        await axios.post("http://localhost:5000/api/solved", {
          problemId: problem._id,
          title: problem.title,
          userCode: code,
          userId,
          languageId,
        });

        await axios.post("http://localhost:5000/api/submissions", {
          problemId: problem._id,
          title: problem.title,
          userCode: code,
          languageId,
          userId,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Error storing solved/submission:", err);
      }
    }

    setLoading(false);
  };
  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (selectedTab === "Leaderboard" && problem?._id) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/leaderboard/${problem._id}`
          );
          setLeaderboard(res.data);
        } catch (err) {
          console.error("Failed to fetch leaderboard:", err);
        }
      }
    };

    fetchLeaderboard();
  }, [selectedTab, problem]);

  return (
    <div className="code-runner-container">
      <div className="code-tabs">
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

      {selectedTab === "Problem" && (
        <>
          {problem && (
            <div className="problem-details">
              <h2>{problem.title}</h2>
              <p>
                <strong>Description:</strong> {problem.description}
              </p>
              <p>
                <strong>Input Format:</strong> {problem.inputFormat}
              </p>
              <p>
                <strong>Output Format:</strong> {problem.outputFormat}
              </p>
              {problem.sampleTestCases?.length > 0 && (
                <>
                  <h4>Sample Test Cases:</h4>
                  <ul>
                    {problem.sampleTestCases.map((sample, idx) => (
                      <li key={idx}>
                        <strong>Input:</strong> <pre>{sample.input}</pre>
                        <strong>Expected Output:</strong>{" "}
                        <pre>{sample.expectedOutput}</pre>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          <div className="language-select">
            <label>Language:</label>
            <select
              onChange={handleLanguageChange}
              value={languageId}
              disabled={loading}
            >
              <option value="71">Python 3</option>
              <option value="63">JavaScript (Node.js)</option>
              <option value="54">C++</option>
              <option value="62">Java</option>
            </select>
          </div>

          <textarea
            className="code-editor"
            rows={12}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Write your solution here"
            disabled={loading}
          ></textarea>

          <label>Custom Input:</label>
          <textarea
            className="input-box"
            rows={3}
            placeholder="Enter input (if required)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          ></textarea>

          <div className="button-group">
            <button onClick={runCode} disabled={loading}>
              {loading ? "Running..." : "Run Code"}
            </button>
            <button onClick={submitCode} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

          <h3>Output:</h3>
          <pre className="output-area">{output}</pre>

          {allPassed && (
            <div className="success-banner">🎉 All test cases passed!</div>
          )}

          {results.length > 0 && (
            <>
              <h3>Test Case Results:</h3>
              <ul className="test-results">
                {results.map((r, idx) => (
                  <li key={idx} className={r.passed ? "pass" : "fail"}>
                    <strong>Test {idx + 1}</strong>
                    <br />
                    <strong>Input:</strong> <pre>{r.input}</pre>
                    <strong>Expected:</strong> <pre>{r.expected}</pre>
                    <strong>Actual:</strong> <pre>{r.actual}</pre>
                    <strong>Status:</strong>{" "}
                    <span style={{ color: r.passed ? "green" : "red" }}>
                      {r.passed ? "✅ Passed" : "❌ Failed"}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}

      {selectedTab === "Submissions" && (
        <div className="submissions-section">
          <h3>Previous Submissions</h3>
          {submissions.length === 0 ? (
            <p>No submissions yet.</p>
          ) : (
            <ul className="submission-list">
              {submissions.map((s, idx) => (
                <li key={idx} className="submission-item">
                  <pre>
                    <strong>Language ID:</strong> {s.languageId}
                  </pre>
                  <pre>
                    <strong>Code:</strong> {s.userCode}
                  </pre>
                  <pre>
                    <strong>Submitted At:</strong>{" "}
                    {new Date(s.timestamp).toLocaleString()}
                  </pre>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {selectedTab === "Leaderboard" && (
        <div className="leaderboard-section">
          <h3>🏆 Leaderboard</h3>
          {leaderboard.length === 0 ? (
            <p>No one has solved this problem yet.</p>
          ) : (
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Language</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{entry.name}</td>
                    <td>{entry.email}</td>
                    <td>{entry.languageName}</td>
                    <td>{new Date(entry.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {selectedTab !== "Problem" &&
        selectedTab !== "Submissions" &&
        !(selectedTab === "Leaderboard" && leaderboard.length > 0) && (
          <div className="coming-soon">
            <p>{selectedTab} section coming soon!</p>
          </div>
        )}
    </div>
  );
};

export default CodeRunner;
