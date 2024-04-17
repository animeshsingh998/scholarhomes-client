import './addVoucher.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
// import "./login.css";
import { useEffect, useState } from "react";
import { loginUser } from "../../actions/authActions";
import { addVoucher } from '../../actions/cartActions';

const AddVoucher = () => {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    let token = window.localStorage.getItem("jwt");
    const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await addVoucher(userData.name, userData.discount, token);
      if (res.status === 200) {
          navigate("/dashboard");
      } else {
        alert(res.error);
      }
    };

  return (
    <div className="loginPage">
      <div className="loginFormContainer">
        <h1>Add Voucher</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputEle">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="EXAMPLEVOUCHER50"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="inputEle">
            <label htmlFor="discount">Discount($)</label>
            <input
              type="number"
              name="discount"
              placeholder="20"
              required
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default AddVoucher