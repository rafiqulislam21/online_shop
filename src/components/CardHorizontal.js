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
              <strong>{props.value.name}</strong>
              <p className="card-text minimal-text m-0">{props.value.description}</p>
              <p className="card-subtitle m-0 text-muted">Category: {props.value.category.name}</p>
              <p className="card-subtitle m-0 text-muted">Price: {props.value.price}<i className="bi bi-currency-euro"></i></p>
              <button onClick={removeFromCart} type="button" className="btn-close" aria-label="Close"></button>
            </div>
          </div>
        </div>
    );
}

export default CardHorizontal;