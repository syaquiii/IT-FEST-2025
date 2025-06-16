"use client";
import React, { useRef, ClipboardEvent, KeyboardEvent } from "react";
import { useForgotPasswordOtp } from "../hooks/useForgotPasswordOtp";
import { OtpForm } from "../../otp/components/OtpForm";

export const ForgotPasswordOTPPage: React.FC = () => {
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
    verificationSuccess,
    errorMessage,
    verify,
    resend,
    formatTime,
    clearErrors,
  } = useForgotPasswordOtp();

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleOtpChange = (index: number, value: string) => {
    // Hanya izinkan angka
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus ke input berikutnya
    if (value && index < 5) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace untuk pindah ke input sebelumnya
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }

    // Handle arrow keys untuk navigasi
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs[index + 1]?.current?.focus();
    }

    // Handle Enter untuk submit
    if (e.key === "Enter" && otp.join("").length === 6) {
      verify();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    // Hanya ambil 6 digit pertama dan pastikan hanya angka
    const digits = pastedData.replace(/\D/g, "").slice(0, 6);

    if (digits.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = digits[i] || "";
      }
      setOtp(newOtp);

      // Focus ke input terakhir yang terisi atau input berikutnya
      const lastFilledIndex = Math.min(digits.length - 1, 5);
      inputRefs[lastFilledIndex]?.current?.focus();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2 sm:text-3xl md:text-4xl">
            Verifikasi Reset Password
          </h1>
          <p className="text-sm text-purple-100 sm:text-base">
            Masukkan kode OTP yang dikirim ke email Anda
          </p>
        </div>

        <OtpForm
          type="forgot-password"
          verificationSuccess={verificationSuccess}
          otp={otp}
          timeLeft={timeLeft}
          isPageReady={isPageReady}
          hasAccess={hasAccess}
          resendAvailable={resendAvailable}
          loading={loading}
          resendLoading={resendLoading}
          expiredError={expiredError}
          errorMessage={errorMessage}
          formatTime={formatTime}
          onChange={handleOtpChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onVerify={verify}
          onResend={resend}
          inputRefs={inputRefs}
          clearErrors={clearErrors}
        />
      </div>
    </div>
  );
};
