import React from "react";
import AnnouncementForm from "../components/AnnouncementForm";
import AnnouncementList from "../components/AnnouncementList";

const AnnouncementContainer = () => {
  return (
    <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full font-changa">
      <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed">
        Announcement
      </h4>
      <div className="flex flex-col md:flex-row gap-8">
        <AnnouncementForm />
        <AnnouncementList />
      </div>
    </section>
  );
};

export default AnnouncementContainer;