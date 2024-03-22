import React, { useEffect, useState } from "react";
import "../styles/TripList.scss";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/server";
import { useDispatch, useSelector } from "react-redux";
import { setTrips } from "../redux/slices/listingSlice";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";

const TripList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { trips } = useSelector((state) => state.listing);

  const { user } = useSelector((state) => state.userData);

  const getMyTrips = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/trip/${id}`);
      dispatch(
        setTrips({
          trips: data.trips,
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyTrips();
  }, [id]);

  useEffect(() => {
    if(!user){
      return navigate("/login")
    }
  })

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="title-list">
            {trips?.length < 1 ? "No Trips Found" : "Your Trip List"}
          </h1>
          <div className="list">
            {trips?.map(
              ({
                listingId,
                startDate,
                endDate,
                totalPrice,
                booking = true,
              }) => (
                <ListingCard
                  listingId={listingId}
                  startDate={startDate}
                  endDate={endDate}
                  totalPrice={totalPrice}
                  listingImages={listingId.images}
                  city={listingId.city}
                  province={listingId.province}
                  country={listingId.country}
                  category={listingId.category}
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

export default TripList;
