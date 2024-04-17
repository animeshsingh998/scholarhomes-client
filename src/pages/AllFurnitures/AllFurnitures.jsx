import { useEffect, useState } from "react";
import { getAllFurnitures, getAllProducts, normalSearch } from "../../actions/productActions";
import ProductCard1 from "../../components/Navbar/ProductCard1/ProductCard1";
import Loading from "../../components/loading/Loading";
import SearchPage from "../scarchPage/SearchPage";

const AllFurnitures = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("date");
  const token = window.localStorage.getItem("jwt");
  const changeActiveFilter = (filter) => {
    setActiveFilter(filter);
    handleFilter(filter)
  };
  const getAllProd = async () => {
    const allProdd = await getAllFurnitures(token);
    setTimeout(() => {
      setAllProducts(allProdd.products);
    }, 1000);
  };

  // const handleFilter = (filter) => {
  //   let test = AllProducts;

  //   if (filter === "date") {
  //     test.sort((a, b) => a.price - b.price);
  //     setAllProducts(test);
  //     console.log("here");
  //   }
  //   if (filter === "lowToHigh") {
  //   }
  //   if (filter === "highToLow") {
  //   }
  // };


  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    getAllProd();
  }, []);

  const handleSubmit = async () => {
    setSearchActive(true);
  };

  useEffect(() => {
    if (searchQuery.length < 1) {
      setSearchActive(false);
    }
  }, [searchQuery]);
  return (
    <div className="allProducts">
      <div className="searchInp">
        <input
          type="text"
          placeholder="Search for housing..."
          onChange={handleChange}
        />
        <button type="button" className="signin yolo" onClick={handleSubmit}>
          Search
        </button>
      </div>
      <div className="allProdContainer">
        {/* {searchActive || (
          <div className="sFilters">
            <span
              className={`sFilter ${activeFilter === "date" && "activeFilter"}`}
              onClick={() => changeActiveFilter("date")}
            >
              Latest
            </span>
            <span
              className={`sFilter ${
                activeFilter === "lowToHigh" && "activeFilter"
              }`}
              onClick={() => changeActiveFilter("lowToHigh")}
            >
              Price low to high
            </span>
            <span
              className={`sFilter ${
                activeFilter === "highToLow" && "activeFilter"
              }`}
              onClick={() => changeActiveFilter("highToLow")}
            >
              Price high to low
            </span>
          </div>
        )} */}
        {searchActive ? (
          <SearchPage query={searchQuery} />
        ) : (
          <>
            <h1>All Furnitures</h1>
            {allProducts?.length === 0 ? (
              <Loading />
            ) : (
              <div className="allProdss">
                {allProducts?.length > 0 ? (
                  allProducts?.map((product, id) => (
                    <ProductCard1 key={`product${id}`} product={product} />
                  ))
                ) : (
                  <h3>No housings were found or There was an error.</h3>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};


export default AllFurnitures;
