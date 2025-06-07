import React from "react";

const blogs = [
  {
    id: 1,
    title: "5 Ways to Stand Out in Your Next Interview",
    link: "#",
    date: "May 2025"
  },
  {
    id: 2,
    title: "How AI is Changing the Job Market",
    link: "#",
    date: "April 2025"
  }
];

const BlogHighlights = () => (
  <section style={{ padding: "56px 0", background: "#f8fafc" }}>
    <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: "2rem", marginBottom: 32 }}>
      From Our Blog
    </h2>
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: 32,
      flexWrap: "wrap",
      maxWidth: 900,
      margin: "0 auto"
    }}>
      {blogs.map(b => (
        <a key={b.id} href={b.link} style={{
          background: "#fff",
          borderRadius: 16,
          padding: 28,
          width: 340,
          textDecoration: "none",
          color: "#222",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.2s"
        }}>
          <h3 style={{ fontWeight: 600, fontSize: "1.07rem", marginBottom: 10 }}>{b.title}</h3>
          <span style={{ color: "#667eea", fontSize: "0.97rem" }}>{b.date}</span>
        </a>
      ))}
    </div>
  </section>
);

export default BlogHighlights;
