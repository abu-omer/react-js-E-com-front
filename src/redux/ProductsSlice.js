// src/redux/productsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

// Thunk to add a product
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductStart(state) {
      state.status = "loading";
      state.error = null;
    },
    fetchProductSuccess(state, action) {
      state.status = "succeeded";
      state.products = action.payload;
    },
    fetchProducFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },

    addProductStart(state) {
      state.status = "loading";
      state.error = null;
    },
    addProductSuccess(state, action) {
      state.status = "succeeded";
      state.products.push(action.payload);
    },
    addProductFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },

    deleteProduct(state, action) {
      state.status = "succeeded";
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const {
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  deleteProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
