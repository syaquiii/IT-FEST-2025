import React from "react";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import Stars from "@/feature/hero/components/Stars";

const ForgotPasswordContainer = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 to-indigo-900 relative font-changa">
      <div className="text-center">
        <h5 className="font-bold text-5xl">Lupa Kata Sandi</h5>
        <p>Tuliskan email Anda dibawah</p>
      </div>
      <ForgotPasswordForm />
      <Stars />
    </main>
  );
};

export default ForgotPasswordContainer;
