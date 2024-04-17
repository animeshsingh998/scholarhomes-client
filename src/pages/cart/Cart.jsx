import { useEffect, useState } from "react";
import "./cart.css";
import {
  checkVoucher,
  clearUserCart,
  createOrder,
  getUserCart,
  removeFromCart,
} from "../../actions/cartActions";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [activePay, setActivePay] = useState('card');
  const [discount, setDiscount] = useState([]);
  const [address, setAddress] = useState("");
  const [valid, setValid] = useState(true);
  const token = window.localStorage.getItem("jwt");
  const [voucher, setVoucher] = useState("");
  const getCart = async () => {
    const res = await getUserCart(token);
    setCart(res.cart);
  };
  useEffect(() => {
    getCart();
  }, []);
  const handleDel = async (index) => {
    if (confirm("Are you sure you want to remove this item from your cart?")) {
      const res = await removeFromCart(index, token);
      if (cart.length === 1) {
        window.location.reload();
      }
      getCart();
      getTotalPrice();
    }
  };
    const changeActiveFilter = (filter) => {
      setActivePay(filter);
    };
  const getTotalPrice = () => {
    let price = 0;
    for (let i = 0; i < cart.length; i++) {
      const temp = cart[i]._doc?.price * cart[i].quantity;
      price = price + temp;
    }
    if (price < discount) {
      setDiscount(0);
    }
    if (discount > 0) {
      price = price - discount;
    }
    return price;
  };

  const handleCheckOut = async () => {
    const totalPrice = getTotalPrice();
    const res = await createOrder(cart, totalPrice, address, token);
    const currentOrder = {
      totalPrice: getTotalPrice(),
      totalItems: cart.length,
      address,
    };

    if (res.status === 200) {
      window.localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
      clearUserCart(token);
      window.location.pathname = "/thankYou";
    } else {
      alert(res.error);
    }
  };


  useEffect(() => {
    if (address?.length > 5) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [address]);


  return (
    <div className="cartPage">
      <div className="cartPageContainer">
        <h2>Your Cart</h2>
        <div className="cartHeader">
          <div className="chBox">
            <h4>ID</h4>
          </div>
          <div className="chBox">
            <h4>Name</h4>
          </div>
          <div className="chBox">
            <h4>Price</h4>
          </div>
          <div className="chBox">
            <h4>Quantity</h4>
          </div>
          <div className="chBox">
            <h4>Remove</h4>
          </div>
        </div>
        {cart?.length > 0 ? (
          cart?.map((cart, id) => (
            <div className="cartCard" key={id}>
              <div className="pcBox">
                <h4>{id + 1}</h4>
              </div>
              <div className="pcBox">
                <h4>{cart && cart?._doc?.name}</h4>
              </div>
              <div className="pcBox">
                <h4>{cart?._doc?.price}$</h4>
              </div>
              <div className="pcBox">
                <h4>{cart?.quantity}</h4>
              </div>
              <div className="pcBox">
                <button
                  className="delBtn"
                  onClick={() => handleDel(cart?._doc._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3>Your Cart is Empty</h3>
        )}
      </div>
      {cart?.length > 0 && (
        <div className="checkOut">
          <div className="checkOutContainer">
            <h1>Checkout</h1>
            <div className="coBox">
              <h3>Total Items</h3>
              <h2>{cart?.length}</h2>
            </div>
            <div className="coBox">
              <h3>Total Price</h3>
              <div className="cooBox">
                <div className="coBoxPrice">
                  {cart?.map((item, idx) => (
                    <h3 key={idx}>
                      +{item._doc?.price}$ x {item.quantity}
                    </h3>
                  ))}
                  <h3>{discount > 0 && `voucher -${discount}$`}</h3>
                </div>
                <h3 className="totalPrice">
                  <span
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: "red",
                    }}
                  >
                    Grand Total{" "}
                  </span>{" "}
                  {getTotalPrice()}$
                </h3>
              </div>
            </div>

            <div className="inputEle">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div className="rett">
              <input type="checkbox" name="return" id="return" />
              <Link to={"/return-policy"} className="rpolicy" target="_blank">
                Return Policy
              </Link>
            </div>
            <div className="payOptn">
              <h2>How would you like to pay?</h2>
              <div className="optBtns">
                <div className="sFilters">
                  <span
                    className={`sFilter ${
                      activePay === "card" && "activeFilter"
                    }`}
                    onClick={() => changeActiveFilter("card")}
                  >
                    Credit/ Debit Card
                  </span>
                  <span
                    className={`sFilter ${
                      activePay === "online" && "activeFilter"
                    }`}
                    onClick={() => changeActiveFilter("online")}
                  >
                    Net Banking
                  </span>
                  <span
                    className={`sFilter ${
                      activePay === "paypal" && "activeFilter"
                    }`}
                    onClick={() => changeActiveFilter("paypal")}
                  >
                    Pay Pal
                  </span>
                </div>
              </div>
            </div>
            <button
              className="primaryBtn"
              onClick={handleCheckOut}
              disabled={valid}
            >
              Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
