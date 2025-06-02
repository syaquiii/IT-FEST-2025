import AdminLoginContainer from "@/feature/_admin/login/container/AdminLoginContainer";
import { AuthProvider } from "@/shared/context/AuthContext";
import React from "react";

const page = () => {
  return (
    <AuthProvider>
      <AdminLoginContainer />
    </AuthProvider>
  );
};

export default page;
