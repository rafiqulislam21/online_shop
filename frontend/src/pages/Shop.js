import React, { useState, useEffect, useContext } from "react";
import Card from "../components/Card";
import "../App.css";

import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";

function Shop() {
  useEffect(() => {
    fetchItems();
    setUser(JSON.parse(localStorage.getItem('loggedUser')));
    setDatabase(JSON.parse(localStorage.getItem("database")));
  }, []);

  const [products, setProducts] = useContext(ShopContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [database, setDatabase] = useState(JSON.parse(localStorage.getItem("database")));

  const fetchItems = async () => {
    fetch("http://localhost:5000/api/products/" + database)
      .then((res) => res.json())
      .then(
        (jsonResponse) => {
          setIsLoaded(true);
          // console.log(jsonResponse);
          setProducts(jsonResponse.response.products);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

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
      <div className="row align-items-center justify-content-between">
        <div className="col">
          <h4 className="my-4">
            Products {products.length ? products.length : ""}
          </h4>
        </div>
        <div className="col-auto">
          {user?.user_role === "admin" ? (
            <Link to="/product/add">
              <button type="button" className="btn btn-primary">
                Add product
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
      <hr></hr>
      {!products.length ? (
        <h1 className="display-4 text-muted text-center">
          No products available!
        </h1>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-5">
          {/* product list loop here */}
          {products.map((product) => (
            //single product
            <Card key={product.id} value={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;
