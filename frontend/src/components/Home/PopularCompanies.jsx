import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const companies = [
  { id: 1, title: "Microsoft", location: "Cyberhub, Gurugram", openPositions: 10, icon: <FaMicrosoft /> },
  { id: 2, title: "Wipro", location: "Apex Tower, Block A-13, Mumbai", openPositions: 5, icon: <SiTesla /> },
  { id: 3, title: "Apple", location: "Bangalore", openPositions: 20, icon: <FaApple /> },
];

const PopularCompanies = () => {
  return (
    <section style={{ padding: "60px 20px", backgroundColor: "#f9fafb" }}>
      <h2 style={{ textAlign: "center", fontWeight: "700", fontSize: "2.5rem", marginBottom: "40px", color: "#333" }}>
        Top Companies
      </h2>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {companies.map(({ id, icon, title, location, openPositions }) => (
          <div
            key={id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
              padding: "25px",
              width: "280px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={{ fontSize: "4rem", color: "#667eea", marginBottom: "15px" }}>{icon}</div>
            <h3 style={{ margin: "0 0 8px 0", fontWeight: "700", color: "#222" }}>{title}</h3>
            <p style={{ margin: "0 0 20px 0", color: "#555", fontSize: "0.95rem" }}>{location}</p>
            <button
              style={{
                backgroundColor: "#ff6f61",
                border: "none",
                padding: "10px 25px",
                borderRadius: "25px",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(255,111,97,0.4)",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ff4a3d")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff6f61")}
            >
              {openPositions} Open Positions
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCompanies;
