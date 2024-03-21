import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
  listing: null,
  trips:[]
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
    setListing: (state, action) => {
      state.listing = action.payload.listing;
    },
    setTrips:(state,action) => {
        state.trips = action.payload.trips
    }
  },
});

export const { setListings, setListing,setTrips } = listingSlice.actions;

export default listingSlice.reducer;
