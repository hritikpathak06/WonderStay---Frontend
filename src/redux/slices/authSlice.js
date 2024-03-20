import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    setLoadUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setLogin, setLoadUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
