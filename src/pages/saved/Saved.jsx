import { useEffect, useState } from 'react';
import { getAllSaved } from '../../actions/productActions';
import './saved.css'
import ProductCard1 from '../../components/Navbar/ProductCard1/ProductCard1';

const Saved = () => {
    const [savedHousings, setSavedHousings] = useState([]);
    const [savedFurnitures, setSavedFurnitures] = useState([]);
      const token = window.localStorage.getItem("jwt");
    const getAllSave = async () => {
        const allSaved = await getAllSaved(token);
      setTimeout(() => {
        setSavedHousings(allSaved.data.savedHousings);
        setSavedFurnitures(allSaved.data.savedFurnitures);
      }, 1000);
    };

      useEffect(() => {
        getAllSave();
      }, []);

  return (
    <div className="savedItemPage">
      <h1>Your Saved Items</h1>
      <div className="savedSec">
        <h2>Saved Housings</h2>
        <div className="allProdss savedSSS">
          {savedHousings?.length > 0 ? (
            savedHousings?.map((product, id) => (
              <ProductCard1 key={`product${id}`} product={product} />
            ))
          ) : (
            <h3>You have saved no housings.</h3>
          )}
        </div>
      </div>
      <div className="savedSec">
        <h2>Saved Furnitures</h2>
        <div className="allProdss savedSSS">
          {savedFurnitures?.length > 0 ? (
            savedFurnitures?.map((product, id) => (
              <ProductCard1 key={`product${id}`} product={product} />
            ))
          ) : (
            <h3>You have saved no Furnitures.</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Saved