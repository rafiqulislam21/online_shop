import React, { useState, useEffect } from 'react';
import '../App.css';
import RatingStar from '../components/RatingStar';
// import {Link} from 'react-router-dom';

function Review(props) {

  return (
    <div>
      <div className="row mb-4">
        <h1 className="col-1"><i className="bi bi-person-circle"></i> </h1>
        <div className="col-11">
          <h6>{props.value.user.first_name} <small className="text-muted">&nbsp;&nbsp;&nbsp;&nbsp; {props.value.created_date}</small></h6>
          <p className="font-weight-light text-muted p-0 m-0">Rating: {props.value.rating} <i className="bi bi-star-fill"></i></p>
          <p className="text-muted pl-4 mb-0">{props.value.description}</p>
          <a type="button" href="" className="card-link" data-bs-toggle="modal" data-bs-target="#editModal">Edit</a>
          <a type="button" href="" className="card-link" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</a>
        </div>
      </div>

      {/* todo set one modal per review item by their id =======================*/}
      {/* <!-- edit Modal --> */}
      <div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Review</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="">
                <div className="col-md-12 col-sm-12">
                <label for="ratingRange" className="form-label">Select Rating (4.0 <i className="bi bi-star">)</i></label>
                <RatingStar 
                  ratingVal = {4.0}
                />
                  <div className="form-floating">
                    <textarea value={props.value.description} className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }}></textarea>
                    <label for="floatingTextarea2">Write review here....</label>
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
      </div>

      {/* <!-- delete Modal --> */}
      <div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
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
      </div>

    </div>
  );
}

export default Review;
