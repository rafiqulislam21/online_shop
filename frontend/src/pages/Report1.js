import React, { useState, useEffect } from 'react';
import CardHorizontalLight from '../components/CardHorizontalLight';
import '../App.css';

function Report1() {
  useEffect(() => {
    fetchItems();
  }, []);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [database, setDatabase] = useState(JSON.parse(localStorage.getItem('database')));


  const fetchItems = async () => {

    fetch(`http://localhost:5000/api/report-1/${database}`)
      .then(res => res.json())
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

  // report page content start here---------------------
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
      {/* <h1 className="display-6 my-4">Products({products.length})</h1> */}
      <h4 className="card-title">A report of top rated products by customers over the past year.(By Md Rafiqul Islam) </h4>
      <hr></hr>
      {products.map(product => (
        //single product
        <CardHorizontalLight
          key={product?.id}
          value={product}
        />
      ))}
    </div>
  );
}

export default Report1;
