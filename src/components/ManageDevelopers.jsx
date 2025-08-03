import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageDevelopers.css";

const ManageDevelopers = () => {
  const [developers, setDevelopers] = useState([]);
  const [selectedDev, setSelectedDev] = useState(null);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/all-developers");
        setDevelopers(res.data);
      } catch (err) {
        console.error("Error loading developers:", err);
      }
    };
    fetchDevelopers();
  }, []);

  const closePopup = () => {
    setSelectedDev(null);
  };

  return (
    <div className="developers-container">
      <h2 className="title">Manage Developers</h2>
      <div className="developers-grid">
        {developers.map((dev) => (
          <div
            key={dev._id}
            className="developer-card"
            onClick={() => setSelectedDev(dev)}
          >
            <h3>
              {dev.name}{" "}
              <span className="username">({dev.username})</span>
            </h3>
            <p>
              <strong>Email:</strong> {dev.email}
            </p>
            <p>
              <strong>Skills:</strong>{" "}
              {dev.skills?.slice(0, 3).join(", ") || "None"}
            </p>
          </div>
        ))}
      </div>

      {selectedDev && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>
              {selectedDev.name}{" "}
              <span className="username">({selectedDev.username})</span>
            </h3>
            <p><strong>Email:</strong> {selectedDev.email}</p>
            <p><strong>Phone:</strong> {selectedDev.phone || "N/A"}</p>
            <p><strong>Location:</strong> {selectedDev.location || "N/A"}</p>
            <p><strong>Skills:</strong> {selectedDev.skills?.join(", ") || "None"}</p>
            <p>
              <strong>Points:</strong> {selectedDev.points} &nbsp; | &nbsp;
              <strong>Stars:</strong> {selectedDev.stars} &nbsp; | &nbsp;
              <strong>Badges:</strong> {selectedDev.badges?.length || 0}
            </p>
            {selectedDev.links?.github && (
              <p>
                <strong>GitHub:</strong>{" "}
                <a href={selectedDev.links.github} target="_blank" rel="noreferrer">
                  {selectedDev.links.github}
                </a>
              </p>
            )}
            {selectedDev.links?.linkedin && (
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a href={selectedDev.links.linkedin} target="_blank" rel="noreferrer">
                  {selectedDev.links.linkedin}
                </a>
              </p>
            )}

            <button className="popup-close-button" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDevelopers;
