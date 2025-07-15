import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaPlus } from "react-icons/fa";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({ name: "", email: "", username: "" });
  const [form, setForm] = useState({
    phone: "",
    location: "",
    resumeUrl: "",
    skills: [],
    links: { github: "", linkedin: "" },
    experience: [], 
    education: "",
    badges: [],
    certifications: [],
  });

  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showSkillPopup, setShowSkillPopup] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showExperiencePopup, setShowExperiencePopup] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: "",
    role: "",
    from: "",
    to: "",
    description: "",
  });

  const [showEducationPopup, setShowEducationPopup] = useState(false);
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    start: "",
    end: "",
    gradeType: "",
    grade: "",
  });
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [selectedLinkType, setSelectedLinkType] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { name, email, username, ...rest } = res.data;
        setUser({ name, email, username });
        setForm({
          phone: rest.phone || "",
          location: rest.location || "",
          resumeUrl: rest.resumeUrl || "",
          skills: rest.skills || [],
          links: rest.links || { github: "", linkedin: "" },
          experience: rest.experience || [], 
          education: rest.education || [],
          badges: rest.badges || [],
          certifications: rest.certifications || [],
        });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("links.")) {
      const key = name.split(".")[1];
      setForm({ ...form, links: { ...form.links, [key]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    setUploading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/profile/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setForm((prev) => ({ ...prev, resumeUrl: res.data.resumeUrl }));
      setShowResumeUpload(false);
    } catch (err) {
      console.error("Resume upload failed:", err);
      alert("Resume upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleAddSkill = async () => {
    if (newSkill.trim() && !form.skills.includes(newSkill.trim())) {
      const updatedSkills = [...form.skills, newSkill.trim()];
      setForm((prev) => ({ ...prev, skills: updatedSkills }));
      setNewSkill("");
    }
  };

  const handleQuickAdd = (skill) => {
    if (!form.skills.includes(skill)) {
      const updatedSkills = [...form.skills, skill];
      setForm((prev) => ({ ...prev, skills: updatedSkills }));
    }
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      skills: form.skills.map((s) => s.trim()),
    };

    await axios.post("http://localhost:5000/api/profile", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Profile updated successfully");
    setEditPersonalInfo(false);
    setShowSkillPopup(false);
  };
  const handleAddExperience = async () => {
    if (
      newExperience.company &&
      newExperience.role &&
      newExperience.from &&
      newExperience.to
    ) {
      const updatedExperience = [...form.experience, newExperience];

      setForm((prev) => ({
        ...prev,
        experience: updatedExperience,
      }));

      const payload = {
        ...form,
        experience: updatedExperience,
        skills: form.skills.map((s) => s.trim()),
      };

      try {
        await axios.post("http://localhost:5000/api/profile", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Experience added successfully");
      } catch (error) {
        console.error("Error saving experience:", error);
        alert("Failed to save experience");
      }

      setNewExperience({
        company: "",
        role: "",
        from: "",
        to: "",
        description: "",
      });
      setShowExperiencePopup(false);
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleDeleteExperience = (index) => {
    const updated = [...form.experience];
    updated.splice(index, 1);
    setForm({ ...form, experience: updated });
  };
  const handleAddEducation = async () => {
    const updatedEducation = [...form.education, newEducation];
    setForm((prev) => ({ ...prev, education: updatedEducation }));
    const payload = {
      ...form,
      education: updatedEducation,
      skills: form.skills.map((s) => s.trim()),
    };

    try {
      await axios.post("http://localhost:5000/api/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Education added successfully");
    } catch (error) {
      console.error("Error saving education:", error);
      alert("Failed to save education");
    }

    setNewEducation({
      institution: "",
      degree: "",
      field: "",
      start: "",
      end: "",
      gradeType: "",
      grade: "",
    });
    setShowEducationPopup(false);
  };
  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <img src="/assets/avatar.png" alt="avatar" />
        <h2>{user.name}</h2>
        <p>@{user.username}</p>
      </div>

      <div className="profile-section personal-info-block">
        <div className="section-header">
          <h3>Personal Information</h3>
          <FaEdit
            className="edit-icon"
            onClick={() => setEditPersonalInfo(!editPersonalInfo)}
          />
        </div>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {form.phone || "Add your mobile number"}
        </p>
        <p>
          <strong>Location:</strong> {form.location || "Add your location"}
        </p>

        {editPersonalInfo && (
          <div className="edit-popup">
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Mobile Number"
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
            />
            <div className="edit-actions">
              <button onClick={() => setEditPersonalInfo(false)}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        )}
      </div>

      <div className="profile-section resume-section">
        <div className="section-header">
          <h3>Resume</h3>
          <FaPlus
            className="add-icon"
            onClick={() => setShowResumeUpload(true)}
          />
        </div>
        <p>
          Upload your resume to showcase your experience, skills, and
          qualifications.
        </p>
        {form.resumeUrl ? (
          <a
            href={`http://localhost:5000${form.resumeUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-link"
          >
            📄 View Uploaded Resume
          </a>
        ) : (
          <p style={{ color: "#888" }}>No resume uploaded</p>
        )}

        {showResumeUpload && (
          <div className="resume-popup">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
            {uploading && <p>Uploading...</p>}
            <button onClick={() => setShowResumeUpload(false)}>Cancel</button>
          </div>
        )}
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h3>Skills</h3>
          <FaPlus
            className="add-icon"
            onClick={() => setShowSkillPopup(true)}
          />
        </div>
        <p>
          {form.skills.length > 0
            ? form.skills.join(", ")
            : "No skills added yet"}
        </p>

        {showSkillPopup && (
          <div className="popup-overlay">
            <div className="popup-modal">
              <h4>My Skills</h4>
              <div className="skill-tags">
                {form.skills.map((s, i) => (
                  <span key={i} className="skill-tag">
                    {s.trim()}
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Search for skills"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <div className="quick-adds">
                {[
                  "Angular",
                  "Data Structure",
                  "Javascript(Intermediate)",
                  "NodeJs",
                  "Python(Advanced)",
                  "React",
                  "SQL",
                  "Python(Intermediate)",
                ].map((skill, i) => (
                  <button
                    key={i}
                    className="quick-skill"
                    onClick={() => handleQuickAdd(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <div className="popup-actions">
                <button onClick={() => setShowSkillPopup(false)}>Cancel</button>
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h3>Experience</h3>
          <FaPlus
            className="add-icon"
            onClick={() => setShowExperiencePopup(true)}
          />
        </div>

        {form.experience.length === 0 ? (
          <p>No experience added</p>
        ) : (
          form.experience.map((exp, i) => (
            <div key={i} className="experience-entry">
              <strong>{exp.role}</strong> at <em>{exp.company}</em>
              <br />
              {new Date(exp.from).toLocaleDateString()} -{" "}
              {new Date(exp.to).toLocaleDateString()}
              <p>{exp.description}</p>
              <button onClick={() => handleDeleteExperience(i)}>Delete</button>
            </div>
          ))
        )}

        {showExperiencePopup && (
          <div className="popup-overlay">
            <div className="popup-modal">
              <h4>Add Experience</h4>
              <input
                type="text"
                placeholder="Company Name"
                value={newExperience.company}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    company: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Role"
                value={newExperience.role}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, role: e.target.value })
                }
              />
              <input
                type="date"
                value={newExperience.from}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, from: e.target.value })
                }
              />
              <input
                type="date"
                value={newExperience.to}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, to: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                value={newExperience.description}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    description: e.target.value,
                  })
                }
              ></textarea>

              <div className="popup-actions">
                <button onClick={() => setShowExperiencePopup(false)}>
                  Cancel
                </button>
                <button onClick={handleAddExperience}>Add</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h3>Education</h3>
          <FaPlus
            className="add-icon"
            onClick={() => setShowEducationPopup(true)}
          />
        </div>

        {form.education.length === 0 ? (
          <p>No education added</p>
        ) : (
          form.education.map((edu, i) => (
            <div key={i} className="education-entry">
              <strong>{edu.degree}</strong> in <em>{edu.field}</em> at{" "}
              {edu.institution}
              <br />
              {new Date(edu.start).toLocaleDateString()} -{" "}
              {new Date(edu.end).toLocaleDateString()}
              <br />
              {edu.gradeType}: {edu.grade}
            </div>
          ))
        )}

        {showEducationPopup && (
          <div className="popup-overlay">
            <div className="popup-modal">
              <h4>Add Education</h4>
              <input
                type="text"
                placeholder="Institution Name"
                value={newEducation.institution}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    institution: e.target.value,
                  })
                }
              />
              <select
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, degree: e.target.value })
                }
              >
                <option value="">Select Degree</option>
                <option value="B.Sc">B.Sc</option>
                <option value="B.Com">B.Com</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Sc">M.Sc</option>
                <option value="M.Tech">M.Tech</option>
              </select>
              <input
                type="text"
                placeholder="Field of Study"
                value={newEducation.field}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, field: e.target.value })
                }
              />
              <input
                type="date"
                value={newEducation.start}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, start: e.target.value })
                }
              />
              <input
                type="date"
                value={newEducation.end}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, end: e.target.value })
                }
              />
              <select
                value={newEducation.gradeType}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    gradeType: e.target.value,
                  })
                }
              >
                <option value="">Select Grade Type</option>
                <option value="GPA">GPA</option>
                <option value="Percentage">Percentage</option>
              </select>
              <input
                type="text"
                placeholder="Grade"
                value={newEducation.grade}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, grade: e.target.value })
                }
              />
              <div className="popup-actions">
                <button onClick={() => setShowEducationPopup(false)}>
                  Cancel
                </button>
                <button onClick={handleAddEducation}>Add</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="profile-section">
        <div className="section-header">
          <h3>Links</h3>
          <FaPlus
            className="add-icon"
            onClick={() => setShowLinkEditor(true)}
          />
        </div>

        {/* Display existing links */}
        <div className="link-preview">
          {Object.entries(form.links).map(([type, url]) =>
            url ? (
              <p key={type}>
                <strong>{type.charAt(0).toUpperCase() + type.slice(1)}:</strong>{" "}
                <a href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              </p>
            ) : null
          )}
        </div>

        {/* Popup for adding/editing links */}
        {showLinkEditor && (
          <div className="popup-overlay">
            <div className="popup-modal">
              <h4>Add / Edit Link</h4>

              <select
                value={selectedLinkType}
                onChange={(e) => setSelectedLinkType(e.target.value)}
              >
                <option value="">Select Link Type</option>
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="portfolio">Portfolio</option>
                <option value="twitter">Twitter</option>
                <option value="website">Website</option>
              </select>

              {selectedLinkType && (
                <input
                  type="text"
                  placeholder={`Enter ${selectedLinkType} URL`}
                  value={form.links[selectedLinkType] || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      links: {
                        ...form.links,
                        [selectedLinkType]: e.target.value,
                      },
                    })
                  }
                />
              )}

              <div className="popup-actions">
                <button onClick={() => setShowLinkEditor(false)}>Cancel</button>
                <button
                  onClick={() => {
                    setShowLinkEditor(false);
                    setSelectedLinkType("");
                    handleSave();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default UserProfile;
