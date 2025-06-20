"use client";

import React from "react";
import { formatDate } from "@/shared/utils/formatDate";
import { AnnouncementData } from "@/api/services/admin";

type AnnouncementListProps = {
  announcements: AnnouncementData[] | null;
};

const AnnouncementList = ({ announcements }: AnnouncementListProps) => {
    const sortedAnnouncements = announcements
        ? [...announcements].sort((a, b) => new Date(b.date_announcement).getTime() - new Date(a.date_announcement).getTime())
        : [];
    const totalAnnouncements = sortedAnnouncements.length;

    return (
        <div className="font-changa text-white w-full">
            <h4 className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed mb-6 w-full">
                Announcement List
            </h4>
            {sortedAnnouncements?.map((announcement, index) => (
                <div key={announcement.id_announcement} className="p-2 bg-blue-500 rounded-2xl text-white border-2 border-purple-300 text-center space-y-2 w-full mb-4">
                    <div className="flex justify-around items-center mb-2">
                        <h2 className="text-xl font-bold">No : {totalAnnouncements - index}</h2>
                        <p className="text-sm text-gray-300">Posted on: {formatDate(announcement.date_announcement)}</p>
                    </div>
                    <p className="text-md">{announcement.message_announcement}</p>
                </div>
            ))}
        </div>
    );
};

export default AnnouncementList;
