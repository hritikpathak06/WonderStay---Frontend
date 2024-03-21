import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";

const WishListPage = () => {
  const { user } = useSelector((state) => state.userData);

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
