import React, { forwardRef } from "react";
import { InputHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const inputVariants = cva(
  "rounded-lg w-full px-4 py-2 font-changa transition-colors focus:outline-none focus:ring-2",
  {
    variants: {
      variant: {
        primary:
          "bg-white text-blue-400 border border-purple-300 focus:ring-purple-400 placeholder:text-gray-400",
        secondary:
          "bg-white text-white border-2 border-blue-300 focus:ring-blue-400 placeholder:text-white/60",
        error:
          "bg-white text-white border border-red-400 focus:ring-red-500 placeholder:text-white/50",
      },
      size: {
        small: "h-9 text-sm",
        medium: "h-11 text-base",
        large: "h-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, variant, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-white font-medium text-sm mb-1">
            {label}
          </label>
        )}
        <input
          className={cn(inputVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input, inputVariants };
