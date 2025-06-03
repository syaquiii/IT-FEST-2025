import React from "react";

interface TotalTeamsCardProps {
  totalAll: number;
}

const TotalTeamsCard = ({ totalAll }: TotalTeamsCardProps) => {
  return (
    <>
      <h4 className="text-2xl font-changa text-white font-bold">Total Teams</h4>
      <div className="w-full font-changa font-bold bg-slate-900 px-6 py-4 rounded-2xl outline-2 outline-blue-800 text-white mt-3">
        <span className="text-3xl">{totalAll}</span>
        <p className="font-normal text-lg">Total Teams</p>
      </div>
    </>
  );
};

export default TotalTeamsCard;
