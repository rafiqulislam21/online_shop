import React, { useState, useEffect } from "react";
import "../App.css";

function Report1() {
  useEffect(() => {
    fetchItems();
  }, []);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [database, setDatabase] = useState(
    JSON.parse(localStorage.getItem("database"))
  );

  const fetchItems = async () => {
    fetch(`http://localhost:5000/api/report-2/${database}`)
      .then((res) => res.json())
      .then(
        (jsonResponse) => {
          setIsLoaded(true);
          console.log(jsonResponse);
          setResult(jsonResponse.response.result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  if (error) {
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
    <div className="container">
      <br></br>
      <h4 className="card-title">
        A report of the most popular categories in the last year. (By Yaryna
        Paslavska)
      </h4>
      <hr></hr>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Category name</th>
            <th scope="col">Amount</th>
            <th scope="col">Popular product name</th>
            <th scope="col">Resent product name</th>
            <th scope="col">Created date</th>
          </tr>
        </thead>
        <tbody>
          {result.map((record) => (
            <tr>
              <td>{record.category_name}</td>
              <td>{record.amount}</td>
              <td>{record.popular_product_name}</td>
              <td>{record.resent_product_name}</td>
              <td>{record.created_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Report1;
