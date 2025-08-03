import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_APP_BACKEND_URL;

export const bookCabin = createAsyncThunk(
  "bookCabin",
  async function ({ cabinID, token, bookingData }, thunkAPI) {
    try {
      const result = await axios.post(
        `${url}/api/v1/booking/${cabinID}`,
        bookingData,
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

export const getUserBookings = createAsyncThunk(
  "getAllBooking",
  async function (token, thunkAPI) {
    try {
      const result = await axios.get(`${url}/api/v1/auth/all-user-bookings`, {
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

export const getSinglebooking = createAsyncThunk(
  "getSingleBooking",
  async function ({ bookID, token }, thunkAPI) {
    try {
      const result = await axios.get(
        `${url}/api/v1/auth/single-booking/${bookID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
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

export const checkDates = createAsyncThunk(
  "checkDates",
  async function ({ id, start, end }, thunkAPI) {
    try {
      const result = await axios.get(
        `${url}/api/v1/booking/check-available/${id}?start=${start}&end=${end}`
      );
      return result.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    isLoadingBooking: false,
    errorBooking: null,
    singleBooking: null,
    bookings: null,
    availableDate: null,
  },
  reducers: {
    clearBooking(state, action) {
      state.isLoadingBooking = false;
      state.errorBooking = null;
      state.singleBooking = null;
      state.bookings = null;
      state.availableDate = null;
    },
    clearSingleBooking(state, action) {
      state.singleBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //create booking
      .addCase(bookCabin.pending, (state, action) => {
        state.isLoadingBooking = true;
      })
      .addCase(bookCabin.fulfilled, (state, action) => {
        state.isLoadingBooking = false;
      })
      .addCase(bookCabin.rejected, (state, action) => {
        state.isLoadingBooking = false;
        state.errorBooking = action?.payload;
      })

      //get all user booking
      .addCase(getUserBookings.pending, (state, action) => {
        state.isLoadingBooking = true;
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.isLoadingBooking = false;
        state.bookings = action?.payload?.data?.booking;
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoadingBooking = false;
        state.errorBooking = action?.payload;
      })

      //get single booking
      .addCase(getSinglebooking.pending, (state, action) => {
        state.isLoadingBooking = true;
      })
      .addCase(getSinglebooking.fulfilled, (state, action) => {
        state.isLoadingBooking = false;
        state.singleBooking = action?.payload?.data?.booking;
      })
      .addCase(getSinglebooking.rejected, (state, action) => {
        state.isLoadingBooking = false;
        state.errorBooking = action?.payload;
      })

      //get available dates
      .addCase(checkDates.pending, (state, action) => {
        state.isLoadingBooking = true;
      })
      .addCase(checkDates.fulfilled, (state, action) => {
        state.isLoadingBooking = false;
        state.availableDate = action?.payload?.data?.bookings;
      })
      .addCase(checkDates.rejected, (state, action) => {
        state.isLoadingBooking = false;
        state.errorBooking = action?.payload;
      });
  },
});

export const { clearBooking, clearSingleBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
