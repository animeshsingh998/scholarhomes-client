import './productCard1.css';
import { Link } from "react-router-dom";

const ProductCard1 = ({product}) => {
  const token = localStorage.getItem("jwt");
  return (
    <div className="productCard1">
      <div className="productCardData imgContainerData">
        <img src={product.image} alt="motel" />
      </div>
      <div className="productCardData">
        <h1>Name:</h1>
        <h2>{product.name}</h2>
      </div>
      <div className="productCardData">
        <h1>Price:</h1>
        <h2>{product.price}$</h2>
      </div>
      <Link to={`/product/${product._id}`} className="primaryBtn">
        Details
      </Link>
    </div>
  );
}

export default ProductCard1