import React from "react";

const CallToAction = () => (
  <section style={{
    background: "linear-gradient(90deg, #ff6f61 0%, #ff9671 100%)",
    color: "#fff",
    padding: "56px 0",
    textAlign: "center"
  }}>
    <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 16 }}>
      Ready to Find Your Dream Job?
    </h2>
    <p style={{ fontSize: "1.1rem", marginBottom: 24 }}>
      Join JobSaathi today and take the next step in your career!
    </p>
    <a href="/register" style={{
      background: "#fff",
      color: "#ff6f61",
      padding: "14px 36px",
      borderRadius: "30px",
      fontWeight: 600,
      fontSize: "1.1rem",
      textDecoration: "none",
      transition: "background 0.2s"
    }}>
      Get Started
    </a>
  </section>
);

export default CallToAction;
