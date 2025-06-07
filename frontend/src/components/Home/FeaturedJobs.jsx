import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaRegBookmark, FaBookmark, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main"; // Adjust path if needed

const baseURL = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${baseURL}/api/v1/job/getall`;

function formatSalary(number) {
  if (!number) return "";
  return Number(number).toLocaleString("en-IN");
}

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const { user, isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  // Load jobs
  useEffect(() => {
    axios
      .get(API_URL, { withCredentials: true })
      .then((res) => {
        setJobs(res.data.jobs.slice(0, 3));
        setLoading(false);
      })
      .catch(() => {
        setJobs([]);
        setLoading(false);
      });
  }, []);

  // Load bookmarks from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarkedJobs") || "[]");
    setBookmarks(stored);
  }, []);

  // Toggle bookmark for a job
  const handleBookmark = (jobId) => {
    let updatedBookmarks;
    if (bookmarks.includes(jobId)) {
      updatedBookmarks = bookmarks.filter((id) => id !== jobId);
    } else {
      updatedBookmarks = [...bookmarks, jobId];
    }
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarkedJobs", JSON.stringify(updatedBookmarks));
  };

  const handleApply = (jobId) => {
    if (!isAuthorized) {
      navigate("/login");
      return;
    }
    if (user && user.role === "Job Seeker") {
      navigate(`/job/${jobId}`);
    }
  };

  return (
    <section style={{ padding: "56px 0 32px 0", background: "#f8fafc" }}>
      <h2
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "2rem",
          marginBottom: 32,
        }}
      >
        Featured Jobs
      </h2>
      {loading ? (
        <div style={{ textAlign: "center", color: "#888" }}>Loading...</div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {jobs.length > 0 ? (
            jobs.map((job) => {
              const isBookmarked = bookmarks.includes(job._id);
              return (
                <div
                  key={job._id || job.id}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.07)",
                    padding: 24,
                    width: 270,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    transition: "transform 0.2s",
                    position: "relative",
                  }}
                >
                  <img
                    src={
                      job.logo ||
                      "https://img.icons8.com/ios-filled/50/000000/company.png"
                    }
                    alt={job.company || "Company"}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      marginBottom: 12,
                      objectFit: "cover",
                    }}
                  />
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      margin: "8px 0",
                    }}
                  >
                    {job.title}
                  </h3>
                  <span
                    style={{
                      color: "#667eea",
                      fontWeight: 500,
                      marginBottom: 6,
                    }}
                  >
                    {job.company}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#555",
                      fontSize: "0.95rem",
                      marginBottom: 6,
                    }}
                  >
                    <FaMapMarkerAlt style={{ marginRight: 6 }} />{" "}
                    {job.location || job.country}
                  </div>
                  <div
                    style={{
                      fontSize: "0.95rem",
                      color: "#222",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        background: "#e0e7ff",
                        color: "#3730a3",
                        borderRadius: 12,
                        padding: "2px 10px",
                        marginRight: 8,
                      }}
                    >
                      {job.jobType || job.type}
                    </span>
                    <span
                      style={{
                        background: "#fef3c7",
                        color: "#b45309",
                        borderRadius: 12,
                        padding: "2px 10px",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                      }}
                    >
                      {job.fixedSalary
                        ? `₹${formatSalary(job.fixedSalary)}`
                        : job.salaryFrom && job.salaryTo
                        ? `₹${formatSalary(job.salaryFrom)} – ₹${formatSalary(
                            job.salaryTo
                          )}`
                        : "Negotiable"}
                    </span>
                  </div>
                  {user && user.role === "Job Seeker" ? (
                    <button
                      style={{
                        background: "#ff6f61",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 20px",
                        fontWeight: 600,
                        cursor: "pointer",
                        marginTop: "auto",
                      }}
                      onClick={() => handleApply(job._id)}
                    >
                      Apply Now
                    </button>
                  ) : (
                    <button
                      style={{
                        background: "#eee",
                        color: "#aaa",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 20px",
                        fontWeight: 600,
                        marginTop: "auto",
                        cursor: "not-allowed",
                      }}
                      title="Login as Job Seeker to apply"
                      disabled
                    >
                      Apply Now
                    </button>
                  )}
                  <span
                    style={{
                      position: "absolute",
                      top: 18,
                      right: 18,
                      color: isBookmarked ? "#1db954" : "#667eea",
                      fontSize: 22,
                      cursor: "pointer",
                      transition: "color 0.2s",
                    }}
                    title={isBookmarked ? "Remove Bookmark" : "Save Job"}
                    onClick={() => handleBookmark(job._id)}
                  >
                    {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                  </span>
                </div>
              );
            })
          ) : (
            <div style={{ color: "#888", textAlign: "center" }}>
              No featured jobs at the moment.
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default FeaturedJobs;
