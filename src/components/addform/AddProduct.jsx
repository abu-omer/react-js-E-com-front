import React, { useState } from "react";
import "./addProduct.css"; // Add your CSS styles here
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "../../redux/ProductsSlice";

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    categories: "",
    image: null, // This will be a file
  });
  const dispatch = useDispatch();
  const productStatus = useSelector((state) => {
    return state.products?.status;
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // For file inputs, use `files[0]`
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("categories", formData.categories);
    data.append("image", formData.image);

    dispatch(addProductStart());

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/products/create",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(addProductSuccess(response.data));
    } catch (error) {
      dispatch(
        addProductFailure(
          error.response && error.response.data
            ? error.response.data
            : "Failed to add product"
        )
      );
    }
    setIsOpen(false);
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="add-button" onClick={toggleForm}>
        Add
      </button>

      {isOpen && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Titile:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Categories:
                <input
                  type="text"
                  name="categories"
                  value={formData.categories}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Image:
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
              <button
                type="button"
                className="close-button"
                onClick={toggleForm}
              >
                Close
              </button>
              {productStatus === "loading" && <p>Loading...</p>}
              {productStatus === "failed" && <p>Failed to add product.</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
