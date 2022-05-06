import React, { useState, useEffect, useContext } from 'react';
import Card from '../components/Card';
import ImgSlider from '../components/ImgSlider'
import '../App.css';
// import {Link} from 'react-router-dom';
import { ShopContext } from "../contexts/ShopContext";

function Shop() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [products, setProducts] = useContext(ShopContext);
  const fetchItems = async () => {
    // const data = await fetch('https://fortnite-api.theapinetwork.com/upcoming/get');

    // const items = await data.json();
    // console.log(items.data);
    // setItems(items.data);
    // setItems([{id:'1'},{id:'2'}]);
  }

  return (
    <div className="container">
      <br></br>
      {/* image slider here */}
      {/* <ImgSlider /> */}

      <h1 className="display-6 my-4">Products({products.length})</h1>
      <div className="row row-cols-1 row-cols-md-3 g-5">
        {/* product list loop here */}
        {products.map(product => (
          //single product
          <Card
            key={product.id}
            value={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
