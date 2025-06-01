import React from "react";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";

const LoginForm = () => {
  return (
    <form className="w-full max-w-md mx-auto min-h-[20rem] p-4 sm:p-6 md:p-8 text-white font-changa bg-blue-400 z-20 rounded-2xl sm:rounded-3xl border-2 border-purple-300">
      <div className="space-y-3 sm:space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
          className="text-sm sm:text-base"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
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
            className="w-full text-sm sm:text-base"
          >
            Login
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
