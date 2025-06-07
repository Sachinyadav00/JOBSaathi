import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Context } from "../../main";
import JobFilters from "./JobFilters";
import JobCard from "./JobCard";
import "../../jobs.css"; // styling

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${baseURL}/api/v1/job/getall`, { withCredentials: true })
      .then((res) => setJobs(res.data.jobs))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!isAuthorized) navigateTo("/");
  }, [isAuthorized]);

  const filteredJobs = jobs.filter((job) => {
    const locationMatch = filters.location
      ? job.city === filters.location
      : true;
    const categoryMatch = filters.category
      ? job.category === filters.category
      : true;
    const jobTypeMatch = filters.jobType
      ? job.jobType === filters.jobType
      : true;

    const salaryMatch = filters.salary
      ? job.salary >= parseInt(filters.salary)
      : true;
    return locationMatch && categoryMatch && jobTypeMatch;
  });

  return (
    <div className="jobs-container">
      <JobFilters filters={filters} setFilters={setFilters} />
      <div className="jobs-content">
        <h1>AVAILABLE JOBS: {filteredJobs.length}</h1>

        <div className="jobs-grid">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
