import React from "react";
import TimelineList from "./TimelineList";
import { TimelineData } from "../data/timelinedata";

const TimelineWrapper = () => {
  return (
    <div className="w-full min-h-[20rem]  flex items-center gap-8 overflow-x-scroll scrollbar  scrollbar-thumb-rounded-full  scrollbar-thumb-blue-100 scrollbar-track-gray-400   ">
      {TimelineData.map((list) => (
        <TimelineList key={list.id} list={list} />
      ))}
    </div>
  );
};

export default TimelineWrapper;
