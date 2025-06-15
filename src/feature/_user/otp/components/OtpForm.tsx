// src/components/OtpForm.tsx (Fixed Expired Logic)
import React, { ClipboardEvent, KeyboardEvent, RefObject } from "react";
import { Button } from "@/shared/components/ui/Button";
import {
  ForgotPasswordResendButton,
  RegistrationResendButton,
} from "@/shared/components/ResendButton";

interface Props {
  verificationSuccess?: boolean;
  otp: string[];
  timeLeft: number;
  isPageReady: boolean;
  hasAccess: boolean;
  resendAvailable: boolean;
  loading: boolean;
  resendLoading: boolean;
  expiredError: string;
  errorMessage?: string;
  formatTime(sec: number): string;
  onChange(idx: number, v: string): void;
  onKeyDown(idx: number, e: KeyboardEvent<HTMLInputElement>): void;
  onPaste(e: ClipboardEvent<HTMLInputElement>): void;
  onVerify(): void;
  onResend(): void;
  inputRefs: RefObject<HTMLInputElement | null>[];
  clearErrors?: () => void;

  // New prop to determine which type of OTP form this is
  type?: "registration" | "forgot-password";
}

export const OtpForm: React.FC<Props> = ({
  verificationSuccess,
  otp,
  timeLeft,
  isPageReady,
  hasAccess,
  resendAvailable,
  loading,
  resendLoading,
  expiredError,
  errorMessage,
  formatTime,
  onChange,
  onKeyDown,
  onPaste,
  onVerify,
  onResend,
  inputRefs,
  clearErrors,
  type = "registration",
}) => {
  const handleInputChange = (index: number, value: string) => {
    if (clearErrors && (errorMessage || expiredError)) {
      clearErrors();
    }
    onChange(index, value);
  };

  // Check if OTP is expired
  const isExpired = timeLeft <= 0 || expiredError;

  // Loading state
  if (!isPageReady && hasAccess)
    return (
      <div className="flex items-center justify-center">
        <span className="animate-spin w-8 h-8 border-b-2 border-white rounded-full" />
        <p className="text-white ml-2">Loading...</p>
      </div>
    );

  // No access state
  if (!hasAccess) {
    const redirectPath =
      type === "forgot-password" ? "/forgot-password" : "/register";
    const actionText =
      type === "forgot-password" ? "reset password" : "pendaftaran";
    const buttonText =
      type === "forgot-password"
        ? "Kembali ke reset password"
        : "Kembali ke halaman daftar";

    return (
      <div className="flex items-center justify-center p-4">
        <div className="bg-blue-400 rounded-3xl border-[3px] border-purple-300 p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Akses Ditolak</h2>
          <p className="text-purple-100 mb-4">
            Silakan lakukan {actionText} terlebih dahulu.
          </p>
          <a
            href={redirectPath}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl transition-colors"
          >
            {buttonText}
          </a>
        </div>
      </div>
    );
  }

  // Success state
  if (verificationSuccess) {
    const successMessage =
      type === "forgot-password"
        ? "Verifikasi berhasil! Silakan reset password Anda."
        : "Verifikasi Berhasil!";

    const redirectMessage =
      type === "forgot-password"
        ? "Mengalihkan ke halaman reset password..."
        : "Mengalihkan ke halaman login...";

    return (
      <div className="flex items-center justify-center">
        <div className="bg-green-500 shadow-lg rounded-3xl border-[3px] border-green-300 p-8 text-center transform transition-all scale-100 hover:scale-105">
          <div className="flex justify-center mb-2">
            <svg
              className="w-12 h-12 text-white animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m-6 6h6m-3 3a9 9 0 110-18 9 9 0 010 18z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">
            {successMessage}
          </h2>
          <p className="text-green-100 mb-4 text-lg font-medium">
            {redirectMessage}
          </p>
          <div className="animate-spin w-8 h-8 border-b-4 border-white rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  // Main OTP form
  const instructionText =
    type === "forgot-password"
      ? "Kami telah mengirimkan 6-digit kode reset password ke email Anda."
      : "Kami telah mengirimkan 6-digit kode verifikasi ke email Anda.";

  const buttonText =
    type === "forgot-password" ? "Verifikasi Kode Reset" : "Verifikasi OTP";
  const buttonLoadingText =
    type === "forgot-password" ? "Memverifikasi kode..." : "Memverifikasi...";

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-blue-400 z-10 rounded-3xl border-purple-300 border-3 p-8 space-y-6 font-mono">
        {/* Instruction or Expired Message */}
        {isExpired ? (
          <div className="bg-red-500/20 border border-red-400 p-3 rounded-xl text-center">
            <p className="text-white font-bold">
              {expiredError || "Kode OTP telah kadaluarsa!"}
            </p>
            <p className="text-red-100 text-sm mt-1">
              Silakan kirim ulang kode OTP untuk melanjutkan verifikasi.
            </p>
          </div>
        ) : (
          <div className="bg-green-400/20 border border-green-400 p-3 rounded-xl text-center">
            <p className="text-purple-100 mb-1">{instructionText}</p>
            <p className="font-bold text-yellow-500">
              Kadaluarsa dalam: {formatTime(timeLeft)}
            </p>
          </div>
        )}

        {/* Error Messages (only for non-expired errors) */}
        {!isExpired && errorMessage && (
          <div className="bg-red-500/20 border border-red-400 p-3 rounded-xl text-center text-white">
            {errorMessage}
          </div>
        )}

        {/* OTP Input Fields - only show when not expired */}
        {!isExpired && (
          <div className="flex justify-center gap-2">
            {otp.map((d, i) => (
              <div key={i} className="relative">
                <input
                  ref={inputRefs[i] || null}
                  type="text"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleInputChange(i, e.target.value)}
                  onKeyDown={(e) => onKeyDown(i, e)}
                  onPaste={onPaste}
                  className={`w-12 h-12 text-center text-xl text-black bg-white/90 border-2 rounded-xl focus:ring-purple-200 transition-colors ${
                    errorMessage
                      ? "border-red-400 focus:border-red-500"
                      : "border-purple-300 focus:border-purple-500"
                  }`}
                  placeholder=""
                  autoComplete="one-time-code"
                  disabled={loading || resendLoading}
                />
                {!d && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-2 h-2 bg-black rounded-full opacity-30"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Verify Button - only show when not expired */}
        {!isExpired && (
          <Button
            variant="primary"
            className="w-full"
            disabled={loading || otp.join("").length !== 6}
            onClick={onVerify}
          >
            {loading ? buttonLoadingText : buttonText}
          </Button>
        )}

        {/* Resend Button Section - always show but with different logic */}
        {type === "registration" ? (
          <RegistrationResendButton
            resendAvailable={resendAvailable || isExpired}
            resendLoading={resendLoading}
            timeLeft={timeLeft}
            onResend={onResend}
            formatTime={formatTime}
            variant="outline"
            size="md"
            className="w-full"
            showTimeRemaining={!resendAvailable && !isExpired}
          />
        ) : (
          <ForgotPasswordResendButton
            resendAvailable={resendAvailable || isExpired}
            resendLoading={resendLoading}
            timeLeft={timeLeft}
            onResend={onResend}
            formatTime={formatTime}
            variant="outline"
            size="md"
            className="w-full"
            showTimeRemaining={!resendAvailable && !isExpired}
          />
        )}
      </div>
    </div>
  );
};
