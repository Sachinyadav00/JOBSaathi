import React from "react";

const AppDownloadBanner = () => (
  <section style={{
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    padding: "48px 0",
    textAlign: "center"
  }}>
    <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 16 }}>
      Get JobSaathi on Your Phone
    </h2>
    <p style={{ fontSize: "1.1rem", marginBottom: 24 }}>
      Search and apply for jobs anytime, anywhere.
    </p>
    <div style={{ display: "flex", justifyContent: "center", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Play_2016_icon.svg" alt="Google Play" style={{ width: 120, height: 40, background: "#fff", borderRadius: 8, padding: 6 }} />
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" style={{ width: 120, height: 40, background: "#fff", borderRadius: 8, padding: 6 }} />
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://jobsaathi.com/app" alt="QR code" style={{ width: 80, height: 80, marginLeft: 16 }} />
    </div>
  </section>
);

export default AppDownloadBanner;
