import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../App.css";

function AddProduct() {
  const [brands, setBrands] = useState(null);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);
  const [formValue, setFormValue] = useState();
  const [database, setDatabase] = useState(
    JSON.parse(localStorage.getItem("database"))
  );

  let navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setFormValue({
      name: "",
      description: "",
      price: "",
      brand_id: 1,
      category_id: 1,
      is_active: true,
      brand_name: (brands || []).find((x) => x.id === 1)?.name,
      category: {
        _id: 1,
        name: (categories || []).find((x) => x.id === 1)?.name,
      },
    });
  }, [brands, categories]);

  const fetchItems = async () => {
    fetch("http://localhost:5000/api/brands/" + database)
      .then((res) => res.json())
      .then(
        (jsonResponse) => {
          setBrands(jsonResponse.response.brands);
        },
        (error) => {
          setError(error);
        }
      );
    fetch("http://localhost:5000/api/categories/" + database)
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

  const onFieldChange = (name, value, type = "string") => {
    setFormValue({
      ...formValue,
      [name]: type === "int" ? parseInt(value, 10) : value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formValue);
    fetch("http://localhost:5000/api/admin/products/add/" + database, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        alert(jsonResponse.response.message);
        navigate("/");
      })
      .catch((error) => {
        setError(error);
      });
  };

  const findCategoryTree = (id, result) => {
    const category = categories.find((x) => x.id === id);
    result.push({ _id: category.id, name: category.name });
    if (category.parent_id) {
      result = findCategoryTree(category.parent_id, result);
    }
    return result;
  };

  return (
    <div className="container">
      {formValue ? (
        <form onSubmit={submitHandler}>
          <div className="form-group mt-3">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              className="form-control mt-1"
              id="name"
              placeholder="Name"
              onChange={(event) => onFieldChange("name", event.target.value)}
              value={formValue.name}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="description">Description*</label>
            <textarea
              className="form-control mt-1"
              id="description"
              placeholder="Description"
              onChange={(event) =>
                onFieldChange("description", event.target.value)
              }
              value={formValue.description}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="price">Price*</label>
            <input
              type="number"
              className="form-control mt-1"
              id="price"
              placeholder="Price"
              min="0"
              onChange={(event) =>
                onFieldChange("price", event.target.value, "int")
              }
              value={formValue.price}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="brand_id">Brand</label>
            <select
              id="brand_id"
              className="form-control mt-1"
              onChange={(event) => {
                onFieldChange("brand_id", event.target.value, "int");
                if (database === "nosql") {
                  const brand_name = brands.find(
                    (x) => x.id === parseInt(event.target.value)
                  )?.name;
                  onFieldChange("brand_name", brand_name);
                }
              }}
              value={formValue.brand_id}
            >
              {brands ? (
                brands.map((b) => (
                  <option key={b.id} value={b.id}>
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
              onChange={(event) => {
                if (database === "nosql") {
                  const tree = findCategoryTree(
                    parseInt(event.target.value),
                    []
                  );
                  onFieldChange("category", tree);
                } else {
                  onFieldChange("category_id", event.target.value, "int");
                }
              }}
              value={formValue.category_id}
            >
              {categories ? (
                categories.map((c) => (
                  <option key={c.id} value={c.id}>
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
              id="is_active"
              onChange={(event) =>
                onFieldChange("is_active", event.target.checked)
              }
              checked={formValue.is_active}
            />
            <label className="form-check-label" htmlFor="is_active">
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
