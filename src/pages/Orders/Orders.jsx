import './orders.css';
import { useEffect, useState } from "react";
import { getMyOrders } from "../../actions/cartActions";
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const token = window.localStorage.getItem("jwt");
    const getOrders = async () => {
      const res = await getMyOrders(token);
      setOrders(res.orders);
    };
    useEffect(() => {
      getOrders();
    }, []);

  return (
    <div className="cartPage">
      <div className="cartPageContainer oord">
        <h2>Your Orders</h2>
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
            <h4>Status</h4>
          </div>
        </div>
        {orders?.length > 0 ? (
          orders?.map((order, id) => (
            <div className="cartCard" key={id}>
              <div className="pcBox">
                <h4>{id + 1}</h4>
              </div>
              <div className="pcBox">
                <h4>{order?.products.length}</h4>
              </div>
              <div className="pcBox">
                <h4>{order?.totalPrice}$</h4>
              </div>
              <div className="pcBox">
                <h4>{order?.createdAt.slice(0, 10)}</h4>
              </div>
              <div className="pcBox">
                {order?.status === "pending" ? (
                  <h4
                    style={{ color: "red", textShadow: "2px 2px 10px black" }}
                  >
                    PENDING
                  </h4>
                ) : (
                  <h4 style={{ color: "green" }}>COMPLETED</h4>
                )}
              </div>
            </div>
          ))
        ) : (
          <h3>You have no orders</h3>
        )}
        <Link to={"/return-policy"} className="rpolicy acb" target="_blank">
          Return Policy
        </Link>
      </div>
    </div>
  );
}

export default Orders