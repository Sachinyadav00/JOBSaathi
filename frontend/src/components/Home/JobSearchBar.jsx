import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const JobSearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Build query string
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (location) params.append("location", location);
    // Navigate to jobs page with query params
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section style={{
      background: "#fff",
      padding: "32px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
    }}>
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
          maxWidth: 900,
          margin: "0 auto"
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "#f3f4f6",
          borderRadius: 8,
          padding: "0 12px"
        }}>
          <FaSearch style={{ color: "#667eea", marginRight: 8 }} />
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              padding: "12px 0",
              fontSize: "1rem",
              outline: "none",
              minWidth: 200
            }}
          />
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "#f3f4f6",
          borderRadius: 8,
          padding: "0 12px"
        }}>
          <FaMapMarkerAlt style={{ color: "#667eea", marginRight: 8 }} />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              padding: "12px 0",
              fontSize: "1rem",
              outline: "none",
              minWidth: 120
            }}
          />
        </div>
        <button type="submit" style={{
          background: "#667eea",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "12px 30px",
          fontWeight: 600,
          fontSize: "1rem",
          cursor: "pointer",
          transition: "background 0.2s"
        }}>
          Search Jobs
        </button>
        <button type="button" style={{
          background: "#fff",
          color: "#667eea",
          border: "2px solid #667eea",
          borderRadius: 8,
          padding: "12px 18px",
          fontWeight: 500,
          fontSize: "1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6
        }}>
          <FaFilter /> Filters
        </button>
      </form>
    </section>
  );
};

export default JobSearchBar;
