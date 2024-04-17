import React from "react";
import { useEffect, useState } from "react";
import { completeSale, getMySales } from "../../actions/cartActions";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const token = window.localStorage.getItem("jwt");
  const getSales = async () => {
    const res = await getMySales(token);
    setSales(res.sales);
  };
  useEffect(() => {
    getSales();
  }, []);

  const handleComplete = async (saleId) => {
    const res = await completeSale(saleId, token);
    if (res.status === 200) {

      window.location.reload();
    } else {
      alert(res.error);
    }
  };
  return (
    <div className="cartPage">
      <div className="cartPageContainer">
        <h2>Your Sales</h2>
        <div className="cartHeader">
          <div className="chBox">
            <h4>ID</h4>
          </div>
          <div className="chBox">
            <h4>Products</h4>
          </div>
          <div className="chBox">
            <h4>Price</h4>
          </div>
          <div className="chBox">
            <h4>Date Added</h4>
          </div>
          <div className="chBox">
            <h4>Address</h4>
          </div>
          <div className="chBox">
            <h4>Status</h4>
          </div>
        </div>
        {sales?.length > 0 ? (
          sales?.map((sales, id) => (
            <div className="cartCard" key={id}>
              <div className="pcBox">
                <h4>{id + 1}</h4>
              </div>
              <div className="pcBox">
                <h4>{sales?.products.length}</h4>
              </div>
              <div className="pcBox">
                <h4>{sales?.totalPrice}$</h4>
              </div>
              <div className="pcBox">
                <h4>{sales?.createdAt.slice(0, 10)}</h4>
              </div>
              <div className="pcBox">
                <h4>{sales?.address}</h4>
              </div>
              <div className="pcBox">
                {sales?.status === "pending" ? (
                  <button className="primaryBtn comBtn" onClick={()=>handleComplete(sales._id)}>Complete</button>
                ) : (
                  <h4
                    style={{ color: "green"}}
                  >
                    COMPLETED
                  </h4>
                )}
              </div>
            </div>
          ))
        ) : (
          <h3>You have no sales</h3>
        )}
      </div>
    </div>
  );
};

export default Sales;
