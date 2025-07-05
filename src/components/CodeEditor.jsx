import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/execute", {
        code,
        language,
      });
      setOutput(response.data.output);
    } catch (err) {
      setOutput("Error running code");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Code Editor</h2>

      <label>
        Language:
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
      </label>

      <Editor
        height="400px"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
      />

      <button onClick={runCode} style={{ marginTop: "10px" }}>
        Run Code
      </button>

      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
};

export default CodeEditor;
