import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./CodeRunner.css";

const CodeRunner = () => {
  const location = useLocation();
  const problem = location.state?.problem; // ✅ Access problem passed via navigation

  const [code, setCode] = useState("// Write your code here");
  const [languageId, setLanguageId] = useState(71); // Python 3
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const runCode = async () => {
    setLoading(true);
    setOutput("");

    try {
      const res = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: languageId,
          stdin: input,
        },
        {
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": "991afe6b89msh36e446bd3d7871ep1994efjsna2d329b3385a",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      const result = res.data;
      setOutput(result.stdout || result.stderr || "No output");
    } catch (err) {
      console.error(err);
      setOutput("Error running code");
    }

    setLoading(false);
  };

  const submitCode = async () => {
    if (!problem?.testCases?.length) return;

    setLoading(true);
    setResults([]);

    const testResults = [];

    for (const test of problem.testCases) {
      try {
        const res = await axios.post(
          "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
          {
            source_code: code,
            language_id: languageId,
            stdin: test.input,
          },
          {
            headers: {
              "content-type": "application/json",
              "X-RapidAPI-Key": "991afe6b89msh36e446bd3d7871ep1994efjsna2d329b3385a",
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );

        const actualOutput = res.data.stdout?.trim();
        const passed =
          actualOutput?.toLowerCase() === test.expectedOutput.trim().toLowerCase();

        testResults.push({
          input: test.input,
          expected: test.expectedOutput,
          actual: actualOutput || res.data.stderr || "No output",
          passed,
        });
      } catch (err) {
        console.error(err);
        testResults.push({
          input: test.input,
          expected: test.expectedOutput,
          actual: "Error",
          passed: false,
        });
      }
    }

    setResults(testResults);
    setLoading(false);
  };

  return (
    <div className="code-runner-container">
      {problem && (
        <div className="problem-info">
          <h2>{problem.title}</h2>
          <p>{problem.description}</p>
        </div>
      )}

      <div className="language-select">
        <label>Language:</label>
        <select onChange={(e) => setLanguageId(parseInt(e.target.value))}>
          <option value="71">Python 3</option>
          <option value="63">JavaScript (Node.js)</option>
          <option value="54">C++</option>
          <option value="62">Java</option>
        </select>
      </div>

      <textarea
        className="code-editor"
        rows={10}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <label>Custom Input:</label>
      <textarea
        className="input-box"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

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

      {results.length > 0 && (
        <>
          <h3>Test Case Results:</h3>
          <ul className="test-results">
            {results.map((r, idx) => (
              <li key={idx} className={r.passed ? "pass" : "fail"}>
                <strong>Input:</strong> {r.input} <br />
                <strong>Expected:</strong> {r.expected} <br />
                <strong>Actual:</strong> {r.actual} <br />
                <strong>Status:</strong> {r.passed ? "✅ Passed" : "❌ Failed"}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CodeRunner;
