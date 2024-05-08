import React from "react";
import Navbar from "../navbar/Navbar";
import Searchbar from "../searchbar/Searchbar";
import Footer from "../footer/Footer";
export default function Homepage() {
  return <div>
    <div>
        <Navbar />
        <Searchbar />
        <Footer />
    </div>
  </div>;
}
