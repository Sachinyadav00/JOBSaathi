// import React from "react";
// import {
//   MdOutlineDesignServices,
//   MdOutlineWebhook,
//   MdAccountBalance,
//   MdOutlineAnimation,
// } from "react-icons/md";
// import { TbAppsFilled } from "react-icons/tb";
// import { FaReact } from "react-icons/fa";
// import { GiArtificialIntelligence } from "react-icons/gi";
// import { IoGameController } from "react-icons/io5";

// const categories = [
//   { id: 1, title: "Graphics & Design", subTitle: "305 Open Positions", icon: <MdOutlineDesignServices /> },
//   { id: 2, title: "Mobile App Development", subTitle: "500 Open Positions", icon: <TbAppsFilled /> },
//   { id: 3, title: "Frontend Web Development", subTitle: "200 Open Positions", icon: <MdOutlineWebhook /> },
//   { id: 4, title: "MERN STACK Development", subTitle: "1000+ Open Positions", icon: <FaReact /> },
//   { id: 5, title: "Account & Finance", subTitle: "150 Open Positions", icon: <MdAccountBalance /> },
//   { id: 6, title: "Artificial Intelligence", subTitle: "867 Open Positions", icon: <GiArtificialIntelligence /> },
//   { id: 7, title: "Video Animation", subTitle: "50 Open Positions", icon: <MdOutlineAnimation /> },
//   { id: 8, title: "Game Development", subTitle: "80 Open Positions", icon: <IoGameController /> },
// ];

// const PopularCategories = () => {
//   return (
//     <section style={{ padding: "60px 20px", backgroundColor: "#fff" }}>
//       <h2 style={{ textAlign: "center", fontWeight: "700", fontSize: "2.5rem", marginBottom: "40px", color: "#333" }}>
//         Popular Categories
//       </h2>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//           gap: "25px",
//           maxWidth: "1000px",
//           margin: "0 auto",
//         }}
//       >
//         {categories.map(({ id, icon, title, subTitle }) => (
//           <div
//             key={id}
//             style={{
//               backgroundColor: "#f5f7fa",
//               borderRadius: "15px",
//               padding: "25px",
//               boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
//               display: "flex",
//               alignItems: "center",
//               gap: "15px",
//               cursor: "pointer",
//               transition: "transform 0.3s ease",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//             onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           >
//             <div
//               style={{
//                 fontSize: "2.5rem",
//                 color: "#667eea",
//                 minWidth: "50px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               {icon}
//             </div>
//             <div>
//               <h3 style={{ margin: 0, fontWeight: "600", color: "#222" }}>{title}</h3>
//               <p style={{ margin: 0, color: "#555", fontSize: "0.9rem" }}>{subTitle}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default PopularCategories;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const categories = [
  { id: 1, title: "Graphics & Design", icon: <MdOutlineDesignServices /> },
  { id: 2, title: "Mobile App Development", icon: <TbAppsFilled /> },
  { id: 3, title: "Frontend Web Development", icon: <MdOutlineWebhook /> },
  { id: 4, title: "MERN STACK Development", icon: <FaReact /> },
  { id: 5, title: "Account & Finance", icon: <MdAccountBalance /> },
  {
    id: 6,
    title: "Artificial Intelligence",
    icon: <GiArtificialIntelligence />,
  },
  { id: 7, title: "Video Animation", icon: <MdOutlineAnimation /> },
  { id: 8, title: "Game Development", icon: <IoGameController /> },
];

const baseURL = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${baseURL}/api/v1/job/getall`;

const PopularCategories = () => {
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL, { withCredentials: true })
      .then((res) => {
        // Count jobs by category
        const counts = {};
        res.data.jobs.forEach((job) => {
          if (counts[job.category]) {
            counts[job.category]++;
          } else {
            counts[job.category] = 1;
          }
        });
        setCategoryCounts(counts);
        setLoading(false);
      })
      .catch(() => {
        setCategoryCounts({});
        setLoading(false);
      });
  }, []);

  return (
    <section style={{ padding: "56px 0", background: "#fff" }}>
      <h2
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "2rem",
          marginBottom: 32,
        }}
      >
        Popular Categories
      </h2>
      {loading ? (
        <div style={{ textAlign: "center", color: "#888" }}>Loading...</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 24,
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                background: "#f3f4f6",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                alignItems: "center",
                gap: 16,
                minHeight: 90,
                transition: "box-shadow 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  color: "#667eea",
                  background: "#e0e7ff",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cat.icon}
              </div>
              <div>
                <h3 style={{ margin: 0, fontWeight: 600, fontSize: "1.05rem" }}>
                  {cat.title}
                </h3>
                <p style={{ margin: 0, color: "#555", fontSize: "0.95rem" }}>
                  {categoryCounts[cat.title] || 0} Open Positions
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularCategories;
