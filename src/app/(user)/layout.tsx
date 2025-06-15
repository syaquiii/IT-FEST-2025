import React from "react";
import { AuthProvider } from "@/shared/context/AuthContext";
import { ProtectedRoute } from "@/shared/components/protected/ProtectedRoutes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <ProtectedRoute>{children}</ProtectedRoute>
      </AuthProvider>
    </>
  );
}
