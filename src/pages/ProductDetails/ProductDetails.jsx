import { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { getProductById, saveThing } from "../../actions/productActions";
import small from "../../assets/small.jpg";
import large from "../../assets/large.jpg";
import motel from "../../assets/motel.jpg";

import { getUserDetails } from "../../actions/utils";
import { addToCart } from "../../actions/cartActions";

const ProductDetails = () => {
  const { id } = useParams();
  const user = getUserDetails();
  const token = window.localStorage.getItem("jwt");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);
  const getProd = async () => {
    const Prodd = await getProductById(id);
    setProduct(Prodd.product);
  };
  const showInterest = () => {
    alert(
      `An email to ${product?.soldBy?.email} has been sent indicating your interest in their product, expect a reply shortly!`
    );
  };
  useEffect(() => {
    getProd();
  }, []);

  const handleSaveThing = async () => {
    const res = await saveThing(product._id, token);
    if (res.status === 200) {
      alert("item has been saved!")
    }
  };

  const handleAddToCart = async () => {
    const res = await addToCart(product._id, quantity, token);
    if (res.status === 200) {
      window.location.pathname = "/housings";
    } else {
      alert(res.message);
    }
  };
  return (
    <div className="productDetails">
      <div className="pdLeft">
        <img src={product?.image} alt="pic" />
      </div>
      <div className="pdRight">
        <h1>
          {product.type === "furniture" ? "Furniture" : "Housing"} Details
        </h1>
        <h2>Name: {product?.name}</h2>
        <h3>Description: {product?.description}</h3>
        {product.type === "furniture" ? (
          <h3>Category: Furniture</h3>
        ) : (
          <h3>Category: {product?.category}</h3>
        )}
        <h3>
          Sold By: {product?.soldBy?.email}{" "}
          <button type="button" className="signin yolo" onClick={showInterest}>
            Show Interest
          </button>
        </h3>
        {product.type !== "furniture" && <h3>Address: {product?.address}</h3>}
        <h3>Contact Number: {product?.phone}</h3>
        <h3>Price: {product?.price}$</h3>
        {user?.type === "user" && (
          <>
            <div className="bootns">
              <button
                className="primaryBtn addCartBtn"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
              <button
                className="primaryBtn addCartBtn"
                onClick={handleSaveThing}
              >
                Save to profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
