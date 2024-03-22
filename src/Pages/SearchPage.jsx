import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/server";
import axios from "axios";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [searchResults, setSerachResults] = useState([]);

  const { search } = useParams();

  const getSearchListings = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/listing/search/${search}`);
      setSerachResults(data.listings);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchListings();
  }, [search]);

  console.log("Listings: ", searchResults);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="title-list">
            {searchResults.length < 1
              ? "No Hotels Found"
              : `You Found ${searchResults.length} Hotel`}
          </h1>
          <div className="list">
            {searchResults?.map(
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

export default SearchPage;
