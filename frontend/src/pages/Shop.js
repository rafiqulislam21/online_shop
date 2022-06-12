import React, { useState, useEffect, useContext } from 'react';
import Card from '../components/Card';
import '../App.css';
// import {Link} from 'react-router-dom';
import { ShopContext } from "../contexts/ShopContext";  
function Shop() {
  useEffect(() => {
    fetchItems();
  }, []);
  const [products, setProducts] = useContext(ShopContext);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  
  
  const fetchItems = async () => {

    fetch('http://localhost:5000/api/products')
    .then(res => res.json())
      .then(
        (jsonResponse) => {
          setIsLoaded(true);
          console.log(jsonResponse);
          setProducts(jsonResponse.response.products);      
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  if (error) {
    // return <div>Error: {error.message}</div>;
    return (
      <div className="container p-4">
        <div className="alert alert-danger" role="alert">
          Opps! Something went wrong.
        </div>
      </div>
      );
  } else if (!isLoaded) {
    return (
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      );
  }
  return (
    <div className="container">
      <br></br>
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
