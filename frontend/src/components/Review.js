import React, { useState, useEffect } from 'react';
import '../App.css';
import ReactStars from "react-rating-stars-component";
// import {Link} from 'react-router-dom';

function Review(props) {
  const [reviewTxt, setReviewTxt] = useState(props?.value?.description??"");
  const [reviewStr, setReviewStr] = useState(props?.value?.rating ?? 0);
  const [showEditSection, setshowEditSection] = React.useState(false)
  const changeEditVisibility = () => setshowEditSection(!showEditSection)

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
    console.log(newRating);
  };

  const deleteReview = async () => {
    var reviewId = (props.value.id)
    console.log(props.value)
    const requestOptions = {
        method: 'DELETE'
    };
    fetch(`http://localhost:5000/api/reviews/${reviewId}`, requestOptions)
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
  const updateReview = async () => {
    var reviewId = (props.value.id)
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "description": reviewTxt,
            "rating":reviewStr,
            "user_id": 1,
            "product_id": props.value.product_id
           })
    };
    fetch(`http://localhost:5000/api/reviews/${reviewId}`, requestOptions)
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

  return (
    <div>
      <div className="row mb-4">
        <h1 className="col-1"><i className="bi bi-person-circle"></i> </h1>
        <div className="col-11">
        <h6>{props.value.user.first_name} <small className="text-muted">&nbsp;&nbsp;&nbsp;&nbsp; {props.value.created_date}</small></h6>
          {!showEditSection ?
            <div>
              <p className="font-weight-light text-muted p-0 m-0">Rating: {props.value.rating} <i className="bi bi-star-fill"></i></p>
              <p className="text-muted pl-4 mb-0">{props.value.description}</p>
            </div>
            : null}
          {/* edit code here ------------------------------------------------------*/}
          {showEditSection ?
            <div className="editSection">
              <div className="">
                <h6 className="modal-title">Edit Review</h6>  
                  <div className="col-md-12 col-sm-12">
                    <label htmlFor="ratingRange" className="form-label">Select Rating ({reviewStr} <i className="bi bi-star">)</i></label>
                    <ReactStars
                      count={5}
                      defaultValue={reviewStr}
                      onChange={ratingChanged}
                      size={24}
                      isHalf={true}
                    />,
                    <div className="form-floating">
                      <textarea 
                        value={reviewTxt}
                        onChange={updateReviewTxt} 
                        className="form-control" 
                        placeholder="Leave a comment here" 
                        id="floatingTextarea2" 
                        style={{ height: '100px' }}>
                      </textarea>
                      <label htmlFor="floatingTextarea2">Write review here....</label>
                    </div>
                  </div>
                
              </div>
              <div className="col-md-12 col-sm-12 pt-1">
                <div className="row justify-space-between">
                  <div className="col"></div>
                  <div className="col"></div>
                  <div className="btn-group col" role="group" aria-label="Basic mixed styles example">
                    <button onClick={changeEditVisibility} className="btn btn-sm btn-outline-danger">Cancel</button>
                    <button  onClick={updateReview} className="btn btn-sm btn-primary">Update</button>
                  </div>
                </div>
              </div>
            </div> : null}

          {/* edit code here --------------------------------------------------------------*/}
          {!showEditSection ?
            <div>
              <button type="button" onClick={changeEditVisibility} className="btn btn-link">Edit</button>
              <button type="button" onClick={deleteReview} className="btn btn-link" >Delete</button>
            </div>
            : null}

        </div>
      </div>

      {/* todo set one modal per review item by their id =======================*/}
      {/* <!-- edit Modal --> */}
      {/* <div className="modal fade" id={"editModal"} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Review</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="">
                <div className="col-md-12 col-sm-12">
                <label htmlFor="ratingRange" className="form-label">Select Rating ({reviewStr} <i className="bi bi-star">)</i></label>
                <ReactStars
                  count={5}
                  defaultValue={reviewStr}
                  onChange={ratingChanged}
                  size={24}
                  isHalf={true}
                />,
                  <div className="form-floating">
                    <textarea value={props.value.description} className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }}></textarea>
                    <label htmlFor="floatingTextarea2">Write review here....</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div> */}

      {/* <!-- delete Modal --> */}
      {/* <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Delete Review</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this review?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div> */}

    </div>
  );
}

export default Review;
