import React from "react";

interface TotalPaymentsCardProps {
  totalPayment: string;
}

const TotalPaymentsCard = ({ totalPayment }: TotalPaymentsCardProps) => {
  return (
    <>
      <h4 className="text-xl font-changa text-white font-bold">
        Total Payments
      </h4>
      <div className="w-full font-changa font-bold bg-blue-300 px-6 py-4 rounded-2xl outline-2 outline-slate-400 text-white mt-3">
        <span className="text-2xl">{totalPayment.toLocaleString()}</span>
        <p className="font-normal text-base">Total Payments</p>
      </div>
    </>
  );
};

export default TotalPaymentsCard;
