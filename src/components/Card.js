import React, { useState, useEffect, useContext} from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { CartContext } from "../contexts/CartContext";


const Card = (props) => {
    const [selectedProducts, setSelectedProducts] = useContext(CartContext);
    // const addToCart = e => {
    //     e.preventDefault();
    //     console.log("item added to cart");
    // }
    const addToCart = param => e => {
        e.preventDefault();
        console.log("============"+param.name);
        setSelectedProducts((prevSelectedProducts) => [
          ...prevSelectedProducts,
           param ,
        ]);
    };
    

    return (
        <div className="col">
            <div className="card shadow rounded">
                <img src="https://via.placeholder.com/300.png/09f/fff" className="card-img-top" alt=""></img>
                <div className="card-body">
                    <h5 className="card-title">{props.value.name}</h5>
                    <p className="card-text minimal-text">{props.value.description}</p>
                    <p className="card-subtitle mb-2 text-muted">Category: {props.value.category.name}</p>
                    <p className="card-subtitle mb-2 text-muted">Price: {props.value.price}<i className="bi bi-currency-euro"></i></p>
                    <p className="card-subtitle mb-2 text-muted">Rating: {props.value.rating}<i className="bi bi-star"></i></p>
                    <div className="text-center">
                        <Link className="btn btn-outline-primary mx-1" to={`/shop/${props.value.id}`}>Details</Link>
                        <button onClick={addToCart(props.value)} type="button" className="btn btn-outline-warning mx-1" data-bs-toggle="tooltip" data-bs-html="true" title="add to cart">
                            <i className="bi bi-cart-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Last updated {props.value.created_date}</small>
                </div>
            </div>
        </div>
    );
}

export default Card;