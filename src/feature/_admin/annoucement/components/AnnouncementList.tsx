"use client";

import React, { useState } from "react";
import { formatDate } from "@/shared/utils/formatDate";
import { AnnouncementData } from "@/api/services/admin";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

type AnnouncementListProps = {
    announcements: AnnouncementData[] | null;
};

const ITEMS_PER_PAGE = 2;

const AnnouncementList = ({ announcements }: AnnouncementListProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const sortedAnnouncements = announcements
        ? [...announcements].sort((a, b) => new Date(b.date_announcement).getTime() - new Date(a.date_announcement).getTime())
        : [];

    const totalAnnouncements = sortedAnnouncements.length;
    const totalPages = Math.ceil(totalAnnouncements / ITEMS_PER_PAGE);

    // Get current page items
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = sortedAnnouncements.slice(indexOfFirstItem, indexOfLastItem);

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="font-changa text-white w-full">
            <h4 className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed mb-2 w-full">
                Announcement List
            </h4>

            {totalAnnouncements > 0 && (
                <div className="flex flex-col md:flex-row justify-between items-center my-2">
                    <Button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        size="small"
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </Button>

                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>

                    <Button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        size="small"
                        className="flex items-center gap-2"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            )}

            {currentItems.map((announcement, index) => (
                <div key={announcement.id_announcement}
                    className="p-2 bg-blue-500 rounded-2xl text-white border-2 border-purple-300 text-center space-y-2 w-full mb-4">
                    <div className="flex justify-around items-center mb-2">
                        <h2 className="text-xl font-bold">
                            No : {totalAnnouncements - (indexOfFirstItem + index)}
                        </h2>
                        <p className="text-sm text-gray-300">
                            Posted on: {formatDate(announcement.date_announcement)}
                        </p>
                    </div>
                    <p className="text-md">{announcement.message_announcement}</p>
                </div>
            ))}


        </div>
    );
};

export default AnnouncementList;