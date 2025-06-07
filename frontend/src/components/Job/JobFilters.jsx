import React from "react";
import styles from './JobFilters.module.css';


const JobFilters = ({ filters, setFilters }) => {
  // Handle click on radio input to toggle selection
  const handleClick = (e) => {
    const { name, value } = e.target;
    if (filters[name] === value) {
      // If clicked option is already selected, remove the filter
      const updated = { ...filters };
      delete updated[name];
      setFilters(updated);
    } else {
      // Otherwise, set the filter
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
   <aside className={styles.filters}>
  <h3>Filter Jobs</h3>

  <div className={styles['filter-section']}>
    <p>Location</p>
    {["Gurugram", "Bengaluru", "Mumbai", "Delhi", "Noida", "Pune"].map((loc) => (
      <label key={loc} className={styles.label}>
        <input
          type="radio"
          name="location"
          value={loc}
          checked={filters.location === loc}
          onClick={handleClick}
          onChange={() => {}} // no-op to suppress React warning
        />
        {loc}
      </label>
    ))}
  </div>

  <div className={styles['filter-section']}>
    <p>Category</p>
    {[
      "Mobile App Development",
      "Frontend Development",
      "Backend Development",
      "MERN Stack Development",
      "Account & Finance",
      "Artificial Intelligence",
      "Video Animation",
    ].map((cat) => (
      <label key={cat} className={styles.label}>
        <input
          type="radio"
          name="category"
          value={cat}
          checked={filters.category === cat}
          onClick={handleClick}
          onChange={() => {}}
        />
        {cat}
      </label>
    ))}
  </div>

  <div className={styles['filter-section']}>
    <p>Job Type</p>
    {["Full-time", "Part-time", "Contract", "Internship", "Temporary"].map(
      (type) => (
        <label key={type} className={styles.label}>
          <input
            type="radio"
            name="jobType"
            value={type}
            checked={filters.jobType === type}
            onClick={handleClick}
            onChange={() => {}}
          />
          {type}
        </label>
      )
    )}
  </div>
</aside>

  );
};

export default JobFilters;
