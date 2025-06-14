"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerService } from "@/api/services/regist";

const OTPPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPageReady, setIsPageReady] = useState(false);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);
  const [expiredError, setExpiredError] = useState("");

  useEffect(() => {
    const initializePage = () => {
      const canAccess = registerService.canAccessOTPPage();

      if (!canAccess) {
        setHasAccess(false);
        toast.error("Silakan daftar terlebih dahulu.");
        return;
      }

      const remaining = registerService.getOTPTimeRemaining();
      setTimeLeft(remaining);
      setIsPageReady(true);

      if (remaining <= 0) {
        setResendAvailable(true);
        toast.warning("Kode OTP sudah kadaluarsa. Silakan kirim ulang.");
      }
    };

    const timeoutId = setTimeout(initializePage, 200);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isPageReady) return;

    if (timeLeft <= 0) {
      setResendAvailable(true);
      setExpiredError("Kode OTP sudah kadaluarsa. Silakan kirim ulang.");
      return;
    }

    const timer = setTimeout(() => {
      const remaining = registerService.getOTPTimeRemaining();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        setResendAvailable(true);
        setExpiredError("Kode OTP sudah kadaluarsa. Silakan kirim ulang.");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isPageReady]);
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.error("Masukkan kode OTP");
      return;
    }

    if (otp.length !== 6) {
      toast.error("Kode OTP harus 6 digit");
      return;
    }

    try {
      setLoading(true);
      setExpiredError(""); // reset error kalau sebelumnya ada

      const response = await registerService.verifyOTP(otp);
      if (response.status.isSuccess) {
        toast.success("Email berhasil diverifikasi! Selamat datang!");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Verifikasi OTP gagal";

      if (message.toLowerCase().includes("expired")) {
        // ⬇️ Jangan redirect, hanya tampilkan error
        setExpiredError("Kode OTP sudah kadaluarsa. Silakan kirim ulang.");
        setResendAvailable(true);
        setOtp("");
        setTimeLeft(0);
      } else {
        toast.error(message);
        setOtp("");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    console.log("🔁 Memulai handleResendOTP");

    try {
      setResendLoading(true);
      console.log("⏳ Mengirim request ke backend...");

      const response = await registerService.resendOTP();

      console.log("✅ Resend berhasil:", response);

      toast.success("OTP baru telah dikirim ke email Anda");
      const remaining = registerService.getOTPTimeRemaining();
      console.log("⏳ Time reset to:", remaining);

      setExpiredError("");
      setTimeLeft(remaining);
      setResendAvailable(false);
      setIsPageReady(true); // pastikan status aktif
      setResendAvailable(false);
    } catch (error) {
      console.error("❌ Gagal resend:", error);

      toast.error(
        error instanceof Error ? error.message : "Gagal mengirim ulang OTP"
      );
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!isPageReady && hasAccess) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Akses Ditolak</h2>
        <p className="text-gray-600">
          Silakan lakukan pendaftaran terlebih dahulu.
        </p>
        <a
          href="/register"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Kembali ke halaman daftar
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Verifikasi Email Anda
      </h2>

      <div className="text-center mb-6">
        <p className="text-gray-600 mb-2">
          Kami telah mengirimkan 6-digit kode verifikasi ke email Anda.
        </p>
        <p className="text-sm text-gray-500">
          Kode kadaluarsa dalam:{" "}
          <span className="font-mono text-red-500">{formatTime(timeLeft)}</span>
        </p>
      </div>
      {expiredError && (
        <div className="mb-4 text-sm text-red-600 font-medium text-center">
          {expiredError}
        </div>
      )}
      <form onSubmit={handleVerifyOTP}>
        <div className="mb-4">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Masukkan Kode OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-mono"
            placeholder="000000"
            maxLength={6}
            required
            autoComplete="one-time-code"
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading || timeLeft <= 0}
        >
          {loading ? "Memverifikasi..." : "Verifikasi OTP"}
        </button>
      </form>
      {resendAvailable && (
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              console.log("➡️ Tombol Kirim Ulang diklik");
              handleResendOTP();
            }}
            disabled={resendLoading}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            {resendLoading ? "Mengirim ulang..." : "Kirim Ulang OTP"}
          </button>
        </div>
      )}
    </div>
  );
};

export default OTPPage;
