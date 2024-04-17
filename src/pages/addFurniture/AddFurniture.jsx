import { useState } from "react";
import { addFurniture } from "../../actions/productActions";

const AddFurniture = () => {
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
    const res = await addFurniture(
      userData.name,
      userData.description,
      userData.phone,
      userData.price,
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
        <h1>Add Furniture</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputEle">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              placeholder="Furniture Name"
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
              placeholder="Describe the furniture"
              onChange={handleInputChange}
            />
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
            <label htmlFor="picture">Picture</label>
            <input
              type="file"
              name="picture"
              id="picture"
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

export default AddFurniture;
