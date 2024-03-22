import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import { BASE_URL } from "../constants/server";
import { useParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState(null);

  const { category } = useParams();

  const getFilterByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/listing/filter?category=${category}`
      );
      setCategoriesData(data.listings);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilterByCategory();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="title-list">
            {categoriesData.length < 1
              ? "No Data Found"
              : `${category} listings`}
          </h1>
          <div className="list">
            {categoriesData?.map(
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
      <Footer/>
    </>
  );
};

export default CategoryPage;
