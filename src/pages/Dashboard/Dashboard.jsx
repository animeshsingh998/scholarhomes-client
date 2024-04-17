import { deleteProduct, getMyProducts } from '../../actions/productActions';
import { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const token = window.localStorage.getItem("jwt");
    const [myProducts, setMyProducts] = useState({});
    const getMyProd = async () => {
        const myProdd = await getMyProducts(token);
        setMyProducts(myProdd.products)
    }
    useEffect(() => {
        getMyProd();  
    }, [])
    const handleDel = async (id) => {
        if (confirm("Are you sure you want to delete this Product?")) {
            const res = await deleteProduct(id, token);
            if (res.status === 200) {
                alert(res.message);
                getMyProd();
            } else {
              alert(res.message);
            }
        }
    };
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <motion.div
        className="dashTop"
        animate={{ x: [-200, 0] }}
        transition={{ duration: 2 }}
      >
        <Link to="/addProduct">Add Housing</Link>
        <Link to="/addFurniture">Add Furniture</Link>
        <Link to="/sales">Sales</Link>
      </motion.div>
      <motion.div
        className="dashBot"
        animate={{ y: [200, 0] }}
        transition={{ duration: 2 }}
      >
        <h2>Your Housings</h2>
        <div className="productsheader">
          <div className="pcBox">
            <h4>ID</h4>
          </div>
          <div className="pcBox">
            <h4>Name</h4>
          </div>
          <div className="pcBox">
            <h4>Price</h4>
          </div>
          <div className="pcBox">
            <h4>Delete</h4>
          </div>
        </div>
        {myProducts?.length > 0 ? (
          myProducts?.map((product, id) => (
            <div className="productCard" key={id}>
              <div className="pcBox">
                <h4>{id + 1}</h4>
              </div>
              <div className="pcBox">
                <h4>{product?.name}</h4>
              </div>
              <div className="pcBox">
                <h4>{product?.price}$</h4>
              </div>
              <div className="pcBox">
                <button
                  className="delBtn"
                  onClick={() => handleDel(product?._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3>No Products Yet</h3>
        )}
      </motion.div>
    </div>
  );
}

export default Dashboard