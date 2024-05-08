import React, { useEffect, useState } from "react";
import axios from "axios";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PlaceIcon from "@mui/icons-material/Place";
import RamenDiningSharpIcon from "@mui/icons-material/RamenDiningSharp";
import MyLocationSharpIcon from "@mui/icons-material/MyLocationSharp";
import { Link, useNavigate } from "react-router-dom";
import Reservertable from "../reservertable/Reservertable";
import { useAuth } from "../authcontext/Authcontext";


function RestaurantDetails({ searchQuery }) {
  const [data, setData] = useState({});  
  const { user, logout } = useAuth();

  const navigate=useNavigate()
  
  const image = [
    {
      imgurl:
        "https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      imgurl:
        "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      imgurl:
        "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      imgurl:
        "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      imgurl:
        "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      imgurl:
        "https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      imgurl:
        "https://images.pexels.com/photos/239975/pexels-photo-239975.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      imgurl:
        "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const itemsPerPage = 12;

  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8000/restaurantdetails")
      .then((response) => {
        setRestaurants(response.data);
        setFilteredRestaurants(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error);
      });
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter((restaurant) => {
        const name = restaurant.Name ? restaurant.Name.toLowerCase() : "";
        const cuisine = restaurant.Cuisine
          ? restaurant.Cuisine.toLowerCase()
          : "";
        const city = restaurant.City ? restaurant.City.toLowerCase() : "";
        return (
          name.includes(searchQuery.toLowerCase()) ||
          cuisine.includes(searchQuery.toLowerCase()) ||
          city.includes(searchQuery.toLowerCase())
        );
      });
      setFilteredRestaurants(filtered);
    }
  }, [searchQuery, restaurants]);

  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

  const paginatedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

 

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {paginatedRestaurants.map((restaurant, index) => (
          <div
            key={restaurant._id}
            className="rounded overflow-hidden shadow-lg"
          >
            <div className="relative">
                <img
                  className="w-full h-64 object-cover"
                  src={image[index % image.length].imgurl}
                  alt={restaurant.Name}
                />
                <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>

              <div className=" absolute bottom-0 left-0 bg-gradient-to-r from-blue-300 to-cyan-500 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                <PlaceIcon />
                {restaurant.City}
              </div>

              <div className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-300 to-cyan-500 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                <CurrencyRupeeIcon className="inline-block h-6 w-6 mb-1" />
                {restaurant.Cost}
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">
                {restaurant.Name}
              </p>
              <p className="text-gray-500 flex text-sm ">
                <RamenDiningSharpIcon />
                <p className="ml-2">{restaurant.Cuisine}</p>
              </p>
            </div>
            <div class="flex px-6 items-center">
              <svg
                class="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                class="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                class="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                class="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>
            <div className="px-6 py-4 flex flex-row items-center">
              <p className="text-gray-500 text-sm">
                <MyLocationSharpIcon /> {restaurant.Location}
              </p>
            </div>
            <div className="flex items-center justify-center">

              {user ?
              <Link  to={`/reservertable/${restaurant.Name}/${restaurant.City}/${restaurant.Cost}/${restaurant.Location}`}>

                <button className="px-4 py-2 mb-5 bg-[#308d46] flex items-center justify-center text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out">
                  Reserve Now 
                </button>
              </Link>
              :
              <Link to={"\login"}>
                 <button className="px-4 py-2 mb-5 bg-[#308d46] flex items-center justify-center text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out">
                  Reserve Now 
                </button>
              </Link>
              }
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <a
          href="#"
          className="flex items-center justify-center px-3 h-8 text-sm font-medium bg-gradient-to-r rounded-sm from-blue-300 to-cyan-500  py-2 text-white  hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </a>

        <a
          href="#"
          className="flex items-center justify-center px-3 h-8 text-sm font-medium bg-gradient-to-r rounded-sm from-blue-300 to-cyan-500  py-2 text-white  hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </a>
      </div>
    </div>
  );
}

export default RestaurantDetails;
