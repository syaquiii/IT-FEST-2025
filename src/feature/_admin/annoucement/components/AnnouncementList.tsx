"use client";

import React from "react";
import { useGetAnnouncement } from "../hooks/useGetAnnouncement";

const AnnouncementList = () => {
    const { announcements } = useGetAnnouncement();
    return (
        <div className="font-changa text-white w-full">
            <h4 className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed mb-6 w-full">
                Announcement List
            </h4>
            {announcements?.map((announcement, index) => (
                <div key={index} className="p-8 bg-blue-500 rounded-2xl text-white border-2 border-purple-300 text-center space-y-2 w-full mb-4">
                    <div className="flex justify-around items-center mb-4">
                        {/* <h2 className="text-xl font-bold">{announcement.title}</h2> */}
                        {/* <p className="text-sm text-gray-300">Posted on: {formatDate(announcement.createdAt)}</p> */}
                    </div>
                    <p className="text-md">{announcement.message}</p>
                </div>
            ))}
        </div>
    );
};

export default AnnouncementList;
