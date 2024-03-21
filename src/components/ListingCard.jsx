import React, { useState } from "react";
import "../styles/ListingCard.scss";
import { ArrowLeft, ArrowRight, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants/server";

const ListingCard = ({
  listingId,
  creator,
  listingImages,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const goToPrevSwipe = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingImages.length) % listingImages.length
    );
  };

  const goToNextSwipe = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingImages.length);
  };

  const { user } = useSelector((state) => state.userData);

  const isLike = user?.wishList.find((item) => item._id === listingId);

  const addToWishList = async () => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/user/wishlist/${listingId}`,
        null,
        { withCredentials: true }
      );
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="listing-card">
        <div className="slider-container">
          <div
            className="slider"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {listingImages?.map((image, index) => (
              <div key={index} className="slide">
                <img
                  src={image.url}
                  alt={`photo ${index + 1}`}
                  onClick={() => {
                    booking
                      ? navigate(`/properties/${listingId._id}`)
                      : navigate(`/properties/${listingId}`);
                  }}
                />
                <div className="prev-button" onClick={(e) => goToPrevSwipe(e)}>
                  <ArrowLeft sx={{ fontSize: "15px" }} />
                </div>
                <div className="next-button" onClick={(e) => goToNextSwipe(e)}>
                  <ArrowRight sx={{ fontSize: "15px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <h3>
          {city},{province},{country}
        </h3>
        <p>{category}</p>
        {!booking ? (
          <>
            <p>{type}</p>
            <p>
              <span>Rs: ${price}</span> per night
            </p>
          </>
        ) : (
          <>
            <p style={{ fontSize: "10px" }}>
              {moment(startDate).format("dddd, MMMM Do YYYY")} -{" "}
              {moment(endDate).format("dddd, MMMM Do YYYY")}
            </p>
            <p>
              <span>Rs: ${totalPrice}</span> total
            </p>
          </>
        )}
        {!booking && (
          <div className="favorite" onClick={() => addToWishList()}>
            {isLike ? (
              <Favorite sx={{ color: "red" }} />
            ) : (
              <Favorite sx={{ color: "gray" }} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ListingCard;
