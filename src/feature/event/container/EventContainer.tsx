import React from "react";
import Hero from "../components/Hero";
import Sponsor from "../components/Sponsor";

const EventContainer = () => {
  return (
    <section className="eventbg min-h-screen py-40 -mt-10  z-10 relative">
      <Hero />
      <Sponsor />
    </section>
  );
};

export default EventContainer;
