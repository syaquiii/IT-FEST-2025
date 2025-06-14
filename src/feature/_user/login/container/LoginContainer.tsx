"use client";
import React from "react";
import LoginForm from "../components/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";
import Stars from "@/feature/hero/components/Stars";

const LoginContainer = () => {
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
        <div className="font-changa z-20 text-5xl text-white font-bold">
          <h6 className="">Masuk </h6>
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
      <Stars />
    </section>
  );
};

export default LoginContainer;
