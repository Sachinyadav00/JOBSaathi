// import React from "react";
// import styles from "./HowItWorks.module.css";
// import { FaUserPlus } from "react-icons/fa";
// import { MdFindInPage } from "react-icons/md";
// import { IoMdSend } from "react-icons/io";

// const HowItWorks = () => {
//   return (
//     <section className={styles.howItWorks}>
//       <div className={styles.container}>
//         <h3 className={styles.heading}>How JobSaathi Works</h3>
//         <div className={styles.steps}>
//           <div className={styles.card}>
//             <div className={styles.icon}><FaUserPlus /></div>
//             <h4 className={styles.title}>Create Account</h4>
//             <p className={styles.description}>
//               Sign up in seconds and create your profile to begin your career journey.
//             </p>
//           </div>
//           <div className={styles.card}>
//             <div className={styles.icon}><MdFindInPage /></div>
//             <h4 className={styles.title}>Find or Post a Job</h4>
//             <p className={styles.description}>
//               Explore thousands of jobs or post opportunities to find the right talent.
//             </p>
//           </div>
//           <div className={styles.card}>
//             <div className={styles.icon}><IoMdSend /></div>
//             <h4 className={styles.title}>Apply or Recruit</h4>
//             <p className={styles.description}>
//               Apply instantly or shortlist and connect with top candidates.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;



















import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const steps = [
  {
    id: 1,
    icon: <FaUserPlus />,
    title: "Create Account",
    desc: "Sign up and set up your profile in minutes."
  },
  {
    id: 2,
    icon: <MdFindInPage />,
    title: "Search & Apply",
    desc: "Find jobs that match your skills and interests."
  },
  {
    id: 3,
    icon: <IoMdSend />,
    title: "Get Hired",
    desc: "Connect with employers and land your dream job."
  }
];

const HowItWorks = () => (
  <section style={{ padding: "56px 0", background: "#fff" }}>
    <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: "2rem", marginBottom: 32 }}>
      How JobSaathi Works
    </h2>
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: 32,
      flexWrap: "wrap",
      maxWidth: 900,
      margin: "0 auto"
    }}>
      {steps.map(step => (
        <div key={step.id} style={{
          background: "#f3f4f6",
          borderRadius: 16,
          padding: 32,
          width: 240,
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <div style={{
            fontSize: 36,
            color: "#667eea",
            background: "#e0e7ff",
            borderRadius: "50%",
            width: 54,
            height: 54,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px"
          }}>{step.icon}</div>
          <h3 style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 10 }}>{step.title}</h3>
          <p style={{ color: "#555", fontSize: "0.97rem", margin: 0 }}>{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
