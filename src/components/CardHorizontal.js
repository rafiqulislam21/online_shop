import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


function CardHorizontal(props) {
    
    const removeFromCart = e => {
        e.preventDefault();
        console.log("item removed from cart");
      }

    return (
        <div className="alert alert-light alert-dismissible shadow rounded" role="alert">
          <div className="row no-gutters">
            <div className="col-4 col-sm-4 col-md-2">
              <img src="https://via.placeholder.com/300.png/09f/fff" width="100" className="img-thumbnail" alt=""></img>
            </div>
            <div className="col-8 col-sm-8 col-md-10">
              <strong>Product name</strong>
              <p className="card-text minimal-text m-0">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-subtitle m-0 text-muted">Category: Electronies</p>
              <p className="card-subtitle m-0 text-muted">Price: 300<i className="bi bi-currency-euro"></i></p>
              <button onClick={removeFromCart} type="button" className="btn-close" aria-label="Close"></button>
            </div>
          </div>
        </div>
    );
}

export default CardHorizontal;