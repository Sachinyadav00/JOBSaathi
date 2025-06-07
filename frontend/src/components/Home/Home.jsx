// import React from "react";
// import { useContext } from "react";
// import { Context } from "../../main";
// import { Navigate } from "react-router-dom";
// import HeroSection from "./HeroSection";
// import HowItWorks from "./HowItWorks";
// import PopularCategories from "./PopularCategories";
// import PopularCompanies from "./PopularCompanies";

// const Home = () => {
//   const { isAuthorized } = useContext(Context);
//   if (!isAuthorized) {
//     return <Navigate to={"/login"} />;
//   }
//   return (
//     <>
//       <section className="homePage page">
//         <HeroSection />
//         <HowItWorks />
//         <PopularCategories />
//         <PopularCompanies />
//       </section>
//     </>
//   );
// };

// export default Home;

import React from "react";
import HeroSection from "./HeroSection";
import FeaturedJobs from "./FeaturedJobs";
import PopularCategories from "./PopularCategories";
import TopCompanies from "./TopCompanies";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import CareerAdvice from "./CareerAdvice";

const Home = () => (
  <main style={{ fontFamily: "'Poppins', sans-serif", background: "#f8fafc" }}>
    <HeroSection />
    <FeaturedJobs />
    <PopularCategories />
    <TopCompanies />
    <HowItWorks />
    <Testimonials />
    <CareerAdvice />
  </main>
);

export default Home;
