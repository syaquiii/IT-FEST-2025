"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterCredentials } from "@/shared/type/TAuth";
import { toast } from "react-toastify";
import { registerService } from "@/api/services/regist";

interface UseRegisterState {
  email: string;
  password: string;
  confirm_password: string;
}

interface UseRegisterReturn {
  formData: UseRegisterState;
  isLoading: boolean;
  error: string | null;
  isSubmitted: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;

  isFormValid: boolean;
  fieldErrors: {
    email: string | null;
    password: string | null;
    confirm_password: string | null;
  };
}

export const useRegister = (): UseRegisterReturn => {
  const router = useRouter();

  const [formData, setFormData] = useState<UseRegisterState>({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validation functions
  const validateEmail = (email: string): string | null => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return null;
  };

  const validateconfirm_password = (
    password: string,
    confirm_password: string
  ): string | null => {
    if (!confirm_password) return "Please confirm your password";
    if (password !== confirm_password) return "Passwords do not match";
    return null;
  };

  const fieldErrors = {
    email: formData.email ? validateEmail(formData.email) : null,
    password: formData.password ? validatePassword(formData.password) : null,
    confirm_password: formData.confirm_password
      ? validateconfirm_password(formData.password, formData.confirm_password)
      : null,
  };

  const isFormValid =
    formData.email !== "" &&
    formData.password !== "" &&
    formData.confirm_password !== "" &&
    !fieldErrors.email &&
    !fieldErrors.password &&
    !fieldErrors.confirm_password;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!isFormValid) {
      setError("Please fill in all fields correctly");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const credentials: RegisterCredentials = {
        email: formData.email.trim(),
        password: formData.password,
        confirm_password: formData.confirm_password,
      };

      const response = await registerService.register(credentials);

      if (response.status.isSuccess && response.data?.UserID) {
        toast.success(
          "Registration successful! Please check your email for OTP code."
        );
        router.push("/otp");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    formData,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
    clearError,
    isSubmitted,
    isFormValid,
    fieldErrors,
  };
};
