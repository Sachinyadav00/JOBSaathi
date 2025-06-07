import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import styles from "./MyApplication.module.css";

const statusColors = {
  selected: "#43e97b",
  rejected: "#ff6f61",
  pending: "#b0b0b0",
};

const MyApplications = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }
    const fetchApplications = async () => {
      try {
        const url =
          user && user.role === "Employer"
            ? `${baseURL}/api/v1/application/employer/getall`
            : `${baseURL}/api/v1/application/jobseeker/getall`;
        const res = await axios.get(url, { withCredentials: true });
        setApplications(res.data.applications);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch applications"
        );
      }
    };
    fetchApplications();
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;
    try {
      await axios.delete(`${baseURL}/api/v1/application/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Application Deleted!");
      setApplications((prev) =>
        prev.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete application"
      );
    }
  };

  // Employer: Update application status
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `${baseURL}/api/v1/application/status/${id}`,
        { status },
        { withCredentials: true }
      );
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status } : app))
      );
      toast.success(`Application marked as ${status}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className={styles.my_applications}>
      <div className={styles.container}>
        <h1>
          {user && user.role === "Job Seeker"
            ? "My Applications"
            : "Applications From Job Seekers"}
        </h1>
        <StatusLegend />
        {applications.length === 0 ? (
          <h4>No Applications Found</h4>
        ) : (
          applications.map((element) =>
            user && user.role === "Job Seeker" ? (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ) : (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
                updateStatus={updateStatus}
              />
            )
          )
        )}
      </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

// --- Status Legend ---
const StatusLegend = () => (
  <div className={styles.status_legend}>
    <span className={styles.selected}>Selected</span>
    <span className={styles.rejected}>Rejected</span>
    <span className={styles.pending}>Pending</span>
  </div>
);

// --- JobSeekerCard ---
const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  const status = (element.status || "pending").toLowerCase();

  // Only generate interview date if selected
  const interviewDate = status === "selected" ? getRandomInterviewDate() : null;

  // random date generator
  function getRandomInterviewDate() {
    const today = new Date();
    const minDays = 1;
    const maxDays = 7;
    const randomDays =
      Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
    const interviewDate = new Date(today);
    interviewDate.setDate(today.getDate() + randomDays);
    return interviewDate.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className={styles.application_card}>
      <div className={styles.application_detail}>
        {element.jobId && (
          <>
            <p>
              <span>Job Title:</span> {element.jobId.title || "N/A"}
            </p>
            <p>
              <span>Company:</span> {element.jobId.company || "N/A"}
            </p>
          </>
        )}
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
        {status === "selected" && (
          <div className={styles.congrats_box}>
            <strong>🎉 Congratulations!</strong>
            <div>
              Your application is <b>selected</b>.<br />
              Your interview is scheduled on <b>{interviewDate}</b>.
            </div>
          </div>
        )}
      </div>
      <div className={styles.application_resume}>
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className={styles.application_actions}>
        <span
          className={styles.status_badge}
          style={{
            background: statusColors[status] || statusColors["pending"],
          }}
        >
          {status}
        </span>
        <button
          onClick={() => deleteApplication(element._id)}
          className={styles.delete_btn}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// --- EmployerCard ---
const EmployerCard = ({ element, openModal, updateStatus }) => {
  const status = (element.status || "pending").toLowerCase();
  return (
    <div className={styles.application_card}>
      <div className={styles.application_detail}>
        {element.jobId && (
          <>
            <p>
              <span>Job Title:</span> {element.jobId.title || "N/A"}
            </p>
            <p>
              <span>Company:</span> {element.jobId.company || "N/A"}
            </p>
          </>
        )}
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div className={styles.application_resume}>
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className={styles.application_actions}>
        <span
          className={styles.status_badge}
          style={{
            background: statusColors[status] || statusColors["pending"],
          }}
        >
          {status}
        </span>
        <button
          onClick={() => updateStatus(element._id, "selected")}
          disabled={status === "selected"}
          className={styles.select_btn}
        >
          Select
        </button>
        <button
          onClick={() => updateStatus(element._id, "rejected")}
          disabled={status === "rejected"}
          className={styles.reject_btn}
        >
          Reject
        </button>
      </div>
    </div>
  );
};
