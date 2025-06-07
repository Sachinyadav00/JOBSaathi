import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import "../../PostJob.css";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  // New fields
  const [company, setCompany] = useState("");
  const [vacancy, setVacancy] = useState(1);
  const [jobType, setJobType] = useState("Full-time");

  // For company logo upload
  const [logo, setLogo] = useState(null); // file object
  const [logoPreview, setLogoPreview] = useState(""); // preview URL

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Redirect if not authorized or not employer
  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  // Preview logo image on selection
  const handleLogoChange = (file) => {
    if (!file) return;
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleJobPost = async (e) => {
    e.preventDefault();

    if (salaryType === "default") {
      toast.error("Please select a salary type.");
      return;
    }

    // Prepare form data for multipart upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("location", location);
    formData.append("company", company);
    formData.append("vacancy", vacancy);
    formData.append("jobType", jobType);

    if (salaryType === "Fixed Salary") {
      formData.append("fixedSalary", fixedSalary);
    } else if (salaryType === "Ranged Salary") {
      formData.append("salaryFrom", salaryFrom);
      formData.append("salaryTo", salaryTo);
    }

    if (logo) {
      formData.append("logo", logo);
    }

    try {
      const res = await axios.post(`${baseURL}/api/v1/job/post`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      // Reset form if needed
      setTitle("");
      setDescription("");
      setCategory("");
      setCountry("");
      setCity("");
      setLocation("");
      setCompany("");
      setVacancy(1);
      setJobType("Full-time");
      setSalaryType("default");
      setFixedSalary("");
      setSalaryFrom("");
      setSalaryTo("");
      setLogo(null);
      setLogoPreview("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job.");
    }
  };

  return (
    <div className="job_post page">
      <div className="container">
        <h3>POST NEW JOB</h3>
        <form onSubmit={handleJobPost}>
          <div className="wrapper">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="Frontend Web Development">
                Frontend Web Development
              </option>
              <option value="MERN Stack Development">
                MERN STACK Development
              </option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">
                MEAN STACK Development
              </option>
              <option value="MEVN Stack Development">
                MEVN STACK Development
              </option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>

          <div className="wrapper">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              required
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
          </div>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            required
          />

          {/* New fields for company, vacancy, jobType */}
          <div className="wrapper">
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company Name"
              required
            />
            <input
              type="number"
              value={vacancy}
              onChange={(e) => setVacancy(e.target.value)}
              placeholder="Number of Vacancies"
              min={1}
              required
            />
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>

          {/* Company Logo Upload */}
          <div className="wrapper">
            <label htmlFor="logo-upload">Upload Company Logo</label>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={(e) => handleLogoChange(e.target.files[0])}
            />
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Company Logo Preview"
                style={{
                  width: "120px",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>

          <div className="salary_wrapper">
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              required
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            <div>
              {salaryType === "default" ? (
                <p>Please provide Salary Type *</p>
              ) : salaryType === "Fixed Salary" ? (
                <input
                  type="number"
                  placeholder="Enter Fixed Salary"
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                  min={0}
                  required
                />
              ) : (
                <div className="ranged_salary">
                  <input
                    type="number"
                    placeholder="Salary From"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                    min={0}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Salary To"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                    min={salaryFrom || 0}
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <textarea
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            required
          />
          <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
