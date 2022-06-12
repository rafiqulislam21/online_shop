import React, { useContext } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { CartContext } from "../contexts/CartContext";

function Nav() {
  const [selectedProducts, setSelectedProducts] = useContext(CartContext);
  function initData() {
    fetch('http://localhost:5000/api/data-init', { method: 'GET' })
      .then(json => {
        alert("Data Initiallized!")
        window.location.reload()
      })
  }

  function clrData() {
    fetch('http://localhost:5000/api/data-clear', { method: 'GET' })
    .then(json => {
      alert("Data Cleared!")
      window.location.reload()
    })
  }

  function migrateData() {
    fetch('http://localhost:5000/api/api/migrate', { method: 'GET' })
    .then(json => {
      alert("DB Migrated!")
      // window.location.reload()
    })
  }

  return (

    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand text-primary" to="/">
          Online Shop
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#" onClick={initData}>Init data</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={clrData}>Clear data</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={migrateData}>Clear data</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Reports
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Report 1</a></li>
                <li><a className="dropdown-item" href="#">Report 2</a></li>
              </ul>
            </li>
          </ul>
          <span className="d-flex">
            <Link className="nav-link" to="/shop/cart">
              <button type="button" className="btn btn-outline-warning btn-sm position-relative">
                Cart <i className="bi bi-minecart-loaded"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {selectedProducts.length}
                  <span className="visually-hidden">items</span>
                </span>
              </button>
            </Link>
            <Link className="navbar-link" to="/login">
              <button type="button" className="btn btn-default navbar-btn">Login</button>
            </Link>
          </span>
        </div>
      </div>
    </nav>

  );
}

export default Nav;
