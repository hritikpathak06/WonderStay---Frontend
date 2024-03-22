import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import { useNavigate } from "react-router-dom";

const WishListPage = () => {
  const { user } = useSelector((state) => state.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
      return navigate("/login")
    }
  })

  return (
    <>
      <Navbar />
      <div>
        <h1 className="title-list">
          {user?.wishList.length < 1 ? "No Wishlist Found" : "Your Wish List"}
        </h1>
        <div className="list">
          {user?.wishList?.map(
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
      </div>
    </>
  );
};

export default WishListPage;
