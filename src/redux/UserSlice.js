import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredintial) => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
      userCredintial
    );
    console.log(userCredintial);
    console.log("response", response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
    const roles = response?.data?.roles;
    const accessToken = response?.data?.accessToken;
    return { roles, accessToken };
  }
);
export const logout = createAsyncThunk("user/logout", async () => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.post(
    "http://localhost:3000/api/v1/auth/logout",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Logout response", response.data);
  localStorage.removeItem("user"); // Clear user data from local storage
  console.log(localStorage);
  return response.data;
});

const initialState = {
  user: null,
  loading: false,
  logout: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
        state.logout = true;
        state.loggedin = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.loggedin = true;
        state.logout = false;
        console.log("payload", state.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = true;
        state.user = null;
        state.loggedin = false;
        state.logout = false;

        console.log(action.error.message);
        if (action.error.message === "request faild with status code 401") {
          state.error = "access denaied";
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.loggedin = false;
        state.logout = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
