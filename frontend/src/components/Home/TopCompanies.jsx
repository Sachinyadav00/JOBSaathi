import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const companies = [
  { id: 1, name: "Microsoft", location: "Gurugram", jobs: 10, logo: <FaMicrosoft /> },
  { id: 2, name: "Tesla", location: "Mumbai", jobs: 5, logo: <SiTesla /> },
  { id: 3, name: "Apple", location: "Bangalore", jobs: 20, logo: <FaApple /> }
];

const TopCompanies = () => (
  <section style={{ padding: "56px 0", background: "#f8fafc" }}>
    <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: "2rem", marginBottom: 32 }}>
      Top Companies
    </h2>
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: 32,
      flexWrap: "wrap",
      maxWidth: 900,
      margin: "0 auto"
    }}>
      {companies.map(company => (
        <div key={company.id} style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 6px 18px rgba(0,0,0,0.07)",
          padding: 24,
          width: 250,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{ fontSize: 48, color: "#667eea", marginBottom: 12 }}>{company.logo}</div>
          <h3 style={{ fontWeight: 600, fontSize: "1.1rem", margin: "8px 0" }}>{company.name}</h3>
          <span style={{ color: "#555", fontSize: "0.95rem", marginBottom: 6 }}>{company.location}</span>
          <button style={{
            background: "#ff6f61",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 20px",
            fontWeight: 600,
            marginTop: 14,
            cursor: "pointer"
          }}>
            {company.jobs} Open Positions
          </button>
        </div>
      ))}
    </div>
  </section>
);

export default TopCompanies;
