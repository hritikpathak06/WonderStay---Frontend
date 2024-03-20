import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../styles/Register.scss";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants/server";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };
  const { isAuthenticated } = useSelector((state) => state.userData);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("image", formData.profileImage);
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        body: data,
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log("Registration successful");
        toast.success("Registration Successfull");
        navigate("/login");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <>
      <div className="register">
        <div className="register_container">
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile-photo"
              style={{ width: "70px", margin: "auto", borderRadius: "100%" }}
            />
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
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
            <input
              type="file"
              id="image"
              name="profileImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <label htmlFor="image">
              <CloudUploadIcon />
              <p>Upload Your Profile</p>
            </label>
            <button type="submit">Register</button>
          </form>
          <NavLink to={"/login"}>Already Have an account ? Login here</NavLink>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
