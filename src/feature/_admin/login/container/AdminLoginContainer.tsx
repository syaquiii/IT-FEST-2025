"use client";
import React from "react";
import LoginForm from "../components/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";

const AdminLoginContainer = () => {
  const {
    email,
    password,
    error,
    loading,
    isAuthenticated,
    setEmail,
    setPassword,
    handleSubmit,
    logout,
  } = useLoginForm();
  return (
    <section className="bg-gradient-to-b from-slate-900 relative to-indigo-900 overflow-hidden h-screen">
      <div className=" flex items-center gap-4 flex-col justify-center h-full mycontainer">
        <div className="font-changa z-20 text-2xl text-white font-bold">
          <h6 className="">Masuk Sebagai Admin</h6>
        </div>
        <LoginForm
          email={email}
          password={password}
          error={error}
          loading={loading}
          isAuthenticated={isAuthenticated}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          logout={logout}
        />
      </div>
    </section>
  );
};

export default AdminLoginContainer;
