// src/hooks/useForgotPasswordOtp.ts
import { forgotPasswordService } from "@/api/services/forgot-password";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useForgotPasswordOtp() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPageReady, setIsPageReady] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [expiredError, setExpiredError] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const init = () => {
      if (!forgotPasswordService.canAccessOTPPage()) {
        toast.error("Silakan lakukan reset password terlebih dahulu.");
        setHasAccess(false);
        return;
      }
      const rem = forgotPasswordService.getOTPTimeRemaining();
      setTimeLeft(rem);
      setIsPageReady(true);
      if (rem <= 0) {
        toast.warning("Kode OTP sudah kadaluarsa. Silakan kirim ulang.");
        setResendAvailable(true);
      }
    };
    const t = setTimeout(init, 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isPageReady || timeLeft <= 0) {
      if (isPageReady && timeLeft <= 0) {
        setExpiredError("Kode OTP sudah kadaluarsa. Silakan kirim ulang.");
        setResendAvailable(true);
      }
      return;
    }
    const timer = setTimeout(() => {
      const rem = forgotPasswordService.getOTPTimeRemaining();
      setTimeLeft(rem);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isPageReady]);

  const clearErrors = () => {
    setErrorMessage("");
    setExpiredError("");
  };

  const verify = async () => {
    const code = otp.join("");
    if (!code) {
      setErrorMessage("Masukkan kode OTP");
      return;
    }
    if (code.length !== 6) {
      setErrorMessage("Kode OTP harus 6 digit");
      return;
    }

    try {
      setLoading(true);
      clearErrors();

      const res = await forgotPasswordService.verifyForgotPasswordOTP(code);
      if (res.status.isSuccess) {
        setVerificationSuccess(true);
        toast.success("Verifikasi OTP berhasil!");
        setTimeout(() => {
          window.location.href = "/reset-password";
        }, 2000);
      } else {
        setErrorMessage(res.message || "Verifikasi OTP gagal");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Verifikasi OTP gagal";

      if (
        msg.toLowerCase().includes("expired") ||
        msg.toLowerCase().includes("kadaluarsa")
      ) {
        setExpiredError("Kode OTP sudah kadaluarsa. Silakan kirim ulang.");
        setResendAvailable(true);
        setTimeLeft(0);
        setOtp(["", "", "", "", "", ""]);
      } else {
        setErrorMessage(msg);
        setOtp(["", "", "", "", "", ""]);
      }
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    try {
      setResendLoading(true);
      clearErrors();

      const res = await forgotPasswordService.resendForgotPasswordOTP();
      if (res.status.isSuccess) {
        toast.success("OTP baru telah dikirim ke email Anda");
        const rem = forgotPasswordService.getOTPTimeRemaining();
        setTimeLeft(rem);
        setResendAvailable(false);
        setOtp(["", "", "", "", "", ""]);
      } else {
        setErrorMessage(res.message || "Gagal mengirim ulang OTP");
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Gagal mengirim ulang OTP";
      setErrorMessage(msg);
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return {
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
  };
}
