import React, { useContext } from 'react';
import '../App.css';
import { CartContext } from "../contexts/CartContext";

function CardHorizontal(props) {
  const [selectedProducts, setSelectedProducts] = useContext(CartContext);

  const removeFromCart = param => e => {
    e.preventDefault();
    const newList = selectedProducts.filter((item) => item.id !== param.id);
    setSelectedProducts(newList);
  };

  return (
    <div className="alert alert-light alert-dismissible shadow rounded" role="alert">
      <div className="row no-gutters">
        <div className="col-4 col-sm-4 col-md-2">
          <img src="/no-image.jpg" width="100" className="img-thumbnail" alt=""></img>
        </div>
        <div className="col-8 col-sm-8 col-md-10">
          <strong>{props.value.name}</strong>
          <p className="card-text minimal-text m-0">{props.value.description}</p>
          <p>
            <span className="card-subtitle m-0 text-muted">Category: {props.value.category.name} || </span>
            <span className="card-subtitle m-0 text-muted">Brand: {props.value.brand.name} || </span>
            <span className="card-subtitle m-0 text-muted">Price: {props.value.price}<i className="bi bi-currency-euro"></i></span>
          </p>

          <button onClick={removeFromCart(props.value)} type="button" className="btn-close" aria-label="Close"></button>
        </div>
      </div>
    </div>
  );
}

export default CardHorizontal;