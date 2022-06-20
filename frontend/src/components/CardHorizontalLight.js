import React from 'react';

function CardHorizontalLight(props) {

  return (

    <div className="card bg-light mb-3">
      <div className="card-body">
        <h5 className="card-title">{props.value.name}</h5>
        <p className="card-text minimal-text m-0">{props.value.description}</p>
        <p className="card-text m-0 text-muted">Category: {props?.value?.category_name??props?.value?.category?.name??props?.value?.category[0]?.name??"-"}</p>
        <p className="card-text m-0 text-muted">Brand: {props?.value?.brand_name??props?.value?.brand?.name??"-"}</p>
        <p className="card-text m-0 text-muted">Rating average: {props?.value?.rating_avg?.toFixed(2) ?? 0} <i style={{ color: "orange" }} className="bi bi-star"></i></p>
        <p className="card-text m-0 text-muted">Price: {props.value.price}<i className="bi bi-currency-euro"></i></p>
      </div>
      <div className="card-footer">
        <small className="text-muted">Last updated {props.value.created_date}</small>
      </div>
    </div>

  );
}

export default CardHorizontalLight;