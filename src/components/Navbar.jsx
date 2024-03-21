import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LOGO from "../assets/logo.png";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Person2Icon from "@mui/icons-material/Person2";
import { useSelector } from "react-redux";
import "../styles/Navbar.scss";
import axios from "axios";
import { BASE_URL } from "../constants/server";
import { setLogout } from "../redux/slices/authSlice";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.userData);
  const [dropDownMenu, setDropDownMenu] = useState(false);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get(`${BASE_URL}/auth/logout`, {
      withCredentials: true,
    });
    setLogout({
      user: null,
      isAuthenticated: false,
    });
    toast.success("user logged out");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <div className="navbar">
        <NavLink to={"/"}>
          <img src={LOGO} alt="" />
        </NavLink>
        <div className="navbar_search">
          <input
            type="text"
            placeholder="search...."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton onClick={() => navigate(`/properties/search/${search}`)}>
            <SearchIcon sx={{ color: "red" }} />
          </IconButton>
        </div>
        <div
          className="navbar_right"
          onClick={() => setDropDownMenu(!dropDownMenu)}
        >
          {user ? (
            <NavLink to={"/create-listing"} className="host">
              Become a Host
            </NavLink>
          ) : (
            <NavLink to={"/login"} className="host">
              Become a Host
            </NavLink>
          )}
          <button className="navbar_right_account">
            <MenuIcon sx={{ color: "gray" }} />
            {!user ? (
              <Person2Icon sx={{ color: "gray" }} />
            ) : (
              <img
                src={user.profileImage.url}
                alt="logo"
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  width: "40px",
                }}
              />
            )}
          </button>
          {dropDownMenu && !user && (
            <div className="navbar_right_accountmenu">
              <NavLink to={"/login"}>Login</NavLink>
              <NavLink to={"/register"}>Register</NavLink>
            </div>
          )}
          {dropDownMenu && user && (
            <div className="navbar_right_accountmenu">
              <NavLink to={`/trips/${user._id}`}>Trip List</NavLink>
              <NavLink to={"/wishlist"}>Wish List</NavLink>
              <NavLink to={"/properties"}>Property List</NavLink>
              <NavLink to={"/reservations"}>Reservation List</NavLink>
              <NavLink to={"/create-listing"}>Become A Host</NavLink>
              <hr />
              <NavLink to={""} onClick={handleLogout}>
                Logout
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
