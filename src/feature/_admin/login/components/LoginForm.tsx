"use client";

import React from "react";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useAuth } from "@/shared/hooks/useAuth";

interface FormState {
  email: string;
  password: string;
  error: string;
}

interface LoginError extends Error {
  message: string;
}

const LoginForm = () => {
  const [formState, setFormState] = React.useState<FormState>({
    email: "",
    password: "",
    error: "",
  });

  const { login, loading, user, isAuthenticated, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, error: "" }));

    if (!formState.email || !formState.password) {
      setFormState((prev) => ({ ...prev, error: "Please fill in all fields" }));
      return;
    }

    if (!formState.email.includes("@")) {
      setFormState((prev) => ({
        ...prev,
        error: "Please enter a valid email address",
      }));
      return;
    }

    try {
      await login(formState.email, formState.password);
      setFormState((prev) => ({
        ...prev,
        email: "",
        password: "",
      }));
    } catch (error) {
      const loginError = error as LoginError;
      const errorMsg = loginError.message || "Login failed. Please try again.";
      setFormState((prev) => ({ ...prev, error: errorMsg }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setFormState((prev) => ({
      ...prev,
      email: newEmail,
      error: "",
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormState((prev) => ({
      ...prev,
      password: newPassword,
      error: "",
    }));
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {}
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto min-h-[20rem] p-4 sm:p-6 md:p-8 text-white font-changa bg-blue-400 rounded-2xl sm:rounded-3xl border-2 border-purple-300 relative"
      >
        <div className="space-y-3 sm:space-y-4">
          {formState.error && (
            <div className="text-red-200 text-sm bg-red-500/20 p-3 rounded border border-red-300/20">
              <div className="font-semibold">❌ Error:</div>
              {formState.error}
            </div>
          )}

          {isAuthenticated && user && (
            <div className="text-green-200 text-sm bg-green-500/20 p-3 rounded border border-green-300/20">
              <div className="font-semibold">✅ Success:</div>
              Welcome, {user.id}! You are now logged in.
            </div>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formState.email}
            onChange={handleEmailChange}
            required
            disabled={loading}
            className="text-sm sm:text-base"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formState.password}
            onChange={handlePasswordChange}
            required
            disabled={loading}
            className="text-sm sm:text-base"
          />

          <div className="text-xs sm:text-sm text-white/80 italic group">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
            Forgot password? Please contact PIT for assistance
          </div>

          <div className="pt-3 sm:pt-4">
            <Button
              type="submit"
              size={"small"}
              disabled={
                loading ||
                !formState.email ||
                !formState.password ||
                isAuthenticated
              }
              className="w-full text-sm sm:text-base disabled:opacity-50"
            >
              {loading
                ? "Logging in..."
                : isAuthenticated
                ? "Already Logged In"
                : "Login"}
            </Button>
          </div>

          {isAuthenticated && (
            <div className="pt-2">
              <Button
                type="button"
                onClick={handleLogout}
                size={"small"}
                disabled={loading}
                className="w-full text-sm sm:text-base bg-red-500 hover:bg-red-600"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
