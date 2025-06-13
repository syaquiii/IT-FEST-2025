"use client";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import Link from "next/link";
import React, { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { Eye, EyeOff } from "lucide-react";
import { useTogglePassword } from "../hooks/useTogglePassword";

const RegisterForm = () => {
  const {
    formData,
    isLoading,
    isSubmitted,
    error,
    handleInputChange,
    handleSubmit,
    clearError,
    isFormValid,
    fieldErrors,
  } = useRegister();

  const passwordToggle = useTogglePassword();
  const confirmPasswordToggle = useTogglePassword();

  return (
    <div className="bg-blue-400 space-y-6 w-[90%] sm:w-[80%] md:w-[60%] lg:w-2/5 rounded-3xl border-[3px] font-changa border-purple-300 p-6 sm:p-8 md:p-10 relative z-10 mt-4 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
            <button
              type="button"
              onClick={clearError}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <span className="sr-only">Dismiss</span>×
            </button>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm sm:text-base">
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className="w-full"
            variant="primary"
            required
          />
          {fieldErrors.email && isSubmitted && (
            <p className="text-red-600 text-sm font-bold mt-1">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm sm:text-base">
            Password
          </label>
          <div className="relative">
            <Input
              type={passwordToggle.isVisible ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full pr-12"
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
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
          {fieldErrors.password && isSubmitted && (
            <p className="text-red-600 text-sm font-bold mt-1">
              {fieldErrors.password}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirm_password"
            className="block text-sm sm:text-base"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Input
              type={confirmPasswordToggle.isVisible ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className="w-full pr-12"
              variant="primary"
              required
            />
            <button
              type="button"
              onClick={confirmPasswordToggle.toggleVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {passwordToggle.isVisible ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
          {fieldErrors.confirm_password && isSubmitted && (
            <p className="text-red-600 text-sm font-bold mt-1">
              {fieldErrors.confirm_password}
            </p>
          )}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="normal"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Mendaftar..." : "Daftar"}
          </Button>
        </div>
      </form>

      <div className="flex justify-center gap-1 text-sm sm:text-base">
        <span>Sudah Punya akun?</span>
        <Link
          className="text-glow text-[#85FFF5] hover:underline"
          href={"/login"}
        >
          Masuk
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
