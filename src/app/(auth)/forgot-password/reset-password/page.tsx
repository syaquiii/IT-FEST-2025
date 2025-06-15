"use client";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import React, { useEffect, useState } from "react";
import { forgotPasswordService } from "@/api/services/forgot-password";
import { Eye, EyeOff } from "lucide-react";
import { useTogglePassword } from "@/feature/_user/register/hooks/useTogglePassword";
import Stars from "@/feature/hero/components/Stars";

const ResetPassword: React.FC = () => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const passwordToggle = useTogglePassword();
  const confirmPassToggle = useTogglePassword();

  useEffect(() => {
    const forgotPassData = forgotPasswordService.getForgotPasswordData();

    if (!forgotPassData?.isOTPVerified || !forgotPassData) {
      window.location.href = "/login";
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPass.trim()) {
      setErrorMessage("Silakan masukkan password.");
      return;
    }
    if (newPass.length < 6) {
      setErrorMessage("Panjang password minimal 6 karakter.");
      return;
    }
    if (newPass !== confirmPass) {
      setErrorMessage("Konfirmasi password tidak sesuai.");
      return;
    }
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await forgotPasswordService.resetPass({
        password: newPass,
        confirm_password: confirmPass,
      });

      if (res?.status?.isSuccess) {
        window.location.href = "/login";
      } else {
        setErrorMessage(res?.message || "Reset password gagal.");
      }
    } catch {
      setErrorMessage("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 to-indigo-900 relative font-changa px-4">
      <h4 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-center">
        Atur Ulang Kata Sandi Mu
      </h4>
      <form
        onSubmit={handleReset}
        className="bg-blue-400 w-full md:w-4/5 lg:w-3/5 xl:w-2/5 z-10 rounded-3xl border-purple-300 border-3 p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 font-mono"
      >
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 md:px-4 py-2 md:py-3 rounded relative text-sm md:text-base">
            <span className="block sm:inline">{errorMessage}</span>
            <button
              type="button"
              onClick={() => setErrorMessage("")}
              className="absolute top-0 bottom-0 right-0 px-3 md:px-4 py-2 md:py-3"
            >
              <span className="sr-only">Dismiss</span>×
            </button>
          </div>
        )}

        <div className="space-y-1 md:space-y-2">
          <label
            htmlFor="newPass"
            className="block text-xs md:text-sm lg:text-base"
          >
            Password Baru
          </label>
          <div className="relative">
            <Input
              type={passwordToggle.isVisible ? "text" : "password"}
              id="newPass"
              name="newPass"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Masukkan password baru"
              className="w-full pr-12 text-sm md:text-base"
              variant="primary"
              required
            />
            <button
              type="button"
              onClick={passwordToggle.toggleVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {passwordToggle.isVisible ? (
                <EyeOff size={16} className="md:w-[18px] md:h-[18px]" />
              ) : (
                <Eye size={16} className="md:w-[18px] md:h-[18px]" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1 md:space-y-2">
          <label
            htmlFor="confirmPass"
            className="block text-xs md:text-sm lg:text-base"
          >
            Konfirmasi Password
          </label>
          <div className="relative">
            <Input
              type={confirmPassToggle.isVisible ? "text" : "password"}
              id="confirmPass"
              name="confirmPass"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Konfirmasi password Anda"
              className="w-full pr-12 text-sm md:text-base"
              variant="primary"
              required
            />
            <button
              type="button"
              onClick={confirmPassToggle.toggleVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {confirmPassToggle.isVisible ? (
                <EyeOff size={16} className="md:w-[18px] md:h-[18px]" />
              ) : (
                <Eye size={16} className="md:w-[18px] md:h-[18px]" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="normal"
            className="w-full text-sm md:text-base"
            disabled={loading}
          >
            {loading ? "Memproses…" : "Reset Password"}
          </Button>
        </div>
      </form>
      <Stars />
    </div>
  );
};

export default ResetPassword;
