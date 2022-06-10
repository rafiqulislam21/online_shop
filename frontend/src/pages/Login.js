import React from 'react';
import '../App.css';

function Login() {
  return (

    <div className="login-page bg-light p-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="bg-white shadow rounded">
              <div className="row">
                <div className="col-md-7 pe-0">
                  <div className="form-left h-100 py-5 px-5">
                    <form action="" className="row g-4">
                      <div className="col-12">
                        <label>Email<span className="text-danger">*</span></label>
                        <div className="input-group">
                          <div className="input-group-text"><i className="bi bi-person-fill"></i></div>
                          <input type="email" className="form-control" placeholder="Enter Email"></input>
                        </div>
                      </div>

                      <div className="col-12">
                        <label>Password<span className="text-danger">*</span></label>
                        <div className="input-group">
                          <div className="input-group-text"><i className="bi bi-lock-fill"></i></div>
                          <input type="password" className="form-control" placeholder="Enter Password"></input>
                        </div>
                      </div>

                      <div className="col-12">
                        <button type="submit" className="btn btn-primary px-4 float-end mt-2">login</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-5 ps-0 d-none d-md-block">
                  <div className="form-right h-100 bg-primary text-white text-center pt-5">
                    <h1><i className="bi bi-shop"></i></h1>
                    <h2 className="display-1 fs-1">Welcome Back to Online Shop</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;
