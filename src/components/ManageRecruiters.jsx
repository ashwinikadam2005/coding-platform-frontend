import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageRecruiters.css";

const ManageRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recruiters")
      .then((res) => setRecruiters(res.data))
      .catch((err) => console.error("Error fetching recruiters:", err));
  }, []);

  return (
    <div className="manage-recruiters">
      <h2>Manage Recruiters</h2>
      <div className="recruiter-list">
        {recruiters.map((r) => (
          <div
            key={r._id}
            className="recruiter-item"
            onClick={() => setSelectedRecruiter(r)}
          >
            <strong>{r.recruiterName}</strong>
            <span>{r.companyName}</span>
          </div>
        ))}
      </div>

      {selectedRecruiter && (
        <div
          className="recruiter-details-overlay"
          onClick={() => setSelectedRecruiter(null)}
        >
          <div
            className="recruiter-details-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedRecruiter.recruiterName}</h3>
            <p>
              <strong>Company:</strong> {selectedRecruiter.companyName}
            </p>
            <p>
              <strong>Email:</strong> {selectedRecruiter.email}
            </p>
            <p>
              <strong>Website:</strong> {selectedRecruiter.website || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {selectedRecruiter.role || "N/A"}
            </p>
            <p>
              <strong>Contact:</strong> {selectedRecruiter.contact}
            </p>
            <button onClick={() => setSelectedRecruiter(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRecruiters;
