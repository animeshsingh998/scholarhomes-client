"use client";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./login.css";
import { useEffect, useState } from "react";
import { loginUser } from "../../actions/authActions";
import { motion } from "framer-motion";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  let isAuthenticated = window.localStorage.getItem("jwt");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(userData.email, userData.password);
    if (res.status === 200) {
      window.location.pathname = "/";
    } else {
      alert(res.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated !== "null") {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="loginPage">
      <motion.div
        className="loginFormContainer"
        animate={{ x: [-100, 0] }}
        transition={{ duration: 2 }}
      >
        <motion.h1
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          Login
        </motion.h1>
        <form onSubmit={handleSubmit}>
          <div className="inputEle">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@example.com"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="inputEle">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              required
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="formExtra">
          <Link to="/signup">Don't have a account? Sign Up!</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
