import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer",
    text: "JobSaathi helped me land my dream job in just two weeks. The process was smooth and the recommendations were spot on!",
    img: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Hiring Manager, Wipro",
    text: "We found amazing talent through JobSaathi. The platform is intuitive and efficient for recruiters.",
    img: "https://randomuser.me/api/portraits/men/65.jpg"
  }
];

const Testimonials = () => (
  <section style={{ padding: "56px 0", background: "#f8fafc" }}>
    <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: "2rem", marginBottom: 32 }}>
      What Our Users Say
    </h2>
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: 32,
      flexWrap: "wrap",
      maxWidth: 900,
      margin: "0 auto"
    }}>
      {testimonials.map(t => (
        <div key={t.id} style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 6px 18px rgba(0,0,0,0.07)",
          padding: 32,
          width: 340,
          textAlign: "center"
        }}>
          <img src={t.img} alt={t.name} style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            marginBottom: 18,
            objectFit: "cover"
          }} />
          <p style={{ fontSize: "1.05rem", color: "#222", marginBottom: 16, fontStyle: "italic" }}>"{t.text}"</p>
          <span style={{ fontWeight: 600 }}>{t.name}</span>
          <div style={{ color: "#667eea", fontSize: "0.97rem" }}>{t.role}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
