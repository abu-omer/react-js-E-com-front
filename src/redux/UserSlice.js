import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

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
    Cookies.set("refreshToken", JSON.stringify(response.data.refreshToken));
    const roles = response?.data?.roles;
    const accessToken = response?.data?.accessToken;
    return { roles, accessToken };
  }
);

export const refreshLogin = createAsyncThunk(
  "user/refresh",
  async (_, { rejectWithValue }) => {
    // const refreshToken = Cookies.get("refreshToken");
    // console.log("local", refreshToken);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/refresh",
        {},
        { withCredentials: true } // Ensure cookies are sent with the request
      );

      // Assuming the response contains the new accessToken
      const { accessToken } = response.data;
      console.log("accccesss", accessToken);

      // Update localStorage or cookies with the new accessToken
      localStorage.setItem("accessToken", accessToken); // Caution: LocalStorage can be vulnerable to XSS
      Cookies.set("accessToken", accessToken); // Avoid regular cookies if you can use HttpOnly cookies

      console.log("New access token:", accessToken);

      // Return the refreshed token data
      return response.data;
    } catch (error) {
      console.error("Token refresh failed", error);

      // Optional: Clear tokens if refresh fails (indicating they are no longer valid)
      localStorage.removeItem("accessToken");
      Cookies.remove("accessToken");

      // Use rejectWithValue to return a custom error message or handle unauthorized states
      return rejectWithValue(error.response?.data || "Token refresh failed");
    }
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
      .addCase(refreshLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user.accessToken = action.payload;
        state.error = null;
        state.loggedin = true;
        state.logout = false;
        console.log("payload", state.user);
      })
      .addCase(refreshLogin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.loggedin = false;
        state.logout = false;
        state.error = "Session expired, please login again.";
        console.log("payload", state.user);
        console.log("error", state.error);

        localStorage.removeItem("user");
        Cookies.remove("user");
        // window.location.href = "/login";
      })

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
        state.loading = false;
        state.user = null;
        state.loggedin = false;
        state.logout = true;

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
        localStorage.removeItem("user");
        Cookies.remove("user");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
