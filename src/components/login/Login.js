import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "../../assests/images/bg.jpg";
import { toast } from "react-hot-toast";
import { useAuth } from "../authcontext/Authcontext";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data: userData } = await axios.post(
        "https://restaurant-reservation-backend-083i.onrender.com/login",
        {
          email,
          password,
        }
      );
      console.log(userData);
      if (userData.error) {
        toast.error(userData.error);
      } else {
        setData({});
        login(userData);
        toast.success("Login Successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSignUp() {
    navigate("/signup");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 ml-10 flex justify-center items-center">
        <img src={bg} alt="Background" className="h-[500px]" />
      </div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
        <h1 className="text-2xl font-bold mb-8 text-center">LOGIN</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-50"
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-50"
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Password"
          />
          <p className="text-xs text-gray-500">
            Password must be at least 6 characters
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Login
          </button>
          <div>
            <h6 className="mb-2">Don't have an account?</h6>
            <button
              className="text-sm text-blue-500 hover:text-blue-800 focus:outline-none"
              type="button"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
