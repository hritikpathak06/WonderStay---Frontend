import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import listingSlice from "./slices/listingSlice";

export const store = configureStore({
  reducer: {
    userData: authSlice,
    listing:listingSlice
  },
});
