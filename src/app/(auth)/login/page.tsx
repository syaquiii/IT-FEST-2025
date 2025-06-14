import LoginContainer from "@/feature/_user/login/container/LoginContainer";
import { AuthProvider } from "@/shared/context/AuthContext";
import React from "react";

const page = () => {
  return (
    <AuthProvider>
      <LoginContainer />;
    </AuthProvider>
  );
};

export default page;
