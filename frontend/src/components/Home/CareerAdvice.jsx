import React from "react";

const advice = [
  {
    id: 1,
    title: "How to Write a Standout Resume",
    link: "#",
    desc: "Tips and templates to help you craft a resume that gets noticed."
  },
  {
    id: 2,
    title: "Nail Your Next Interview",
    link: "#",
    desc: "Common questions, best practices, and confidence boosters."
  },
  {
    id: 3,
    title: "Top Skills in Demand for 2025",
    link: "#",
    desc: "Stay ahead by upskilling in these trending areas."
  }
];

const CareerAdvice = () => (
  <section style={{ padding: "56px 0", background: "#fff" }}>
    <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: "2rem", marginBottom: 32 }}>
      Career Advice & Resources
    </h2>
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: 32,
      flexWrap: "wrap",
      maxWidth: 900,
      margin: "0 auto"
    }}>
      {advice.map(a => (
        <a key={a.id} href={a.link} style={{
          background: "#f3f4f6",
          borderRadius: 16,
          padding: 28,
          width: 260,
          textDecoration: "none",
          color: "#222",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.2s"
        }}>
          <h3 style={{ fontWeight: 600, fontSize: "1.05rem", marginBottom: 10 }}>{a.title}</h3>
          <p style={{ color: "#555", fontSize: "0.97rem", margin: 0 }}>{a.desc}</p>
        </a>
      ))}
    </div>
  </section>
);

export default CareerAdvice;
