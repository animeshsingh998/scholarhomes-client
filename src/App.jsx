import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { getUserDetails } from "./actions/utils";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFoundRes from "./pages/NotFound/NotFoundRes";
import Loading from "./components/loading/Loading";
import { Suspense, useEffect } from "react";
import AddProduct from "./pages/AddProduct/AddProduct";
import AllProducts from "./pages/AllProducts/AllProducts";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Orders from "./pages/Orders/Orders";
import Sales from "./pages/sales/Sales";
import GiveAdmin from "./pages/GiveAdmin";
import { giveAdmin } from "./actions/authActions";
import AddFurniture from "./pages/addFurniture/AddFurniture";
import AllFurnitures from "./pages/AllFurnitures/AllFurnitures";
import ReturnPolicy from "./pages/ReturnPolicy/ReturnPolicy";
import Saved from "./pages/saved/Saved";
import Thank from "./pages/thank/Thank";
import UpdateProfile from "./pages/userProfile/UpdateUser";

function App() {
  const userTest = window.localStorage.getItem("jwt");
  if (!userTest) {
    window.localStorage.setItem("user", null);
    window.localStorage.setItem("jwt", null);
    window.localStorage.setItem("isAuthenticated", "false");
  }
  const user = getUserDetails();
  const adminn = async () => {
    const res = await giveAdmin();
  };

  useEffect(() => {
    adminn();
  }, []);
  return (
    <>
      <NotFoundRes />
      <div className="mainApp">
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/housings" element={<AllProducts />} />
            <Route path="/furnitures" element={<AllFurnitures />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route
              path="/dashboard"
              element={user?.type === "admin" ? <Dashboard /> : <NotFound />}
            />
            <Route
              path="/addProduct"
              element={user?.type === "admin" ? <AddProduct /> : <NotFound />}
            />
            <Route
              path="/thankYou"
              element={user?.type === "user" ? <Thank /> : <NotFound />}
            />
            <Route
              path="/cart"
              element={user?.type === "user" ? <Cart /> : <NotFound />}
            />
            <Route
              path="/saved"
              element={user?.type === "user" ? <Saved /> : <NotFound />}
            />
            <Route
              path="/orders"
              element={user?.type === "user" ? <Orders /> : <NotFound />}
            />
            <Route
              path="/user-profile"
              element={user?.type === "user" ? <UpdateProfile /> : <NotFound />}
            />
            <Route
              path="/sales"
              element={user?.type === "admin" ? <Sales /> : <NotFound />}
            />
            <Route
              path="/addFurniture"
              element={user?.type === "admin" ? <AddFurniture /> : <NotFound />}
            />
            {/* <Route
              path="/addVoucher"
              element={user?.type === "admin" ? <AddVoucher /> : <NotFound />}
            /> */}
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
