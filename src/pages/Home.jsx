import React from "react";
import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import Gallery from "../components/Gallery";

const Home = () => {

  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      <UploadForm />
      <Gallery />
    </div>
  );
};

export default Home;
