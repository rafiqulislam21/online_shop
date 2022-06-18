import React, { useContext } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { CartContext } from "../contexts/CartContext";

const Card = (props) => {
    const [selectedProducts, setSelectedProducts] = useContext(CartContext);

    const itemAvailable = param => async () => {
        var productId = props.value.id
        fetch(`http://localhost:5000/api/products/${productId}/available`)
            .then(res => res.json())
            .then(
                (jsonResponse) => {
                    if (jsonResponse.response.is_available === true) {
                        // if product is available the added to cart
                        setSelectedProducts((prevSelectedProducts) => [
                            ...prevSelectedProducts,
                            param,
                        ]);

                    } else {
                        alert(jsonResponse.response.message);
                    }
                }
            )
    }


    return (
        <div className="col">
            <div className="card shadow rounded">
                <img src="/no-image.jpg" className="card-img-top" alt=""></img>
                <div className="card-body">
                    <h5 className="card-title">{props.value.name}</h5>
                    <p className="card-text minimal-text">{props.value.description}</p>
                    <p className="card-subtitle mb-2 text-muted">Category: {props.value?.category?.name ?? props.value?.category[0]?.name}</p>
                    <p className="card-subtitle mb-2 text-muted">Brand: {props.value.brand.name}</p>
                    <p className="card-subtitle mb-2 text-muted">Price: {props.value.price}<i className="bi bi-currency-euro"></i></p>
                    <div className="text-center">
                        <Link className="btn btn-outline-primary mx-1" to={`/shop/${props.value.id}`}>Details</Link>
                        <button onClick={itemAvailable(props.value)} type="button" className="btn btn-outline-warning mx-1" data-bs-toggle="tooltip" data-bs-html="true" title="add to cart">
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