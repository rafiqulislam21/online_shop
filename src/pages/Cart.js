import React, { useState, useEffect } from 'react';
import '../App.css';
import CardHorizontal from '../components/CardHorizontal';

function Cart() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    // const data = await fetch('https://fortnite-api.theapinetwork.com/upcoming/get');

    // const items = await data.json();
    // console.log(items.data);
    // setItems(items.data);
    setItems(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
  }


  return (
    <div className="container">
      <h3 className="text-muted py-4">Selected products</h3>
      <div className="container px-5">

        {/* selected product list here */}
        {items.map(item => (
          <CardHorizontal />
        ))}


        <div className="card mt-3">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">Total Cost: </h6>
              <span className="text-primary">1000<i className="bi bi-currency-euro"></i></span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0"></h6>
              <button type="button" className="btn btn-danger btn-lg">place order</button>
            </li>
          </ul>
        </div>
      </div>



    </div>
  );
}

export default Cart;
