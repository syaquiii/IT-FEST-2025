import React from "react";
import { AuthProvider } from "@/shared/context/AuthContext";
import { ProtectedRoute } from "@/shared/components/protected/ProtectedRoutes";
import Navbar from "@/shared/components/Navbar";
import Stars from "@/feature/hero/components/Stars";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <ProtectedRoute>
          <main className="">
            <Navbar />
            <Stars />
            {children}
          </main>
        </ProtectedRoute>
      </AuthProvider>
    </>
  );
}
