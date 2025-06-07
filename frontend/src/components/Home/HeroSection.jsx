import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeroSection.module.css";
import { FaBuilding, FaSuitcase, FaUsers, FaUserTie } from "react-icons/fa";

const stats = [
  { id: 1, title: "124", subTitle: "Live Jobs", icon: <FaSuitcase />, color: "#38b6ff" },
  { id: 2, title: "37", subTitle: "Registered Companies", icon: <FaBuilding />, color: "#43e97b" },
  { id: 3, title: "542", subTitle: "Active Job Seekers", icon: <FaUsers />, color: "#ffa534" },
  { id: 4, title: "18", subTitle: "Employers Hiring", icon: <FaUserTie />, color: "#ff6f61" },
];

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>
              <span className={styles.brand}>JobSaathi</span> – <span className={styles.tagline}>Your Job Mate</span>
            </h1>
            <h2 className={styles.subheadline}>
              India’s Fastest-Growing MERN Job Portal
            </h2>
            <p>
              Find your dream job or hire top talent. AI-powered search, instant applications, and real results. Join thousands of job seekers and connect with top companies across various industries.
            </p>
            <div className={styles.ctaRow}>
              <Link to="/job/getall" className={styles.ctaBtn}>Browse Jobs</Link>
              <Link to="/applications/me" className={styles.ctaBtnSecondary}>My Application</Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="/heroS.jpg" alt="Job search" />
          </div>
        </div>
        <div className={styles.statsSection}>
          {stats.map((item) => (
            <div className={styles.statCard} key={item.id}>
              <div
                className={styles.statIcon}
                style={{ backgroundColor: item.color + "22", color: item.color }}
              >
                {item.icon}
              </div>
              <div>
                <p className={styles.statNumber}>{item.title}</p>
                <p className={styles.statLabel}>{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
