import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { store } from "./redux/store";
import axios from "axios";
import { BASE_URL } from "./constants/server";
import { setLoadUser } from "./redux/slices/authSlice";

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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
