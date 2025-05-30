"use client";
import React, { FC } from "react";
import { TFaqData } from "../type/TFaqData";
import { ChevronDown } from "lucide-react";
import { useFaqAccordion } from "../hooks/useFaqAccordion";

interface FaqListProps {
  faq: TFaqData;
}

const FaqList: FC<FaqListProps> = ({ faq }) => {
  const { isOpen, setIsOpen, height, contentRef } = useFaqAccordion();

  return (
    <div className="w-full lg:w-4/5 transition-all duration-300">
      <div
        className={`relative z-10 rounded-2xl flex flex-col sm:flex-row justify-between gap-4 sm:gap-10 font-changa py-6 px-6 sm:px-10 text-white cursor-pointer transition-colors duration-300 ${
          isOpen ? "bg-purple-400" : "bg-blue-400"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl sm:text-xl md:text-2xl font-bold w-full sm:w-4/5 transition-colors duration-300">
          {faq.question}
        </span>
        <div className="absolute right-4 top-6 sm:static sm:w-1/5 flex items-center justify-end">
          <ChevronDown
            className={`w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 ${
              isOpen ? "-rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>

      <div
        className="transition-all duration-500 ease-in-out bg-purple-400 rounded-b-2xl overflow-hidden -mt-4 text-white"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="py-4 px-6 sm:px-10">
          <p className="text-sm sm:text-base md:text-lg">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqList;
