import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import bookingReducer from "./slice/bookingSlice";
import cabinReducer from "./slice/cabinSlice";

const store = configureStore({
  reducer: { auth: authReducer, booking: bookingReducer, cabin: cabinReducer },
});

export default store;
