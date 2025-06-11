import React from "react";

interface TotalTeamsCardProps {
  totalAll: number;
  isLoading: boolean;
}

const TotalTeamsCard = ({ totalAll, isLoading }: TotalTeamsCardProps) => {
  return (
    <>
      <h4 className="text-2xl font-changa text-white font-bold">Total Teams</h4>
      <div className="w-full font-changa font-bold bg-slate-900 px-6 py-4 rounded-2xl outline-2 outline-blue-800 text-white mt-3">
        {isLoading ? (
          <>
            <div className="h-9 w-16 bg-gray-700 rounded animate-pulse" />
            <div className="h-7 w-28 bg-gray-700 rounded animate-pulse mt-1" />
          </>
        ) : (
          <>
            <span className="text-3xl">{totalAll}</span>
            <p className="font-normal text-lg">Total Teams</p>
          </>
        )}
      </div>
    </>
  );
};

export default TotalTeamsCard;
