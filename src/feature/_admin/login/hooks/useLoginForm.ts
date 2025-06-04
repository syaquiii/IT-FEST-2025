"use client";

import React from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";

export const useLoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();

  const { login, loading, user, isAuthenticated, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await login(email, password);
      router.push("/mangujo/admin/dashboard");
    } catch (error) {
      setError((error as Error).message || "Login failed. Please try again.");
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  return {
    email,
    password,
    error,

    loading,
    user,
    isAuthenticated,

    setEmail,
    setPassword,
    setError,
    handleSubmit,
    logout,
    resetForm,
  };
};
