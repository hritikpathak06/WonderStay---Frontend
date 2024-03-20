import React, { useState } from "react";
import "../styles/ListingCard.scss";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <div className="listing-card">
        <div className="slider-container">
          <div
            className="slider"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {listingImages.map((image, index) => (
              <div key={index} className="slide">
                <img
                  src={image.url}
                  alt={`photo ${index + 1}`}
                  onClick={() => {
                    navigate(`/properties/${listingId}`);
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
        <p>{type}</p>
        <p>
          <span>Rs: ${price}</span> per night
        </p>
      </div>
    </>
  );
};

export default ListingCard;
