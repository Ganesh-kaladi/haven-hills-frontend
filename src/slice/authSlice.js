import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_APP_BACKEND_URL;

// const url = "111111111";

export const createUser = createAsyncThunk(
  "createUser",
  async function (userDate, thunkAPI) {
    try {
      const result = await axios.post(`${url}/api/v1/auth/sign-up`, userDate);
      return result.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message
      );
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async function (userData, thunkAPI) {
    try {
      const result = await axios.post(`${url}/api/v1/auth/login`, userData);
      return result.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message
      );
    }
  }
);

export const getMe = createAsyncThunk(
  "getMe",
  async function (token, thunkAPI) {
    try {
      const result = await axios.get(`${url}/api/v1/auth/get-me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message
      );
    }
  }
);

export const updateMe = createAsyncThunk(
  "updateMe",
  async function ({ token, formData }, thunkAPI) {
    try {
      const result = await axios.patch(
        `${url}/api/v1/auth/update-me`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoadingAuth: false,
    errorAuth: null,
    token: localStorage.getItem("haven-hills-token") || null,
    authenticate: !!localStorage.getItem("haven-hills-token") || false,
  },
  reducers: {
    clearAuth(state, action) {
      state.user = null;
      state.isLoadingAuth = false;
      state.errorAuth = null;
      localStorage.removeItem("haven-hills-token");
      state.token = null;
      state.authenticate = false;
    },
    clearAuthError(state, action) {
      state.errorAuth = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.isLoadingAuth = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.token = action.payload?.data?.token;
        state.authenticate = true;
        localStorage.setItem("haven-hills-token", action.payload?.data?.token);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.errorAuth = action?.payload;
      })

      // login
      .addCase(login.pending, (state, action) => {
        state.isLoadingAuth = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.token = action.payload?.data?.token;
        state.authenticate = true;
        localStorage.setItem("haven-hills-token", action.payload?.data?.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.errorAuth = action?.payload;
      })

      //get me
      .addCase(getMe.pending, (state, action) => {
        state.isLoadingAuth = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.user = action.payload?.data?.user;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.errorAuth = action?.payload;
      })

      //update me
      .addCase(updateMe.pending, (state, action) => {
        state.isLoadingAuth = true;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.user = action.payload?.data?.user;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.errorAuth = action?.payload;
      });
  },
});

export const { clearAuth, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
