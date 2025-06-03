import React from "react";

interface TotalEachCompeProps {
  total_bp?: number;
  total_uiux?: number;
  label: string;
}

const TotalEachCompe = ({
  total_bp,
  total_uiux,
  label,
}: TotalEachCompeProps) => {
  const total = total_bp ?? total_uiux ?? 0;

  return (
    <>
      <div className="w-full font-changa font-bold bg-purple-400 px-6 py-4 rounded-2xl outline-2 outline-purple-300 text-white mt-3">
        <span className="text-2xl">{total}</span>
        <p className="font-normal text-base">{label}</p>
      </div>
    </>
  );
};

export default TotalEachCompe;
