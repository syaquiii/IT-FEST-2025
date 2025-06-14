import {
  AuthResponse,
  RegisterCredentials,
  OTPVerificationData,
  JWTPayload,
} from "@/shared/type/TAuth";
import { apiClient } from "../core/core";
import { AxiosError } from "axios";

const TEMP_REGISTER_KEY = "temp_register_data";
const TEMP_REGISTER_FORM_KEY = "temp_register_form";

export class RegisterService {
  private static instance: RegisterService;

  public static getInstance(): RegisterService {
    if (!RegisterService.instance) {
      RegisterService.instance = new RegisterService();
    }
    return RegisterService.instance;
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      if (credentials.password !== credentials.confirm_password) {
        throw new Error("Password dan konfirmasi tidak cocok");
      }

      const response = await apiClient.post<{ token: string; message: string }>(
        "/auth/register",
        credentials
      );

      if (response.status.isSuccess && response.data) {
        const decoded = this.decodeToken(response.data.token);
        const tempData = {
          token: response.data.token,
          UserID: decoded.UserID,
          expiresAt: Date.now() + 5 * 60 * 1000,
        };

        this.setTempRegisterData(tempData);
        this.setTempRegisterForm(credentials);

        return {
          status: response.status,
          message: response.message,
          data: {
            UserID: decoded.UserID,
            token: response.data.token,
          },
        };
      }

      return response as AuthResponse;
    } catch (err) {
      let errorMessage = "Terjadi kesalahan saat registrasi";

      if (err instanceof AxiosError) {
        const apiMessage = err.response?.data?.data;
        if (typeof apiMessage === "string") {
          errorMessage = apiMessage;
        } else if (Array.isArray(apiMessage)) {
          errorMessage = apiMessage.join(", ");
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      throw new Error(errorMessage);
    }
  }

  async verifyOTP(otpCode: string): Promise<AuthResponse> {
    const temp = this.getTempRegisterData();

    if (!temp || this.isTokenExpired(temp.token)) {
      throw new Error("Sesi OTP kadaluarsa. Silakan kirim ulang OTP.");
    }
    const payload: OTPVerificationData = {
      user_id: temp.UserID,
      otp_code: otpCode,
    };

    try {
      const response = await apiClient.patch<{
        token: string;
        message?: string;
      }>("/auth/register", payload);

      if (response.status.isSuccess && response.data) {
        apiClient.setEncryptedAuthTokens(response.data.token);
        localStorage.setItem(
          "user_data",
          JSON.stringify(this.decodeToken(response.data.token))
        );
        this.clearTempRegisterData();
        this.clearTempRegisterForm();

        return {
          status: response.status,
          message: response.message,
          data: {
            token: response.data.token,
          },
        };
      }

      return {
        status: response.status,
        message: response.message ?? "Verifikasi OTP gagal",
        data: null,
      };
    } catch (err) {
      let errorMessage = "Gagal verifikasi OTP";

      if (err instanceof AxiosError) {
        const apiMessage = err.response?.data?.data;
        if (typeof apiMessage === "string") {
          errorMessage = apiMessage;
        } else if (Array.isArray(apiMessage)) {
          errorMessage = apiMessage.join(", ");
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      console.error("[Verify OTP Error]:", errorMessage);
      throw new Error(errorMessage);
    }
  }

  async resendOTP(): Promise<AuthResponse> {
    const raw = localStorage.getItem("temp_register_data");
    const temp = raw ? JSON.parse(raw) : null;

    if (!temp || !temp.UserID) {
      throw new Error("Data registrasi tidak ditemukan. Silakan daftar ulang.");
    }

    const payload = { user_id: temp.UserID };

    try {
      const response = await apiClient.patch<{ message: string }>(
        "/auth/register/resend",
        payload
      );

      const updated = {
        ...temp,
        expiresAt: Date.now() + 5 * 60 * 1000,
      };

      localStorage.setItem("temp_register_data", JSON.stringify(updated));

      return {
        status: response.status,
        message: response.message,
        data: null,
      };
    } catch (err) {
      let errorMessage = "Gagal mengirim ulang kode OTP";

      if (err instanceof AxiosError) {
        const apiMessage = err.response?.data?.message;
        if (typeof apiMessage === "string") {
          errorMessage = apiMessage;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      throw new Error(errorMessage);
    }
  }

  getOTPTimeRemaining(): number {
    const data = this.getTempRegisterData();
    if (!data) return 0;

    return Math.max(0, Math.floor((data.expiresAt - Date.now()) / 1000));
  }

  canAccessOTPPage(): boolean {
    const stored = localStorage.getItem(TEMP_REGISTER_KEY);
    if (!stored) return false;

    try {
      const data = JSON.parse(stored);
      return !!data?.UserID;
    } catch {
      return false;
    }
  }

  private decodeToken(token: string): JWTPayload {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Gagal decode token:", error);
      throw new Error("Format token tidak valid");
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token);
      const now = Date.now() / 1000;
      return !decoded.exp || decoded.exp < now;
    } catch {
      return true;
    }
  }

  private setTempRegisterData(data: {
    token: string;
    UserID: string;
    expiresAt: number;
  }): void {
    localStorage.setItem(TEMP_REGISTER_KEY, JSON.stringify(data));
  }

  private getTempRegisterData(): {
    token: string;
    UserID: string;
    expiresAt: number;
  } | null {
    const stored = localStorage.getItem(TEMP_REGISTER_KEY);
    if (!stored) return null;

    try {
      const data = JSON.parse(stored) as {
        token: string;
        UserID: string;
        expiresAt: number;
      };
      if (Date.now() > data.expiresAt) {
        return null;
      }
      return data;
    } catch {
      return null;
    }
  }

  private clearTempRegisterData(): void {
    localStorage.removeItem(TEMP_REGISTER_KEY);
  }

  private setTempRegisterForm(data: RegisterCredentials): void {
    localStorage.setItem(TEMP_REGISTER_FORM_KEY, JSON.stringify(data));
  }

  private clearTempRegisterForm(): void {
    localStorage.removeItem(TEMP_REGISTER_FORM_KEY);
  }
}

export const registerService = RegisterService.getInstance();
