import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Register.scss";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../redux/slices/authSlice";
import { BASE_URL } from "../constants/server";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isAuthenticated } = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BASE_URL}/auth/login`,
        formData,
        { withCredentials: true }
      );
      console.log("Login successful", data);
      dispatch(
        setLogin({
          user: data.user,
        })
      );
      toast.success("User Logged In");
    } catch (error) {
      console.error("Error logging in:", error.response.data.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <>
      <div className="register">
        <div className="register_container">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Your Password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Login</button>
          </form>
          <NavLink to={"/register"}>
            Don't Have an account ? Register here
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
