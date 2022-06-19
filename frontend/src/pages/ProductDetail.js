import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import Review from '../components/Review';
import ReactStars from "react-rating-stars-component";
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";

import '../App.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useContext(ProductContext);
  const [selectedProducts, setSelectedProducts] = useContext(CartContext);
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));
  const [reviewTxt, setReviewTxt] = useState("");
  const [reviewStr, setReviewStr] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [database, setDatabase] = useState(JSON.parse(localStorage.getItem('database')));

  useEffect(() => {
    fetchItems();
  }, []);

  const updateReviewTxt = (e) => {
    setReviewTxt(e.target.value);
    // console.log(e.target.value);
  };
  const resetFun = () => {
    setReviewTxt("");
    setReviewStr(0);
  }
  const ratingChanged = (newRating) => {
    setReviewStr(newRating);
    // console.log(newRating);
  };

  const fetchItems = async () => {
    fetch(`http://localhost:5000/api/products/${id}/${database}`)
      .then(res => res.json())
      .then(
        (jsonResponse) => {
          setIsLoaded(true);
          // console.log(jsonResponse);
          (jsonResponse.response.product.reviews || []).forEach(async (r) => {
            r.product_id=parseInt(id);
          });
          setProduct(jsonResponse.response.product);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  const itemAvailable = param => async () => {
    var productId = product.id
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
            // alert("Product added to cart");
          } else {
            alert(jsonResponse.response.message);
          }
        }
      )
  }

  const postComment = async () => {
    // POST request using fetch with error handling
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "description": reviewTxt,
        "rating": reviewStr,
        "user_id": loggedUser.id,
        "first_name": loggedUser.first_name,
        "last_name": loggedUser.last_name,
        "product_id": id
      })
    };
    fetch(`http://localhost:5000/api/reviews/create/${database}`, requestOptions)
      .then(res => res.json())
      .then(
        (jsonResponse) => {
          // console.log(jsonResponse);
          alert(jsonResponse.response.message)
          window.location.reload()
        },
        (error) => {
          alert("Something went wrong!!")
        }
      )
  }



  // product details page content start here---------------------
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
    <div className="container pt-4">
      <div className="row">
        <div className="col-md-8">
          <img src="/no-image.jpg" className="img-responsive fit-image" alt=""></img>
        </div>
        <div className="col-md-4">
          <p className="text-uppercase text-info mb-0 mt-2">Category: {product?.category?.name??product?.category[0]?.name}</p>
          <p className="text m-0">Brand: {product.brand.name}</p>
          <h1 className="display-6 my-4">{product.name}</h1>
          <p className="text-muted">
            {product.description}
          </p>
          <p className="font-weight-light">Rating: {product.rating?.toFixed(2) ?? 0} <i className="bi bi-star-fill"></i></p>
          <ReactStars
            count={5}
            edit={false}
            value={product.rating}
            size={24}
            isHalf={true}
          />
          <div className="row my-4">
            <div className="col-4">
              <h2 className="display-7">{product.price}<i className="bi bi-currency-euro"></i></h2>
            </div>
            <div className="col-8">
              <div className="row px-3">
                <button onClick={itemAvailable(product)} type="button" className="btn btn-success mx-1" data-bs-toggle="tooltip" data-bs-html="true" title="add to cart">
                  <i className="bi bi-cart-plus"></i> add to cart
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* reviews section here ====================*/}
      <hr></hr>
      <div className="col-md-8 col-sm-12">
        <label htmlFor="ratingRange" className="form-label">Select Rating ({reviewStr} <i className="bi bi-star">)</i></label>
        <ReactStars
          count={5}
          value={reviewStr}
          onChange={ratingChanged}
          size={24}
          isHalf={true}
        />
        <br></br>

        <div className="form-floating">
          <textarea className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            name="reviewTxt"
            defaultValue={reviewTxt}
            onChange={updateReviewTxt}
            style={{ height: '100px' }}
            required>
          </textarea>
          <label htmlFor="floatingTextarea2">Write review here....</label>
        </div>
      </div>
      <div className="col-md-8 col-sm-12 pt-1">
        <div className="row justify-content-between">
          <div className="col"></div>
          <div className="btn-group col" role="group" aria-label="Basic mixed styles example">
            <button onClick={resetFun} type="reset" className="btn btn-outline-danger">Cancel</button>
            <button onClick={postComment} className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>

      {/* review list section here================= */}
      <div className="col-md-8 col-sm-12">
        <p className="text-muted pl-4 mb-0">Total {product.reviews?.length || 0} reviews</p>
        <hr></hr>

        {(product.reviews || []).map(review => (
          // <h1>{review.user.first_name}</h1>
          <Review
            key={review.created_date}
            value={review}
          />
        ))}

      </div>
    </div>
  );
}

export default ProductDetail;
