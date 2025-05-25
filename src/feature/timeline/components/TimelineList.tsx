"use client";
import React from "react";
import { TTimelineListData } from "../type/TTimelineList";
import { useTimelineAnimation } from "../hooks/useTimelineAnimation";

interface TimelineListProps {
  list: TTimelineListData;
}

const TimelineList: React.FC<TimelineListProps> = ({ list }) => {
  const { isVisible, lineWidth, elementRef } = useTimelineAnimation(list.id);
  const isOdd = list.id % 2 !== 0;
  const isFirst = list.id === 1;
  const isLast = list.id === 6;

  return (
    <div ref={elementRef} className="font-changa flex items-center gap-8">
      {isFirst && (
        <div
          className={`h-4 w-4 rotate-45 ml-4 bg-blue-100 transition-all duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      )}

      {/* Animated line */}
      <div className="w-24 h-2 overflow-hidden">
        <div
          className="h-full bg-blue-100 transition-all duration-500 ease-out"
          style={{ width: `${lineWidth}%` }}
        ></div>
      </div>

      <div className="relative flex flex-col items-center">
        <div
          className={`w-20 h-20 bg-blue-200 rotate-45 hover:drop-shadow-[0px_0px_30px_rgba(255,255,255,0.8)] transition-all duration-500 ease-in-out hover:scale-110 
            ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
        ></div>
        <div
          className={`absolute min-w-72 ${
            isOdd ? "-bottom-20" : "-top-20"
          } flex flex-col items-center transition-all duration-500 delay-200
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-white">{list.date}</span>
          <span className="text-white font-bold text-center">{list.title}</span>
        </div>
      </div>

      {isLast && (
        <div
          className={`h-4 w-4 rotate-45 bg-blue-100 transition-all duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      )}
    </div>
  );
};

export default TimelineList;
