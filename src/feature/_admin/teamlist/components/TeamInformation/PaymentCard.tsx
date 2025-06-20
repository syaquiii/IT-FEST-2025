"use client";

import { TeamInformationData } from "@/api/services/admin";
import { Button } from "@/shared/components/ui/Button";
import { getPaymentStatusStyle } from "@/shared/utils/paymentStyles";

interface PaymentCardProps {
  teamInfo: TeamInformationData;
  onAcceptVerify?: () => void;
  onDenyVerify?: () => void;
  onCheckPayment?: () => void;
}

const PaymentCard = ({ 
  teamInfo, 
  onAcceptVerify, 
  onDenyVerify, 
  onCheckPayment 
}: PaymentCardProps) => {
  return (
    <div className="p-8 bg-blue-500 rounded-4xl text-white border-2 border-purple-300 w-full md:w-xl">
      <div className="flex justify-center space-x-6 items-center mb-4">
        <h2 className="text-xl font-bold">Payment</h2>
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPaymentStatusStyle(teamInfo.payment_status)}`}>
          {teamInfo.payment_status}
        </span>
      </div>

      <div className="flex justify-center space-x-8 items-center mt-8">
        {/* Left Side */}
        <div className="text-center">
          <p className="text-gray-200 mb-2">
            {teamInfo.payment_transaction ? 'Link Available' : 'No Links Yet'}
          </p>
          <Button
            type="button"
            size="small"
            disabled={!teamInfo.payment_transaction}
            className="text-sm sm:text-base disabled:opacity-50"
            onClick={onCheckPayment}
          >
            Check Payment
          </Button>
        </div>

        {/* Vertical Divider */}
        <div className="border-l border-gray-600 h-20"></div>

        {/* Right Side */}
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            onClick={onAcceptVerify}
            disabled={!teamInfo.payment_transaction}
            className="bg-green-600 hover:bg-green-500 disabled:opacity-50"
          >
            Accept Verify
          </Button>
          <Button
            type="button"
            onClick={onDenyVerify}
            disabled={!teamInfo.payment_transaction}
            className="bg-red-600 hover:bg-red-500 disabled:opacity-50"
          >
            Deny Verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;