import React, { useEffect, useState } from "react";
import "../styles/Listings.scss";
import { categories } from "./Categories";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants/server";
import axios from "axios";
import { setListings } from "../redux/slices/listingSlice";
import ListingCard from "./ListingCard";
import { private_excludeVariablesFromRoot } from "@mui/material";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState("All");

  const { listings } = useSelector((state) => state.listing);

  console.log("Listings: ", listings);

  const getFeedListing = async () => {
    try {
      setLoading(true);
      const url =
        selectedCategories === "All"
          ? `${BASE_URL}/listing/filter`
          : `${BASE_URL}/listing/filter?category=${selectedCategories}`;

      console.log("API URL: ", url);

      const { data } = await axios.get(url);

      console.log("API Response: ", data);

      dispatch(
        setListings({
          listings: data.listings,
        })
      );
      setLoading(false);
    } catch (error) {
      console.log("API Error: ", error);
    }
  };

  useEffect(() => {
    getFeedListing();
  }, [selectedCategories]);

  console.log("Selected Categories: ", selectedCategories);

  return (
    <>
      <div className="category-list">
        {categories?.map((item, index) => (
          <div
            className="category"
            key={index}
            onClick={() => setSelectedCategories(item.label)}
          >
            <div className="category_icon">{item.icon}</div>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
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
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingImages={images}
                city={city}
                country={country}
                category={category}
                type={type}
                price={price}
                province={province}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
