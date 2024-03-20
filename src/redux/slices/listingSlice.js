import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listings:[]
}

const listingSlice = createSlice({
    name:"listing",
    initialState,
    reducers:{
        setListings:(state,action) => {
            state.listings = action.payload.listings
        }
    }
})

export const {setListings} = listingSlice.actions;

export default listingSlice.reducer;