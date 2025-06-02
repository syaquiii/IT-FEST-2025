import React from "react";
import LoginForm from "../components/LoginForm";

const AdminLoginContainer = () => {
  return (
    <section className="bg-gradient-to-b from-slate-900 relative to-indigo-900 overflow-hidden h-screen">
      <div className=" flex items-center gap-4 flex-col justify-center h-full mycontainer">
        <div className="font-changa z-20 text-2xl text-white font-bold">
          <h6 className="">Masuk Sebagai Admin</h6>
        </div>
        <LoginForm />
      </div>
    </section>
  );
};

export default AdminLoginContainer;
