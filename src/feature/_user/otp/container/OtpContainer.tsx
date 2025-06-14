"use client";
import Stars from "@/feature/hero/components/Stars";
import React, { useRef } from "react";
import { OtpForm } from "../components/OtpForm";
import { useOtp } from "../hooks/useOtp";

const OtpContainer = () => {
  const {
    otp,
    setOtp,
    timeLeft,
    isPageReady,
    hasAccess,
    resendAvailable,
    loading,
    resendLoading,
    expiredError,
    formatTime,
    verify,
    resend,
    verificationSuccess,
  } = useOtp();
  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null)
  );

  const handleChange = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const a = [...otp];
    a[i] = v;
    setOtp(a);
    if (v && i < 5) inputRefs[i + 1].current?.focus();
  };

  const handleKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs[i - 1].current?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) {
      inputRefs[i - 1].current?.focus();
    }
    if (e.key === "ArrowRight" && i < 5) {
      inputRefs[i + 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const a = Array.from({ length: 6 }, (_, i) => data[i] || "");
    setOtp(a);
    const last = Math.min(data.length - 1, 5);
    inputRefs[last].current?.focus();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center  overflow-hidden bg-gradient-to-b from-slate-900 to-indigo-900 relative font-changa ">
      <h5 className="text-5xl font-bold">Verifikasi Email</h5>
      <span>Masukkan kode 6 digit yang ada di email Anda</span>
      <OtpForm
        verificationSuccess={verificationSuccess}
        otp={otp}
        timeLeft={timeLeft}
        isPageReady={isPageReady}
        hasAccess={hasAccess}
        resendAvailable={resendAvailable}
        loading={loading}
        resendLoading={resendLoading}
        expiredError={expiredError}
        formatTime={formatTime}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onVerify={verify}
        onResend={resend}
        inputRefs={inputRefs}
      />
      <Stars />
    </main>
  );
};

export default OtpContainer;
