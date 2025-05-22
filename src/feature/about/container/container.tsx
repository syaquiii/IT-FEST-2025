import React from "react";
import Hero from "../components/Hero";
import Background from "../components/Background";

const AboutContainer = () => {
  return (
    <main className=" h-screen relative bg-blue-350">
      <Background />
      <div className="mycontainer">
        <Hero />
      </div>
    </main>
  );
};

export default AboutContainer;
