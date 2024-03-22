import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../constants/server";
import axios from "axios";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const [reservationLists, setReservationLists] = useState([]);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userData);

  const getMyReservations = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/reservations`, {
        withCredentials: true,
      });
      setReservationLists(data.reservations);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyReservations();
  }, []);

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  });

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="title-list">
            {reservationLists.length < 1
              ? "No Reservations Found"
              : "Your Reservation List"}
          </h1>
          <div className="list">
            {reservationLists?.map(
              ({
                listingId,
                hostId,
                startDate,
                endDate,
                totalPrice,
                booking = true,
              }) => (
                <ListingCard
                  listingId={listingId}
                  creator={hostId._id}
                  listingImages={listingId.images}
                  city={listingId.city}
                  province={listingId.province}
                  country={listingId.country}
                  category={listingId.category}
                  startDate={startDate}
                  endDate={endDate}
                  totalPrice={totalPrice}
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

export default ReservationList;
