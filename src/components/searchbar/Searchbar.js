import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantDetails from "../restaruntcard/Restaurntcard";
import axios from "axios";

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://restaurant-reservation-backend-083i.onrender.com/restaurantdetails"
      )
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  }, [searchQuery]);

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-300 to-cyan-500 h-[300px] w-full flex flex-col justify-center items-center relative">
        <div>
          <h2 className="text-3xl text-white font-semibold">
            Discover the Perfect Table for Any Occasion
          </h2>
        </div>
        <div className="mt-6 flex">
          <div className="relative">
            <input
              type="text"
              placeholder="Location, Restaurant, or Cuisine"
              className="px-8 py-2 pl-10 w-[400px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black pointer-events-none" />
          </div>
        </div>
      </div>
      {showDetails && <RestaurantDetails searchQuery={searchQuery} />}
      {!showDetails && searchQuery.trim() === "" && (
        <RestaurantDetails searchQuery={""} restaurants={restaurants} />
      )}
    </div>
  );
}
