import { ForgotPasswordOTPPage } from "@/feature/_user/forgot-password/components/ForgotPasswordOtp";
import Stars from "@/feature/hero/components/Stars";
import React from "react";

const page = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 to-indigo-900 relative font-changa">
      <ForgotPasswordOTPPage />
      <Stars />
    </main>
  );
};

export default page;
