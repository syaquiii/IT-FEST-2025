import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerService } from "@/api/services/regist";

export function useOtp() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPageReady, setIsPageReady] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [expiredError, setExpiredError] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  useEffect(() => {
    const init = () => {
      if (!registerService.canAccessOTPPage()) {
        toast.error("Silakan daftar terlebih dahulu.");
        setHasAccess(false);
        return;
      }
      const rem = registerService.getOTPTimeRemaining();
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
      const rem = registerService.getOTPTimeRemaining();
      setTimeLeft(rem);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isPageReady]);

  const verify = async () => {
    const code = otp.join("");
    if (!code) return toast.error("Masukkan kode OTP");
    if (code.length !== 6) return toast.error("Kode OTP harus 6 digit");

    try {
      setLoading(true);
      setExpiredError("");
      const res = await registerService.verifyOTP(code);
      if (res.status.isSuccess) {
        setVerificationSuccess(true);
        // Delay redirect untuk menampilkan pesan sukses
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Verifikasi OTP gagal";
      if (msg.toLowerCase().includes("expired")) {
        setExpiredError("Kode OTP sudah kadaluarsa. Silakan kirim ulang.");
        setResendAvailable(true);
        setTimeLeft(0);
        setOtp(["", "", "", "", "", ""]);
      } else {
        toast.error(msg);
        setOtp(["", "", "", "", "", ""]);
      }
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    try {
      setResendLoading(true);
      await registerService.resendOTP();
      toast.success("OTP baru telah dikirim ke email Anda");
      const rem = registerService.getOTPTimeRemaining();
      setTimeLeft(rem);
      setResendAvailable(false);
      setExpiredError("");
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Gagal mengirim ulang OTP";
      toast.error(msg);
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
    verify,
    resend,
    formatTime,
  };
}
