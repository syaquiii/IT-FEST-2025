import React, { ClipboardEvent, KeyboardEvent, RefObject } from "react";
import { Button } from "@/shared/components/ui/Button";

interface Props {
  otp: string[];
  timeLeft: number;
  isPageReady: boolean;
  hasAccess: boolean;
  resendAvailable: boolean;
  loading: boolean;
  resendLoading: boolean;
  expiredError: string;
  verificationSuccess: boolean;
  formatTime(sec: number): string;
  onChange(idx: number, v: string): void;
  onKeyDown(idx: number, e: KeyboardEvent<HTMLInputElement>): void;
  onPaste(e: ClipboardEvent<HTMLInputElement>): void;
  onVerify(): void;
  onResend(): void;
  inputRefs: RefObject<HTMLInputElement | null>[];
}

export const OtpForm: React.FC<Props> = ({
  otp,
  timeLeft,
  isPageReady,
  hasAccess,
  resendAvailable,
  loading,
  resendLoading,
  expiredError,
  verificationSuccess,
  formatTime,
  onChange,
  onKeyDown,
  onPaste,
  onVerify,
  onResend,
  inputRefs,
}) => {
  if (!isPageReady && hasAccess)
    return (
      <div className=" flex items-center justify-center">
        <span className="animate-spin w-8 h-8 border-b-2 border-white rounded-full" />
        <p className="text-white ml-2">Loading...</p>
      </div>
    );

  if (!hasAccess)
    return (
      <div className="flex items-center justify-center p-4">
        <div className="bg-blue-400 rounded-3xl border-[3px] border-purple-300 p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Akses Ditolak</h2>
          <p className="text-purple-100 mb-4">
            Silakan lakukan pendaftaran terlebih dahulu.
          </p>
          <a
            href="/register"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl"
          >
            Kembali ke halaman daftar
          </a>
        </div>
      </div>
    );

  // Tampilkan pesan sukses verifikasi
  if (verificationSuccess) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="bg-blue-400 z-10 rounded-3xl border-purple-300 border-3 p-8 text-center font-mono">
          <div className="bg-green-500/20 border border-green-400 p-6 rounded-xl">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Verifikasi Berhasil!
            </h2>
            <p className="text-green-100 mb-4">Redirecting ke /login...</p>
            <div className="flex items-center justify-center">
              <span className="animate-spin w-6 h-6 border-b-2 border-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-blue-400 z-10 rounded-3xl border-purple-300 border-3 p-8 space-y-6 font-mono">
        {expiredError ? (
          <div className="bg-red-500/20 border border-red-400 p-3 rounded-xl text-center text-white">
            {expiredError}
          </div>
        ) : (
          <div className="bg-green-400/20 border border-green-400 p-3 rounded-xl text-center">
            <p className="text-purple-100 mb-1">
              Kami telah mengirimkan 6-digit kode verifikasi ke email Anda.
            </p>
            <p className="font-bold text-yellow-500">
              Kadaluarsa dalam: {formatTime(timeLeft)}
            </p>
          </div>
        )}

        <div className="flex justify-center gap-2">
          {otp.map((d, i) => (
            <div key={i} className="relative">
              <input
                ref={inputRefs[i] || null}
                type="text"
                maxLength={1}
                value={d}
                onChange={(e) => onChange(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                onPaste={onPaste}
                className="w-12 h-12 text-center text-xl text-black bg-white/90 border-purple-300 border-2 rounded-xl focus:ring-purple-200 focus:border-purple-500"
                placeholder=""
                autoComplete="one-time-code"
              />
              {!d && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-2 h-2 bg-black rounded-full opacity-30"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <Button
          variant="primary"
          className="w-full"
          disabled={loading || timeLeft <= 0 || otp.join("").length !== 6}
          onClick={onVerify}
        >
          {loading ? "Memverifikasi..." : "Verifikasi OTP"}
        </Button>

        {resendAvailable && (
          <div className="text-center">
            <p className="text-purple-100 mb-1">Tidak menerima kode?</p>
            <button
              onClick={onResend}
              disabled={resendLoading}
              className="underline text-white font-semibold"
            >
              {resendLoading ? "Mengirim ulang..." : "Kirim Ulang OTP"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
