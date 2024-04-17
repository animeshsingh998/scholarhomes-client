import "./Homepage.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import image1 from "../../assets/house.jpg";
import { motion } from "framer-motion";

const Homepage = () => {

  return (
    <div className="homePage">
      <img src={image1} alt="logo" />
      <div className="homePText">
        <motion.h1
          className="adminHeroHeading"
          animate={{ x: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          Welcome to Furnished Housing.
        </motion.h1>
        <motion.h3 animate={{ x: [-200, 0] }} transition={{ duration: 2 }}>
          We offer affordable Houses that are well furnished and maintained.
        </motion.h3>
        <Link to="/housings" className="primaryBtn">
          See All Housings
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
