import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import CardHorizontal from '../components/CardHorizontal';
import { CartContext } from "../contexts/CartContext";

function Cart() {
  useEffect(() => {
    calculateTotal();
  });

  const [selectedProducts, setSelectedProducts] = useContext(CartContext);
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));
  const [totalPrice, setTotalPrice] = useState(0);

  function calculateTotal() {
    let total = 0;
    selectedProducts.forEach(a => {
      total += a.price;
    });
    setTotalPrice(total);
    return total;
  }

  function cearAll() {
    setSelectedProducts([]);
  }

  const postOrder = async () => {
    if (selectedProducts?.length < 1) {
      alert("No products selected in the cart");
    } else {
      var orderProductList = [];

      selectedProducts.forEach((p) => {
        var productCount = 1;
        const isFound = orderProductList.some(element => {
          if (element.product_id === p.id) {
            return true;
          }
          return false;
        });

        if (isFound) {
          // if product already selected then update amount
          productCount++;
          var objIndex = orderProductList.findIndex((obj => obj.product_id === p.id));
          orderProductList[objIndex].amount = productCount;
        } else {
          // if product not selected then add to the list
          orderProductList.push({
            "product_id": p.id,
            "amount": productCount
          })
        }
      })


      // api call here-----------------------
      // console.log(orderProductList)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "user_id": loggedUser.id,
          "products": orderProductList
        })
      };
      fetch('http://localhost:5000/api/place-order', requestOptions)
        .then(res => res.json())
        .then(
          (jsonResponse) => {
            // console.log(jsonResponse);
            alert(jsonResponse.response.message)
            // setSelectedProducts([]);
            window.location.reload()
          },
          (error) => {
            alert("Something went wrong!!")
          }
        )
    }

  }


  return (
    <div className="container">
      <h3 className="text-muted py-4">Selected products</h3>
      <div className="container px-5">
        {
          (!selectedProducts.length)
            ? <h1 className="display-4 text-muted text-center">Empty cart!</h1>
            : selectedProducts.map(function (item, index) {
              return (
                <CardHorizontal
                  key={index}
                  value={item}
                />
              )
            })


        }

        <div className="card mt-3">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">Total Cost: </h6>
              <span className="text-primary">{totalPrice}<i className="bi bi-currency-euro"></i></span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0"></h6>
              <span>
                <button onClick={cearAll} type="button" className="btn btn-danger btn-lg ">clear all</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={postOrder} type="button" className="btn btn-success btn-lg">place order</button>
              </span>

            </li>
          </ul>
        </div>
      </div>



    </div>
  );
}

export default Cart;
