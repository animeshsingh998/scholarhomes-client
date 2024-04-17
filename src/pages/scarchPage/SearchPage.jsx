import { useState } from "react";
import "./searchpage.css";
import ProductCard1 from "../../components/Navbar/ProductCard1/ProductCard1";
import { useEffect } from "react";
import { normalSearch, normalSearchFur } from "../../actions/productActions";

const SearchPage = (query) => {
  const [searchResults, setSearchResults] = useState([]);
  const token = window.localStorage.getItem("jwt");
  const handleSubmit = async () => {
    if (location.pathname !== "/Furnitures") {
      const res = await normalSearch(query, token);
      if (res.status === 400) {
        alert(res.message);
      } else {
        setSearchResults(res.result);
      }
    } else {
      const res = await normalSearchFur(query, token);
      if (res.status === 400) {
        alert(res.message);
      } else {
        setSearchResults(res.result);
      }
    }
  };

    useEffect(() => {
        handleSubmit();
    }, []);
  return (
    <div className="searchPage">
      <h1>Search Results</h1>
      
      <div className="sResults">
        <div className="allProdss">
          {searchResults.length > 0 &&
            searchResults?.map((prod, id) => (
              <ProductCard1 key={`product${id}`} product={prod} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
