import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import * as jwtDecode from "jwt-decode";
// import { Navigate } from "react-router-dom";
// import { logout } from "./UserSlice";

import {
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
} from "./ProductsSlice";

// Thunk to fetch products by category
export const fetchProducts = createAsyncThunk(
  "products/getProducts",
  async ({ categoryName, token }, { dispatch, rejectWithValue }) => {
    console.log("accessTokenn", token);
    console.log("category", categoryName);
    // const isTokenExpired = (token) => {
    //   if (!token) return true;

    //   const decodedToken = jwtDecode(token);
    //   const currentTime = Date.now() / 1000; // Current time in seconds

    //   return decodedToken.exp < currentTime;
    // };

    // if (isTokenExpired(token)) {
    //   dispatch(logout());
    //   <Navigate to="/login" />;
    // } else {
    dispatch(fetchProductStart()); // Dispatch the start action
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/products/${categoryName}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("responsedata", response.data);
      // Dispatch success action with the products data
      dispatch(fetchProductSuccess(response.data));
    } catch (error) {
      // Dispatch failure action with the error message
      dispatch(fetchProductFailure(error));

      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
