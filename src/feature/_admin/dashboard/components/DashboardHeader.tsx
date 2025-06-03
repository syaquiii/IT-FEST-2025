import React from "react";

interface DashboardHeaderProps {
  username?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ username }) => {
  return (
    <div className="font-changa text-white text-4xl font-bold leading-16">
      <h4>Welcome, Admin {username}</h4>
      <p className="text-xl font-normal">Made by ❤︎ from PIT team!!</p>
    </div>
  );
};

export default DashboardHeader;
