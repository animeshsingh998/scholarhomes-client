"use client";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { getUserDetails } from "../../actions/utils";
import { motion } from "framer-motion";

const Navbar = () => {
  const token = localStorage.getItem("jwt");
  const handleLogout = () => {
    window.localStorage.setItem('jwt', null);
    window.localStorage.setItem('user', null);
    window.localStorage.setItem("isAuthenticated", "false");
    window.location.pathname = "/";
  };
  let jwt = window.localStorage.getItem("jwt");
  var isAuthenticated = window.localStorage.getItem("isAuthenticated");
  const user = getUserDetails();

  return (
    <nav>
      <div className="lftSide">
        <motion.h2 animate={{ x: [-200, 0] }} transition={{ duration: 2 }}>
          <Link to="/">ScholarHomes</Link>
        </motion.h2>
      </div>
      <motion.div
        className="rgtSide"
        animate={{ x: [200, 0] }}
        transition={{ duration: 2 }}
      >
        {user?.type === "user" && (
          <Link to={"/user-profile"} className="primaryBtn usrPro">
            {user?.name || user.email.split("@")[0]}
          </Link>
        )}
        <Link to="/housings" className="signOut">
          Housings
        </Link>
        <Link to="/Furnitures" className="signOut">
          Furnitures
        </Link>
        {isAuthenticated === "true" ? (
          <>
            {user?.type === "admin" && (
              <Link to="/Dashboard" className="signOut">
                Dashboard
              </Link>
            )}
            {user?.type === "user" && (
              <Link to="/orders" className="signOut">
                Orders
              </Link>
            )}
            {user?.type === "user" && (
              <Link to="/saved" className="signOut">
                Saved
              </Link>
            )}
            {user?.type === "user" && (
              <a href="/cart" className="signOut">
                Cart
              </a>
            )}
            <button onClick={handleLogout} className="signin">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="signin">
              Sign in
            </Link>
            <Link to="/signup" className="signOut">
              Sign Up
            </Link>
          </>
        )}
      </motion.div>
    </nav>
  );
};

export default Navbar;
