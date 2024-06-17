import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TableBarIcon from "@mui/icons-material/TableBar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../footer/Footer";

function ReservationPage() {
  const { name: restaurantName, city, cost, location } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [tableSize, setTableSize] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    occasion: "",
    specialRequest: "",
    date: "",
    time: "",
    table: "",
    optIn: false,
    userConfirmation: false,
    covidSafetyAgreement: false,
  });

  const allCheckboxesChecked =
    formData.userConfirmation &&
    formData.optIn &&
    formData.covidSafetyAgreement;

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date });
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, time: time });
    setSelectedTime(time);
  };

  const handleTableSizeChange = (e) => {
    setTableSize(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithTableSize = {
        ...formData,
        table: tableSize,
      };

      const response = await axios.post(
        "https://restaurant-reservation-backend-083i.onrender.com/tablebook",
        formDataWithTableSize
      );
      // console.log(formData);
      if (response.ok) {
        console.log("Reservation successful");
        setFormData({
          name: "",
          phoneNumber: "",
          email: "",
          occasion: "",
          specialRequest: "",
          optIn: false,
          userConfirmation: false,
          covidSafetyAgreement: false,
        });
      }
      toast.success("Table reserved");
      navigate("/");
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-screen-lg">
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4">
                Make a Reservation at {restaurantName}
              </h1>
              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Restaurant Details</h2>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">City:</span> {city}
                  </p>
                  <p>
                    <span className="font-semibold">Cost:</span>
                    <CurrencyRupeeIcon />
                    {cost}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span> {location}
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 p-6  rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  What to know before you go
                </h2>
                <p className="text-sm font-semibold mb-4">
                  Important dining information
                </p>
                <ul className="list-disc ml-4 mb-4">
                  <li>
                    We have a 15 minute grace period. Please call us if you are
                    running later than 15 minutes after your reservation time.
                  </li>
                  <li>
                    We may contact you about this reservation, so please ensure
                    your email and phone number are up to date.
                  </li>
                </ul>
                <p className="text-sm font-semibold mb-4">
                  A note from the restaurant
                </p>
                <p className="mb-4">
                  Please note for all parties of 6+, we do require a credit card
                  on file. Should you cancel or no-show within 24 hours of the
                  reservation, you will be subjected to a cancellation fee of
                  $35.00 per person for lunch & $50.00 per person for dinner.
                </p>
                <p>
                  Please note for all parties of 10+, we do require a menu
                  selection or minimum spend on our a la carte menu.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 mt-[55px]">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-100 p-6 rounded-lg"
            >
              <div className="flex items-center  justify-between mb-4">
                <h2 className="text-xl  font-semibold">Reservation Details</h2>
                <span className="text-gray-500">You’re almost done!</span>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex ">
                  <div className="mt-1">
                    <CalendarMonthIcon />
                  </div>
                  <div>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      className="border ml-2 p-2 rounded"
                    />
                  </div>
                </div>

                <ul className="flex justify-evenly mouser-pointer">
                  <button onClick={() => handleTimeChange("1:00 PM")}>
                    <li
                      className={`p-2 w-fit rounded-lg ${
                        selectedTime === "1:00 PM"
                          ? "bg-green-900 text-white"
                          : "bg-green-600 text-white font-semibold hover:bg-green-900 transition duration-300 ease-in-out s"
                      }`}
                    >
                      1:00 PM
                    </li>
                  </button>
                  <button onClick={() => handleTimeChange("2:00 PM")}>
                    <li
                      className={`p-2 w-fit rounded-lg ${
                        selectedTime === "2:00 PM"
                          ? "bg-green-900 text-white"
                          : "bg-green-600 text-white font-semibold hover:bg-green-900 transition duration-300 ease-in-out s"
                      }`}
                    >
                      2:00 PM
                    </li>
                  </button>
                  <button onClick={() => handleTimeChange("3:00 PM")}>
                    <li
                      className={`p-2 w-fit rounded-lg ${
                        selectedTime === "3:00 PM"
                          ? "bg-green-900 text-white"
                          : "bg-green-600 text-white font-semibold hover:bg-green-600 transition duration-300 ease-in-out s"
                      }`}
                    >
                      3:00 PM
                    </li>
                  </button>
                  <button onClick={() => handleTimeChange("4:00 PM")}>
                    <li
                      className={`p-2 w-fit rounded-lg ${
                        selectedTime === "4:00 PM"
                          ? "bg-green-900 text-white"
                          : "bg-green-600 text-white font-semibold hover:bg-green-600 transition duration-300 ease-in-out s"
                      }`}
                    >
                      4:00 PM
                    </li>
                  </button>
                </ul>

                <select
                  value={tableSize}
                  onChange={handleTableSizeChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Table Size</option>
                  <option value="2">
                    {" "}
                    <span>
                      <TableBarIcon />
                    </span>
                    2 people
                  </option>
                  <option value="3">3 people</option>
                  <option value="4">4 people</option>
                </select>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                />
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Occasion (optional)</option>
                  <option value="birthday">Birthday</option>
                  <option value="meetup">Meetup</option>
                  <option value="anniversary">Anniversary</option>
                </select>
                <input
                  type="text"
                  name="specialRequest"
                  placeholder="Special Request (optional)"
                  value={formData.specialRequest}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                />
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    name="userConfirmation"
                    checked={formData.userConfirmation}
                    onChange={handleInputChange}
                  />
                  <span>
                    I confirm that the information provided is accurate and
                    complete.
                  </span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    name="optIn"
                    checked={formData.optIn}
                    onChange={handleInputChange}
                  />
                  <span>
                    Sign me up to receive dining offers and news from this
                    restaurant by email.
                  </span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    name="covidSafetyAgreement"
                    checked={formData.covidSafetyAgreement}
                    onChange={handleInputChange}
                  />
                  <span>
                    I agree to adhere to the restaurant's COVID-19 safety
                    protocols during my visit.
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4 ${
                  !allCheckboxesChecked && "opacity-50 cursor-not-allowed"
                }`}
                disabled={!allCheckboxesChecked}
              >
                Complete Reservation
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReservationPage;
