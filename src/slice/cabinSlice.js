import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_APP_BACKEND_URL;

export const getAllCabins = createAsyncThunk(
  "getAllCabins",
  async function (thunkAPI) {
    try {
      const res = await axios.get(`${url}/api/v1/cabin`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message
      );
    }
  }
);

export const getAllCabinsUsingFilter = createAsyncThunk(
  "getAllCabinsUsingFilter",
  async function (queryOptions, thunkAPI) {
    try {
      const res = await axios.get(`${url}/api/v1/cabin/${queryOptions}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message
      );
    }
  }
);

export const getCabin = createAsyncThunk(
  "getCabin",
  async function (id, thunkAPI) {
    try {
      const res = await axios.get(`${url}/api/v1/cabin/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message
      );
    }
  }
);

const cabinSlice = createSlice({
  name: "cabin",
  initialState: {
    isLoadingCabin: false,
    errorCabin: null,
    allCabins: null,
    singleCabin: null,
  },
  reducers: {
    clearSingleCabin(state, action) {
      state.singleCabin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //getAllCabins
      .addCase(getAllCabins.pending, (state, action) => {
        state.isLoadingCabin = true;
      })
      .addCase(getAllCabins.fulfilled, (state, action) => {
        state.isLoadingCabin = false;
        state.allCabins = action.payload?.data?.cabin;
      })
      .addCase(getAllCabins.rejected, (state, action) => {
        state.isLoadingCabin = false;
      })

      //getAllCabins using flter
      .addCase(getAllCabinsUsingFilter.pending, (state, action) => {
        state.isLoadingCabin = true;
      })
      .addCase(getAllCabinsUsingFilter.fulfilled, (state, action) => {
        state.isLoadingCabin = false;
        state.allCabins = action.payload?.data?.cabin;
      })
      .addCase(getAllCabinsUsingFilter.rejected, (state, action) => {
        state.isLoadingCabin = false;
      })

      //getSingleCabin
      .addCase(getCabin.pending, (state, action) => {
        state.isLoadingCabin = true;
      })
      .addCase(getCabin.fulfilled, (state, action) => {
        state.isLoadingCabin = false;
        state.singleCabin = action.payload?.data?.cabin;
      })
      .addCase(getCabin.rejected, (state, action) => {
        state.isLoadingCabin = false;
        state.errorCabin = action.payload;
      });
  },
});

export const { clearSingleCabin } = cabinSlice.actions;

export default cabinSlice.reducer;
