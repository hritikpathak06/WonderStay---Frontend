import React, { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/server";
import { setListing } from "../redux/slices/listingSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { facilities } from "../components/Categories";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { store } from "../redux/store";

const ListingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  const { listing } = useSelector((state) => state.listing);

  const getSingleListDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/listing/property/${id}`);
      console.log(data);
      dispatch(
        setListing({
          listing: data.listing,
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleListDetails();
  }, [id]);

  const handleSelect = (value) => {
    setDateRange(value);
  };

  const start = new Date(dateRange[0]);
  const end = new Date(dateRange[1]);
  const diffInMs = end.getTime() - start.getTime();
  const dayCount = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  const { user } = useSelector((state) => state.userData);

  const handleBooking = async () => {
    try {
      const bookingForm = {
        customerId: user._id,
        listingId: id,
        hostId: listing.creator._id,
        startDate: dateRange[0].toISOString(),
        endDate: dateRange[1].toISOString(),
        totalPrice: listing.price * dayCount,
      };

      const { data } = await axios.post(
        `${BASE_URL}/booking/create`,
        bookingForm
      );
      console.log("Booking created:", data);
    } catch (error) {
      console.log("Booking creation error:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const {
        data: { key },
      } = await axios.get(`${BASE_URL}/payment/key`, {
        withCredentials: true,
      });
      const amount = listing.price * dayCount;
      const {
        data: { order },
      } = await axios.post(
        `${BASE_URL}/payment/checkout`,
        { amount },
        { withCredentials: true }
      );

      const options = {
        key,
        amount: amount,
        currency: "INR",
        name: "Ritik Kumar Pathak",
        description: "Tutorial of RazorPay",
        image: "smaple",
        order_id: order.id,
        callback_url: `${BASE_URL}/payment/verify`,
        prefill: {
          name: user.firstName,
          email: user.email
          // contact: "9508318852",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
      handleBooking();
    } catch (error) {
      console.log("Payment error:", error);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="listing-details">
          {/* Listing details code here */}
          <div className="listing-details">
            <div className="title">
              <h1>{listing.title}</h1>
              <div></div>
            </div>
            <div className="photos">
              {listing.images.map((image, index) => (
                <img src={image.url} alt="photo" key={index} />
              ))}
            </div>
            <h2>
              {listing.type} in {listing.city}, {listing.province},{" "}
              {listing.country}
            </h2>
            <p>
              {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
              {listing.bedCount} bed- {listing.bathroomCount} bathroom
            </p>
            <hr />
            <div className="profile">
              <img
                src={listing.creator.profileImage.url}
                style={{ borderRadius: "100px" }}
                alt="profile"
              />
              <h3>
                Hosted By {listing.creator.firstName} {listing.creator.lastName}
              </h3>
            </div>
            <hr />
            <h3>Description</h3>
            <p>{listing.description}</p>
            <hr />
            <h3>{listing.highlight}</h3>
            <p>{listing.highlightDesc}</p>
            <hr />
            <div className="booking">
              <div>
                <h2>What this Place Offers..?</h2>
                <div className="amenities">
                  {listing.amenities[0].split(",").map((item, index) => (
                    <div className="facility" key={index}>
                      <div className="facility_icon">
                        {
                          facilities.find((facility) => facility.name === item)
                            ?.icon
                        }
                      </div>
                      <p style={{ fontSize: "20px", fontWeight: 300 }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2>How Long Do You Want To Stay..?</h2>
                <div className="date-range-calendar">
                  <Calendar
                    onChange={handleSelect}
                    value={dateRange}
                    selectRange
                  />
                </div>
                <div className="selected-dates">
                  {dayCount > 1 ? (
                    <h2>
                      ${listing.price} X {dayCount} nights
                    </h2>
                  ) : (
                    <h2>
                      ${listing.price} X {dayCount} night
                    </h2>
                  )}
                  <h2>Total Price: ${listing.price * dayCount} </h2>
                  <p>Start Date: {start.toLocaleDateString()}</p>
                  <p>End Date: {end.toLocaleDateString()}</p>
                  <button
                    className="button"
                    type="submit"
                    style={{
                      background: "red",
                      padding: "20px 50px",
                      color: "white",
                      borderRadius: "20px",
                      marginTop: "20px",
                      cursor: "pointer",
                      border: 0,
                      width: "80%",
                      marginLeft: "auto",
                    }}
                    onClick={handleSubmit}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingDetails;
