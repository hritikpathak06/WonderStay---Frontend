import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { store } from "./redux/store";
import axios from "axios";
import { BASE_URL } from "./constants/server";
import { setLoadUser } from "./redux/slices/authSlice";
import CreateListingPage from "./Pages/CreateListingPage";
import ListingDetails from "./Pages/ListingDetails";
import PaymentSuccess from "./Pages/PaymentSuccess";
import TripList from "./Pages/TripList";
import WishListPage from "./Pages/WishListPage";
import PropertListPage from "./Pages/PropertListPage";

const App = () => {
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await axios.get(`${BASE_URL}/auth/me`, {
        withCredentials: true,
      });
      console.log(data);
      store.dispatch(
        setLoadUser({
          user: data.user,
        })
      );
    };
    loadUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route path="/properties/:id" element={<ListingDetails />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/trips/:id" element={<TripList />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/properties" element={<PropertListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
