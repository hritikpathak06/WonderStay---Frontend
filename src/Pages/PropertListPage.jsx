import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BASE_URL } from "../constants/server";
import Loader from "../components/Loader";
import "../styles/TripList.scss";
import ListingCard from "../components/ListingCard";

const PropertListPage = () => {
  const [properties, setProerties] = useState([]);
  const [loading, setLoading] = useState(true);

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

  console.log("MY: ", properties);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="title-list">Your Property List</h1>
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
