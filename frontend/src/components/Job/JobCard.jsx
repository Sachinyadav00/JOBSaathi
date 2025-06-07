import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const JobCard = ({ job }) => {
  const [bookmarked, setBookmarked] = useState(false);

  // Check bookmark status on mount & when job changes
  useEffect(() => {
    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedJobs") || "[]"
    );
    setBookmarked(bookmarks.includes(job._id));
  }, [job._id]);

  // Toggle bookmark
  const handleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarkedJobs") || "[]");
    if (bookmarks.includes(job._id)) {
      bookmarks = bookmarks.filter((id) => id !== job._id);
      setBookmarked(false);
    } else {
      bookmarks.push(job._id);
      setBookmarked(true);
    }
    localStorage.setItem("bookmarkedJobs", JSON.stringify(bookmarks));
  };

  return (
    <div className="job-card">
      <div className="job-meta">
        <p className="posted-date">
          {new Date(job.createdAt).toLocaleDateString()}
        </p>
        <div className="company-info">
          <img
            src={job.logo || "/default-company-logo.png"}
            alt={`${job.company || "JobHunt"} logo`}
            className="job-company-logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-company-logo.png";
            }}
          />
          <p className="company">{job.company || "JobHunt"}</p>
        </div>
        <h3>{job.title}</h3>
        <p className="location">
          {job.city ? `${job.city}, ` : ""}
          {job.country}
        </p>
        <p className="description">{job.description?.slice(0, 80)}...</p>
      </div>
      <div className="job-tags">
        <span>{job.vacancy} positions</span>
        <span>{job.jobType}</span>
        <span>
          {job.fixedSalary
            ? `${job.fixedSalary} LPA`
            : job.salaryFrom && job.salaryTo
            ? `${job.salaryFrom} - ${job.salaryTo} LPA`
            : "Salary not specified"}
        </span>
      </div>
      <div className="job-actions">
        <Link className="details-btn" to={`/job/${job._id}`}>
          Details
        </Link>
        <button
          className={`save-btn${bookmarked ? " bookmarked" : ""}`}
          onClick={handleBookmark}
          aria-label={bookmarked ? "Remove Bookmark" : "Save For Later"}
        >
          {bookmarked ? "★ Bookmarked" : "☆ Save For Later"}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
