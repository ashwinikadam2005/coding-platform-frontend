import React, { useState } from "react";
import axios from "axios";
import "./CreateProblem.css";

const CreateProblem = () => {
  const [problem, setProblem] = useState({
    title: "",
    description: "",
    difficulty: "",
    category: "",
    inputFormat: "",
    outputFormat: "",
    sampleTestCases: [{ input: "", expectedOutput: "" }],
    testCases: [{ input: "", expectedOutput: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem({ ...problem, [name]: value });
  };

  const handleTestCaseChange = (type, index, e) => {
    const updatedCases = [...problem[type]];
    updatedCases[index][e.target.name] = e.target.value;
    setProblem({ ...problem, [type]: updatedCases });
  };

  const addTestCase = (type) => {
    setProblem({
      ...problem,
      [type]: [...problem[type], { input: "", expectedOutput: "" }],
    });
  };

  const deleteTestCase = (type, index) => {
    const updatedCases = [...problem[type]];
    updatedCases.splice(index, 1);
    setProblem({ ...problem, [type]: updatedCases });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/problem /add", problem);
      alert("Problem added successfully!");
      setProblem({
        title: "",
        description: "",
        difficulty: "",
        category: "",
        inputFormat: "",
        outputFormat: "",
        sampleTestCases: [{ input: "", expectedOutput: "" }],
        testCases: [{ input: "", expectedOutput: "" }],
      });
    } catch (error) {
      console.error("Error adding problem:", error);
      alert("Failed to add problem.");
    }
  };

  return (
    <div className="create-problem">
      <h2>Add New Problem</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={problem.title} onChange={handleChange} placeholder="Title" required />

        <textarea name="description" value={problem.description} onChange={handleChange} placeholder="Description" required />

        {/* Difficulty Dropdown */}
        <select name="difficulty" value={problem.difficulty} onChange={handleChange} required>
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Category Dropdown (customizable) */}
        <select name="category" value={problem.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Arrays">Arrays</option>
          <option value="Strings">Strings</option>
          <option value="Math">Math</option>
          <option value="Graphs">Graphs</option>
          <option value="Dynamic Programming">Dynamic Programming</option>
        </select>

        <textarea name="inputFormat" value={problem.inputFormat} onChange={handleChange} placeholder="Input Format" />
        <textarea name="outputFormat" value={problem.outputFormat} onChange={handleChange} placeholder="Output Format" />

        <h4>Sample Test Cases</h4>
        {problem.sampleTestCases.map((tc, index) => (
          <div key={index} className="test-case">
            <input name="input" value={tc.input} onChange={(e) => handleTestCaseChange("sampleTestCases", index, e)} placeholder="Input" />
            <input name="expectedOutput" value={tc.expectedOutput} onChange={(e) => handleTestCaseChange("sampleTestCases", index, e)} placeholder="Expected Output" />
            {problem.sampleTestCases.length > 1 && (
              <button type="button" onClick={() => deleteTestCase("sampleTestCases", index)}>🗑️</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addTestCase("sampleTestCases")}>+ Add Sample Test Case</button>

        <h4>Hidden Test Cases</h4>
        {problem.testCases.map((tc, index) => (
          <div key={index} className="test-case">
            <input name="input" value={tc.input} onChange={(e) => handleTestCaseChange("testCases", index, e)} placeholder="Input" />
            <input name="expectedOutput" value={tc.expectedOutput} onChange={(e) => handleTestCaseChange("testCases", index, e)} placeholder="Expected Output" />
            {problem.testCases.length > 1 && (
              <button type="button" onClick={() => deleteTestCase("testCases", index)}>🗑️</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addTestCase("testCases")}>+ Add Hidden Test Case</button>

        <br />
        <button type="submit">✅ Submit Problem</button>
      </form>
    </div>
  );
};

export default CreateProblem;
