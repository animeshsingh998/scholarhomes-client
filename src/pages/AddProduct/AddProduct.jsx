import { useState } from "react";
import "./addProduct.css";
import { addProduct } from "../../actions/productActions";

const AddProduct = () => {
  const token = window.localStorage.getItem("jwt");
  const [userData, setUserData] = useState({ category: "small" });
  const [sharePhoto, setSharePhoto] = useState("");
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const photoRaw = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(photoRaw);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setSharePhoto(Reader.result);
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addProduct(
      userData.name,
      userData.description,
      userData.category,
      userData.price,
      userData.phone,
      userData.address,
      sharePhoto,
      token
    );
    if (res.status === 200) {
      window.location.pathname = "/dashboard";
    } else {
      alert(res.message);
    }
  };
  return (
    <div className="addProduct">
      <div className="apContainer">
        <h1>Add Housing</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputEle">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              placeholder="Housing Name"
              required
              onChange={handleInputChange}
              autoCapitalize="true"
            />
          </div>
          <div className="inputEle">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Describe the housing."
              onChange={handleInputChange}
            />
          </div>
          <div className="inputEle">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={handleInputChange}
              required
            >
              <option value="small" defaultChecked>
                small
              </option>
              <option value="large">large</option>
              <option value="motel">motel</option>
            </select>
          </div>
          <div className="inputEle">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Seller Contact Number"
              required
              onChange={handleInputChange}
              autoCapitalize="true"
            />
          </div>
          <div className="inputEle">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Short address of house."
              required
              onChange={handleInputChange}
              autoCapitalize="true"
            />
          </div>
          <div className="inputEle">
            <label htmlFor="picture">Picture</label>
            <input
              type="file"
              name="picture"
              id="picture"
              // style={{ display: "none" }}
              onChange={(e) => handleFile(e)}
              accept="image/png, image/jpeg, image/jpg"
              required
            />
          </div>
          <div className="inputEle">
            <label htmlFor="Price">Price($)</label>
            <input
              type="number"
              name="price"
              min="0"
              max="10000"
              step="0.01"
              placeholder="Price"
              required
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
