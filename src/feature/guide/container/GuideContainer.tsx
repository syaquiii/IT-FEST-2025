import React from "react";
import LeftSide from "../components/LeftSide";
import GuideBook from "../components/GuideBook";

const GuideContainer = () => {
  return (
    <section className="min-h-screen guidebg -mt-40 transition-all duration-700 ease-out">
      <div className="mycontainer py-60">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
            <div
              className="order-2 lg:order-1 col-span-1 lg:col-span-3 xl:col-span-2 
                          transform transition-all duration-500 ease-out
                          hover:scale-[1.01] lg:hover:scale-100"
            >
              <div className="w-full max-w-2xl mx-auto lg:max-w-none lg:mx-0">
                <LeftSide />
              </div>
            </div>

            <div
              className="order-1 lg:order-2 col-span-1 lg:col-span-2 xl:col-span-1
                          transform transition-all duration-500 ease-out
                          hover:scale-105 lg:hover:scale-[1.02]"
            >
              <div className="w-full max-w-sm mx-auto lg:max-w-none">
                <GuideBook />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideContainer;
