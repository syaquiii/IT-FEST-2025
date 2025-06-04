import React from "react";

interface DashboardHeaderProps {
  username?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ username }) => {
  return (
    <div className="font-changa text-white">
      <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed">
        Welcome, Admin {username}
      </h4>
      <p className="text-base md:text-lg lg:text-xl font-normal">
        Made by ❤︎ from PIT team!!
      </p>
    </div>
  );
};

export default DashboardHeader;
