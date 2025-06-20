'use client'; // <-- Ditambahkan karena kita akan menggunakan hooks (useState, useEffect)

import React from "react";
import AnnouncementForm from "../components/AnnouncementForm";
import AnnouncementList from "../components/AnnouncementList";
import { useGetAnnouncement } from "../hooks/useGetAnnouncement"; // <-- Impor hook Anda

const AnnouncementContainer = () => {
  const { announcements, loading, error, refetch } = useGetAnnouncement();

  const handlePostSuccess = () => {
    console.log('Post successful, refetching announcements...');
    refetch(); 
  };

  return (
    <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full font-changa">
      <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed">
        Announcement
      </h4>
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <div className="w-full md:w-1/3">
          <AnnouncementForm onSuccess={handlePostSuccess} />
        </div>
        
        <div className="w-full md:w-2/3">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {announcements && <AnnouncementList announcements={announcements} />}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementContainer;