import React, { useState, useEffect, useContext } from "react";
import "../App.css";

import { UserContext } from "../contexts/UserContext";

function AddProduct() {
  useEffect(() => {
    fetchItems().then(() =>
      setFormValue({
        name: "",
        description: "",
        price: "",
        brand_id: 1,
        category_id: 1,
        isActive: true,
      })
    );
  }, []);

  const [loggedUser, setLoggedUser] = useContext(UserContext);
  const [brands, setBrands] = useState(null);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);
  const [formValue, setFormValue] = useState();

  const fetchItems = async () => {
    fetch("http://localhost:5000/api/brands")
      .then((res) => res.json())
      .then(
        (jsonResponse) => {
          setBrands(jsonResponse.response.brands);
        },
        (error) => {
          setError(error);
        }
      );
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then(
        (jsonResponse) => {
          setCategories(jsonResponse.response.categories);
        },
        (error) => {
          setError(error);
        }
      );
  };

  const onFieldChange = (name, value) => {
    setFormValue({ ...formValue, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formValue);
  };

  return (
    <div className="container">
      {formValue ? (
        <form onSubmit={submitHandler}>
          <div className="form-group mt-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control mt-1"
              id="name"
              placeholder="Name"
              onChange={(event) => onFieldChange("name", event.target.value)}
              value={formValue.name}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control mt-1"
              id="description"
              placeholder="Description"
              onChange={(event) =>
                onFieldChange("description", event.target.value)
              }
              value={formValue.description}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control mt-1"
              id="price"
              placeholder="Price"
              min="0"
              onChange={(event) => onFieldChange("price", event.target.value)}
              value={formValue.price}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="brand_id">Brand</label>
            <select
              id="brand_id"
              className="form-control mt-1"
              onChange={(event) =>
                onFieldChange("brand_id", event.target.value)
              }
              value={formValue.brand_id}
            >
              {brands ? (
                brands.map((b, index) => (
                  <option key={index} value={index}>
                    {b.name}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="category_id">Category</label>
            <select
              id="category_id"
              className="form-control mt-1"
              onChange={(event) =>
                onFieldChange("category_id", event.target.value)
              }
              value={formValue.category_id}
            >
              {categories ? (
                categories.map((c, index) => (
                  <option key={index} value={index}>
                    {c.name}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
          </div>
          <div className="form-group mt-3">
            <input
              type="checkbox"
              className="form-check-input mt-1"
              id="isActive"
              onChange={(event) =>
                onFieldChange("isActive", event.target.checked)
              }
              checked={formValue.isActive}
            />
            <label className="form-check-label" htmlFor="isActive">
              Is active
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AddProduct;
