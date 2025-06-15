import React from "react";
import { Button } from "@/shared/components/ui/Button";

interface ResendButtonProps {
  // State props
  resendAvailable: boolean | string;
  resendLoading: boolean;
  timeLeft: number;

  // Function props
  onResend: () => void;
  formatTime: (seconds: number) => string;

  // Optional customization props
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;

  // Text customization
  texts?: {
    notReceived?: string;
    resendButton?: string;
    resendLoading?: string;
    timeRemaining?: string;
  };

  // Layout options
  layout?: "vertical" | "horizontal";
  showTimeRemaining?: boolean;
}

export const ResendButton: React.FC<ResendButtonProps> = ({
  resendAvailable,
  resendLoading,
  timeLeft,
  onResend,
  formatTime,

  className = "",
  texts = {},
  layout = "vertical",
  showTimeRemaining = true,
}) => {
  const defaultTexts = {
    notReceived: "Tidak menerima kode?",
    resendButton: "Kirim Ulang OTP",
    resendLoading: "Mengirim ulang...",
    timeRemaining: "Kirim ulang tersedia dalam",
    ...texts,
  };

  // Don't render if resend is not available and no time left
  if (!resendAvailable && timeLeft <= 0) {
    return null;
  }

  const ResendButtonElement = (
    <Button
      variant={"primary"}
      size={"small"}
      onClick={onResend}
      disabled={resendLoading || !resendAvailable}
      className={`${className} ${
        !resendAvailable ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {resendLoading ? defaultTexts.resendLoading : defaultTexts.resendButton}
    </Button>
  );

  const TimeDisplay = showTimeRemaining && timeLeft > 0 && (
    <p className="text-sm text-purple-200">
      {defaultTexts.timeRemaining}: {formatTime(timeLeft)}
    </p>
  );

  if (layout === "horizontal") {
    return (
      <div className="flex items-center justify-between gap-4">
        <div className="text-center">
          <p className="text-purple-100 mb-1">{defaultTexts.notReceived}</p>
          {TimeDisplay}
        </div>
        {resendAvailable ? (
          ResendButtonElement
        ) : (
          <div className="text-center">{TimeDisplay}</div>
        )}
      </div>
    );
  }

  // Vertical layout (default)
  return (
    <div className="text-center space-y-2">
      <p className="text-purple-100">{defaultTexts.notReceived}</p>

      {resendAvailable ? ResendButtonElement : TimeDisplay}
    </div>
  );
};

// Specific variants for different use cases
export const RegistrationResendButton: React.FC<
  Omit<ResendButtonProps, "texts"> & {
    texts?: Partial<ResendButtonProps["texts"]>;
  }
> = (props) => {
  const registrationTexts = {
    notReceived: "Tidak menerima kode verifikasi?",
    resendButton: "Kirim Ulang Kode Verifikasi",
    resendLoading: "Mengirim ulang kode...",
    timeRemaining: "Kirim ulang tersedia dalam",
    ...props.texts,
  };

  return <ResendButton {...props} texts={registrationTexts} />;
};

export const ForgotPasswordResendButton: React.FC<
  Omit<ResendButtonProps, "texts"> & {
    texts?: Partial<ResendButtonProps["texts"]>;
  }
> = (props) => {
  const forgotPasswordTexts = {
    notReceived: "Tidak menerima kode reset password?",
    resendButton: "Kirim Ulang Kode Reset",
    resendLoading: "Mengirim ulang kode reset...",
    timeRemaining: "Kirim ulang tersedia dalam",
    ...props.texts,
  };

  return <ResendButton {...props} texts={forgotPasswordTexts} />;
};
