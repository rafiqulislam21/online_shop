import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";


function Nav() {
  const [selectedProducts, setSelectedProducts] = useContext(CartContext);
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
  }, []);


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
    fetch('http://localhost:5000/api/clear-mongodb', { method: 'GET' })
      .then(json => {
        fetch('http://localhost:5000/api/migrate', { method: 'GET' })
          .then(json => {        
            alert("DB Migrated!")
            // window.location.reload()
          })
      })
  }

  const userChange = (e) => {
    // console.log(users[e.target.value])
    setLoggedUser(users[e.target.value]);

  };

  const fetchUsers = async () => {

    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(
        (jsonResponse) => {
          setUsers(jsonResponse.response.users);
          // set first user as default user
          setLoggedUser(jsonResponse.response.users[0])
        },
        // (error) => {
        //   setIsLoaded(true);
        //   setError(error);
        // }
      )
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
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={initData}>Init-data</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={clrData}>Clear-data</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={migrateData}>Migrate-DB</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Reports
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/report-1">
                    Report 1
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/report-2">
                    Report 2
                  </Link>
                </li>
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
            {/* <Link className="navbar-link" to="/login">
              <button type="button" className="btn btn-default navbar-btn">Login</button>
            </Link> */}
            <div className="">

              <select onChange={userChange} className="form-select">
                {users.map((u, index) => (
                  <option key={index} value={index}> {u.first_name} ({u.user_role.role})</option>
                ))}
              </select>
            </div>

          </span>
        </div>
      </div>
    </nav>

  );
}

export default Nav;
