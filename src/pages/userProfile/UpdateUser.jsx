import { useState } from "react";
import "./addProduct.css";
import { updateUser } from "../../actions/authActions";

const UpdateProfile = () => {
  const token = window.localStorage.getItem("jwt");
  const [userData, setUserData] = useState({});
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateUser(
      userData.name,
      userData.email,
      userData.studentId,
      token
    );
    if (res.status === 200) {
      alert(res.message)
      window.location.pathname = "/";
    } else {
      alert(res.message);
    }
  };
  return (
    <div className="addProduct">
      <div className="apContainer">
        <h1>Update User Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputEle">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              placeholder="Update Name"
              onChange={handleInputChange}
              autoCapitalize="true"
            />
          </div>
          <div className="inputEle">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Update Email"
              onChange={handleInputChange}
            />
          </div>
          <div className="inputEle">
            <label htmlFor="studentId">Student Id</label>
            <input
              type="text"
              name="studentId"
              placeholder="Update studentId"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
