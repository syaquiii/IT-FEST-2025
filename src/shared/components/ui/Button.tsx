import React, { forwardRef } from "react";
import { ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "rounded-2xl flex justify-center items-center shrink-0 h-16  font-bold text-2xl ",
  {
    variants: {
      variant: {
        primary:
          "bg-button-bg text-button-text [text-shadow:_0px_0px_30px_rgba(255,255,255,0.6)] ",
        secondary:
          "bg-button-bg text-white  [text-shadow:_0px_0px_30px_rgba(255,255,255,0.6)]",
        disabled: "bg-button-bg text-white text-[#4F5D6E]  ",
        tertiary:
          "bg-transparent border-4  border-button-bg text-button-text [text-shadow:_0px_0px_30px_rgba(255,255,255,0.6)]",
      },
      size: {
        small: "w-36",
        normal: "w-60",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "normal",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button, buttonVariants };
