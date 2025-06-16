import { AxiosError } from "axios";
import { apiClient } from "../core/core";

const FORGOT_PASSWORD_STORAGE_KEY = "forgot_password_data";

export interface ForgotPassCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  password: string;
  confirm_password: string;
  token?: string;
}

export interface ApiStatus {
  code: number;
  isSuccess: boolean;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  status: ApiStatus;
}

export interface ReqForgotPassResponse {
  message: string;
  data: string;
  status: ApiStatus;
}

export interface ForgotPassResponse {
  message: string;
  data: null;
  status: ApiStatus;
}

interface ForgotPasswordStorage {
  email: string;
  token: string | undefined;
  isOTPVerified: boolean;
  otpExpiryTime: number;
  userId: string;
  verificationToken?: string;
}

interface TokenPayload {
  UserID?: string;
  userId?: string;
  sub?: string;
  [key: string]: unknown;
}

export class ForgotPasswordService {
  private static instance: ForgotPasswordService;

  public static getInstance(): ForgotPasswordService {
    if (!ForgotPasswordService.instance) {
      ForgotPasswordService.instance = new ForgotPasswordService();
    }
    return ForgotPasswordService.instance;
  }

  async requestForgotPassword(
    credentials: ForgotPassCredentials
  ): Promise<ReqForgotPassResponse> {
    try {
      const response = await apiClient.post<string>(
        "/auth/forgot-password",
        credentials
      );

      if (response.status.isSuccess) {
        const token = response.data || "";

        let userId: string | null = null;
        try {
          if (token && typeof token === "string") {
            const tokenPayload = JSON.parse(
              atob(token.split(".")[1])
            ) as TokenPayload;
            userId =
              tokenPayload.UserID ||
              tokenPayload.userId ||
              tokenPayload.sub ||
              null;
          }
        } catch (e) {
          console.error("Error parsing token:", e);
        }

        const forgotPasswordData: ForgotPasswordStorage = {
          email: credentials.email,
          token: token,
          userId: userId || "",
          otpExpiryTime: Date.now() + 1 * 60 * 1000,
          isOTPVerified: false,
        };

        this.saveForgotPasswordData(forgotPasswordData);
        console.log(this.getForgotPasswordData());

        return {
          message: response.message || "Email berhasil dikirim",
          data: token,
          status: {
            code: response.status.code,
            isSuccess: true,
          },
        };
      }

      const errorMessage = response.message || "Gagal meminta password reset.";
      const errorCode = response.status?.code || 400;

      return {
        message: errorMessage,
        data: "",
        status: {
          code: errorCode,
          isSuccess: false,
        },
      };
    } catch (err) {
      console.error("❌ Error:", err);

      let errorMessage = "Terjadi kesalahan saat meminta password reset";
      let errorCode = 500;

      if (err instanceof AxiosError) {
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }
        if (err.response?.data?.status?.code) {
          errorCode = err.response.data.status.code;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      return {
        message: errorMessage,
        data: "",
        status: { code: errorCode, isSuccess: false },
      };
    }
  }

  // Verify OTP for forgot password
  async verifyForgotPasswordOTP(otp: string): Promise<ForgotPassResponse> {
    try {
      const storedData = this.getForgotPasswordData();
      if (!storedData?.token || !storedData?.userId) {
        throw new Error(
          "Token atau User ID tidak ditemukan. Silakan ulangi proses reset password."
        );
      }
      const response = await apiClient.post<null>("/auth/verify-otp", {
        user_id: storedData.userId,
        otp,
      });
      console.log("Verifikasi OTP:", response);

      if (response?.status.isSuccess) {
        const updatedData: ForgotPasswordStorage = {
          ...storedData,
          isOTPVerified: true,
        };
        this.saveForgotPasswordData(updatedData);

        return {
          message: response?.message || "Verifikasi OTP berhasil.",
          data: null,
          status: response.status,
        };
      } else {
        return {
          message: response?.message || "Verifikasi OTP gagal.",
          data: null,
          status: response?.status || { code: 400, isSuccess: false },
        };
      }
    } catch (err) {
      let errorMessage = "Verifikasi OTP gagal";

      if (err instanceof AxiosError) {
        const apiMessage = err.response?.data?.message;
        if (typeof apiMessage === "string") {
          errorMessage = apiMessage;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      return {
        message: errorMessage,
        data: null,
        status: { code: 500, isSuccess: false },
      };
    }
  }

  // Resend OTP
  async resendForgotPasswordOTP(): Promise<ForgotPassResponse> {
    try {
      const storedData = this.getForgotPasswordData();
      if (!storedData?.userId) {
        throw new Error(
          "User ID tidak ditemukan. Silakan ulangi proses reset password."
        );
      }

      const response = await apiClient.patch<null>("/auth/resend-token", {
        user_id: storedData.userId,
      });

      if (response?.status.isSuccess) {
        // Update OTP expiry time setelah berhasil resend
        const updatedData: ForgotPasswordStorage = {
          ...storedData,
          otpExpiryTime: Date.now() + 5 * 60 * 1000, // 5 menit sesuai API response
        };
        this.saveForgotPasswordData(updatedData);

        return {
          message: response?.message || "OTP berhasil dikirim ulang.",
          data: null,
          status: response.status,
        };
      } else {
        return {
          message: response?.message || "Gagal mengirim ulang OTP.",
          data: null,
          status: response?.status || { code: 400, isSuccess: false },
        };
      }
    } catch (err) {
      let errorMessage = "Gagal mengirim ulang OTP";

      if (err instanceof AxiosError) {
        const apiMessage = err.response?.data?.message;
        if (typeof apiMessage === "string") {
          errorMessage = apiMessage;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      return {
        message: errorMessage,
        data: null,
        status: { code: 500, isSuccess: false },
      };
    }
  }

  async resetPass(
    credentials: ResetPasswordCredentials
  ): Promise<ForgotPassResponse> {
    try {
      const storedData = this.getForgotPasswordData();

      const response = await apiClient.post<null>("/auth/reset-password", {
        new_password: credentials.password,
        confirm_password: credentials.confirm_password,
        user_id: storedData?.userId,
      });

      if (response?.status.isSuccess) {
        this.clearAllForgotPasswordData();

        return {
          message: response?.message || "Reset password berhasil.",
          data: null,
          status: response.status,
        };
      }

      return {
        message: response?.message || "Reset password gagal.",
        data: null,
        status: response?.status || { code: 400, isSuccess: false },
      };
    } catch (err) {
      let errorMessage = "Terjadi kesalahan saat reset password";

      if (err instanceof AxiosError) {
        const apiMessage =
          err.response?.data?.message || err.response?.data?.data;
        if (typeof apiMessage === "string") {
          errorMessage = apiMessage;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      return {
        message: errorMessage,
        data: null,
        status: { code: 500, isSuccess: false },
      };
    }
  }

  // Storage management methods
  private saveForgotPasswordData(data: ForgotPasswordStorage): void {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(FORGOT_PASSWORD_STORAGE_KEY, JSON.stringify(data));
        console.log("💾 Saved to localStorage:", data);
      }
    } catch (error) {
      console.error("💾 Error saving to localStorage:", error);
    }
  }

  getForgotPasswordData(): ForgotPasswordStorage | null {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(FORGOT_PASSWORD_STORAGE_KEY);
        if (!stored) return null;
        return JSON.parse(stored) as ForgotPasswordStorage;
      }
      return null;
    } catch (error) {
      console.error("💾 Error reading from localStorage:", error);
      return null;
    }
  }

  private updateForgotPasswordData(
    updates: Partial<ForgotPasswordStorage>
  ): void {
    const existing = this.getForgotPasswordData();
    if (!existing) return;

    const merged: ForgotPasswordStorage = { ...existing, ...updates };
    this.saveForgotPasswordData(merged);
  }

  clearAllForgotPasswordData(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(FORGOT_PASSWORD_STORAGE_KEY);
      console.log("🗑️ Cleared all forgot password data");
    }
  }

  // OTP expiry management (now from single storage)
  getOTPTimeRemaining(): number {
    const data = this.getForgotPasswordData();
    if (!data?.otpExpiryTime) return 0;

    const remaining = Math.max(
      0,
      Math.floor((data.otpExpiryTime - Date.now()) / 1000)
    );
    return remaining;
  }

  // Access control methods
  canAccessOTPPage(): boolean {
    const data = this.getForgotPasswordData();
    return !!(data?.userId && data?.email);
  }

  canAccessResetPasswordPage(): boolean {
    const data = this.getForgotPasswordData();
    return !!(data?.isOTPVerified && (data?.verificationToken || data?.token));
  }

  // Get user ID
  getUserId(): string | null {
    const data = this.getForgotPasswordData();
    return data?.userId || null;
  }

  // Legacy compatibility methods
  async requestReset(credentials: ForgotPassCredentials): Promise<{
    message: string;
    data: string | null;
    status?: boolean;
  }> {
    const result = await this.requestForgotPassword(credentials);
    return {
      message: result.message,
      data: result.data || null,
      status: result.status?.isSuccess,
    };
  }

  getTempResetPass(): { token: string } | null {
    const data = this.getForgotPasswordData();
    if (!data) return null;

    const token = data.verificationToken || data.token;
    return token ? { token } : null;
  }

  getTempForgotData(): ForgotPasswordStorage | null {
    return this.getForgotPasswordData();
  }

  clearTempResetPass(): void {
    this.clearAllForgotPasswordData();
  }

  clearTempForgotData(): void {
    this.clearAllForgotPasswordData();
  }
}

export const forgotPasswordService = ForgotPasswordService.getInstance();
