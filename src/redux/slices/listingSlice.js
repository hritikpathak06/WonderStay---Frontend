import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listings:[],
    listing:null
}

const listingSlice = createSlice({
    name:"listing",
    initialState,
    reducers:{
        setListings:(state,action) => {
            state.listings = action.payload.listings
        },
        setListing:(state,action) => {
          state.listing = action.payload.listing
        }
    }
})

export const {setListings,setListing} = listingSlice.actions;

export default listingSlice.reducer;