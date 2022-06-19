import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { CartContext } from "../contexts/CartContext";
import { ShopContext } from "../contexts/ShopContext";


function Nav() {
  const [selectedProducts, setSelectedProducts] = useContext(CartContext);
  const [products, setProducts] = useContext(ShopContext);
  const [users, setUsers] = useState([]);
  const [database, setDatabase] = useState(JSON.parse(localStorage.getItem('database')));
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));
  const [loggedUserIndex, setLoggedUserIndex] = useState(JSON.parse(localStorage.getItem('loggedUserIndex')));
  // const [loggedUser, setLoggedUser] = useContext(UserContext);

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
    fetch('http://localhost:5000/api/data-clear/'+database, { method: 'GET' })
      .then(json => {
        alert("Data Cleared!")
        window.location.reload()
      })
  }


  const userChange = (e) => {
    // console.log(users[e.target.value])
    // setLoggedUser(users[e.target.value]);
    localStorage.setItem('loggedUser', JSON.stringify(users[e.target.value]));
    localStorage.setItem('loggedUserIndex', JSON.stringify(e.target.value));
    const userLocal = JSON.parse(localStorage.getItem('loggedUser'));
    const userLocalIndex = JSON.parse(localStorage.getItem('loggedUserIndex'));
    if (userLocal) {
      setLoggedUser(userLocal);
      setLoggedUserIndex(userLocalIndex);
      window.location.reload()
    }

  };

  const  databaseChange = (e) => {
    // console.log(users[e.target.value])
    localStorage.setItem('database', JSON.stringify(e.target.value));
    const dbLocal = JSON.parse(localStorage.getItem('database'));
    if (dbLocal) {
      setDatabase(dbLocal);
      
    }
    
    if(products?.length > 0){
      if(dbLocal == 'nonsql') {
        fetch('http://localhost:5000/api/data-clear/nonsql')
        .then(json => {
          fetch('http://localhost:5000/api/migrate').then(json => {
            alert("DB Migrated! and switch to MongoDB");
            window.location.reload();
            }) 
          })
      }else{
        window.location.reload();
      }
    }else{
      // alert("No data in sequential database! To migrate initialize sequential dabase first.");
      window.location.reload();
    }
    
    

  };

  const fetchUsers = async () => {

    fetch('http://localhost:5000/api/users/'+database)
      .then(res => res.json())
      .then(
        (jsonResponse) => {
          setUsers(jsonResponse.response.users);
        }
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
              <button className="nav-link btn shadow-none" type="button" href="#" onClick={initData}>Init-data</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn shadow-none" type="button" href="#" onClick={clrData}>Clear-data</button>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#" onClick={migrateData}>Migrate-DB</a>
            </li> */}
            <div className="nav-item">
              <select value={database} onChange={databaseChange} className="form-select">
                <option value="sql">Sql</option>
                <option value="nonsql">Non-Sql</option>
              </select>
            </div>
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
            <div className="">
              <select value={loggedUserIndex} onChange={userChange} className="form-select">
                {users?.map((u, index) => (
                  <option key={index} value={index}> {u?.first_name??"-"} ({u.user_role?.role??u?.role_name??"-"}) </option>
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
