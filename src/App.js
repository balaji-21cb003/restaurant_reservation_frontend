import React from "react";
import Homepage from "./components/homepage/Homepage";
import Reservertable from "./components/reservertable/Reservertable";
import Login from "./components/login/Login";
import SignUp from "./components/signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" toastOptions={{duration:2000}}/>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route
          path="/reservertable/:name/:city/:cost/:location"
          element={<Reservertable />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
