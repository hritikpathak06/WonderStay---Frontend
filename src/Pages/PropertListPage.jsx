import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BASE_URL } from "../constants/server";
import Loader from "../components/Loader";
import "../styles/TripList.scss";
import ListingCard from "../components/ListingCard";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

const PropertListPage = () => {
  const [properties, setProerties] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.userData);

  const navigate = useNavigate();

  const getMyPropertiesHandler = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/myProperties`, {
        withCredentials: true,
      });
      setProerties(data.properties);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyPropertiesHandler();
  }, []);

  useEffect(() => {
    if(!user){
      return navigate("/login")
    }
  },[user])

  console.log("MY: ", properties);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="title-list">
            {properties?.length < 1
              ? "No Properties Found"
              : "Your Property List"}
          </h1>
          <div className="list">
            {properties?.map(
              ({
                _id,
                creator,
                images,
                city,
                province,
                country,
                category,
                type,
                price,
                booking = false,
              }) => (
                <ListingCard
                  listingId={_id}
                  creator={creator}
                  listingImages={images}
                  city={city}
                  province={province}
                  country={country}
                  category={category}
                  type={type}
                  price={price}
                  booking={booking}
                />
              )
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PropertListPage;
