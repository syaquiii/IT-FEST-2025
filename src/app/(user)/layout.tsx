import React from "react";
import { AuthProvider } from "@/shared/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
