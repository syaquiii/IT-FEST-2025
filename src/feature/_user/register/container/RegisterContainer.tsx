import Stars from "@/feature/hero/components/Stars";
import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterContainer = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center  overflow-hidden bg-gradient-to-b from-slate-900 to-indigo-900 relative ">
      <div className="font-changa">
        <h5 className="text-4xl font-bold leading-16">Daftar</h5>
        <span>Buat Akunmu</span>
      </div>
      <RegisterForm />
      <Stars />
    </section>
  );
};

export default RegisterContainer;
