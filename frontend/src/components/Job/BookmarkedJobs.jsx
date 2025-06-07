// BookmarkedJobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";

const BookmarkedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Get all jobs from the API
    axios
      .get(`${baseURL}/api/v1/job/getall`, { withCredentials: true })
      .then((res) => {
        const allJobs = res.data.jobs;
        const bookmarks = JSON.parse(
          localStorage.getItem("bookmarkedJobs") || "[]"
        );
        const bookmarkedJobs = allJobs.filter((job) =>
          bookmarks.includes(job._id)
        );
        setJobs(bookmarkedJobs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="jobs-container">
      <div className="jobs-content">
        <h1>Bookmarked Jobs: {jobs.length}</h1>
        <div className="jobs-grid">
          {loading ? (
            <p>Loading...</p>
          ) : jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p>No bookmarked jobs.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkedJobs;
