import React, { useState, useEffect, useContext} from 'react';
import Review from '../components/Review';
import RatingStar from '../components/RatingStar';
import { ProductContext } from "../contexts/ProductContext";

import '../App.css';

function ProductDetail() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [product, setProduct] = useContext(ProductContext);
  const fetchItems = async () => {
    // const data = await fetch('https://fortnite-api.theapinetwork.com/upcoming/get');

    // const items = await data.json();
    // console.log(items.data);
    // setItems(items.data);
  }

  const addToCart = e => {
    e.preventDefault();
    console.log("item added to cart from details");
  }

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-md-8">
          <img src="https://via.placeholder.com/300.png/09f/fff" className="img-responsive fit-image" alt=""></img>
        </div>
        <div className="col-md-4">
          <p className="text-uppercase text-info">{product.category.name}</p>
          <h1 className="display-6 my-4">{product.name}</h1>
          <p className="text-muted">
          {product.description}
          </p>
          <p className="font-weight-light">Rating: {product.rating} <i className="bi bi-star-fill"></i></p>
          {/* todo need to fix ============= */}
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" style={{ width: (product.rating/5)*1000 }} aria-valuenow={product.rating} aria-valuemin="0" aria-valuemax="5">{product.rating}</div>
          </div>
          <div className="row my-4">
            <div className="col-4">
              <h2 className="display-7">{product.price}<i className="bi bi-currency-euro"></i></h2>
            </div>
            <div className="col-8">
              <div className="row px-3">
                <button onClick={addToCart} type="button" className="btn btn-success mx-1" data-bs-toggle="tooltip" data-bs-html="true" title="add to cart">
                  <i className="bi bi-cart-plus"></i> add to cart
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* reviews section here ====================*/}
      <hr></hr>
      <form className="">
        <div className="col-md-8 col-sm-12">
          <label for="ratingRange" className="form-label">Select Rating (4.0 <i className="bi bi-star">)</i></label>
          <RatingStar 
            ratingVal = {4.0}
          />
          <br></br>
          
          <div className="form-floating">
            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }} required></textarea>
            <label for="floatingTextarea2">Write review here....</label>
          </div>
        </div>
        <div className="col-md-8 col-sm-12 pt-1">
          <div className="row justify-content-between">
            <div className="col"></div>
            <div className="btn-group col" role="group" aria-label="Basic mixed styles example">
              <button type="reset" className="btn btn-outline-danger">Cancel</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </form>

      {/* review list section here================= */}
      <div className="col-md-8 col-sm-12">
        <p className="text-muted pl-4 mb-0">Total {product.reviews.length} reviews</p>
        <hr></hr>
      
        {product.reviews.map(review => (
            // <h1>{review.user.first_name}</h1>
            <Review 
              key={review.id}
              value={review}
            />
        ))}
      
      </div>
    </div>
  );
}

export default ProductDetail;
