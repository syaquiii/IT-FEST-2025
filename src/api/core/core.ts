import { ApiResponse } from "@/shared/type/TAuth";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import CryptoJS from "crypto-js";

interface RefreshTokenResponse {
  status: {
    isSuccess: boolean;
  };
  data: {
    token: string;
    refreshToken?: string;
  };
}

class Core {
  private client: AxiosInstance;
  private static instance: Core;
  private readonly encryptionKey =
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "your-default-encryption-key";

  private constructor() {
    this.client = axios.create({
      baseURL: "http://52.62.8.63:8080/api/v1",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): Core {
    if (!Core.instance) {
      Core.instance = new Core();
    }
    return Core.instance;
  }

  // Encrypt token before storing
  private encryptToken(token: string): string {
    try {
      return CryptoJS.AES.encrypt(token, this.encryptionKey).toString();
    } catch (error) {
      console.error("Token encryption failed:", error);
      throw new Error("Token encryption failed");
    }
  }

  // Decrypt token when retrieving
  private decryptToken(encryptedToken: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, this.encryptionKey);
      const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedToken) {
        throw new Error("Failed to decrypt token");
      }

      return decryptedToken;
    } catch (error) {
      console.error("Token decryption failed:", error);
      throw new Error("Token decryption failed");
    }
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        config.headers["X-Request-Time"] = Date.now().toString();

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.refreshToken();
            const newToken = this.getAuthToken();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            this.handleAuthError();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      const encryptedToken = localStorage.getItem("auth_token");
      if (encryptedToken) {
        try {
          return this.decryptToken(encryptedToken);
        } catch (error) {
          console.error("Failed to decrypt stored token:", error);
          // Clear invalid token
          this.handleAuthError();
          return null;
        }
      }
    }
    return null;
  }

  private getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      const encryptedRefreshToken = localStorage.getItem("refresh_token");
      if (encryptedRefreshToken) {
        try {
          return this.decryptToken(encryptedRefreshToken);
        } catch (error) {
          console.error("Failed to decrypt stored refresh token:", error);
          return null;
        }
      }
    }
    return null;
  }

  private async refreshToken(): Promise<void> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await this.client.post<RefreshTokenResponse>(
      "/auth/refresh",
      {
        refreshToken,
      }
    );

    if (response.data.status.isSuccess) {
      this.setAuthTokens(
        response.data.data.token,
        response.data.data.refreshToken || refreshToken
      );
    }
  }

  private setAuthTokens(token: string, refreshToken: string): void {
    if (typeof window !== "undefined") {
      try {
        // Encrypt tokens before storing
        const encryptedToken = this.encryptToken(token);
        const encryptedRefreshToken = this.encryptToken(refreshToken);

        localStorage.setItem("auth_token", encryptedToken);
        localStorage.setItem("refresh_token", encryptedRefreshToken);
      } catch (error) {
        console.error("Failed to encrypt and store tokens:", error);
        throw new Error("Failed to store authentication tokens");
      }
    }
  }

  private handleAuthError(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_data");
      window.location.href = "/login";
    }
  }

  public getDecryptedToken(): string | null {
    return this.getAuthToken();
  }

  public getDecryptedRefreshToken(): string | null {
    return this.getRefreshToken();
  }

  public setEncryptedAuthTokens(token: string, refreshToken: string): void {
    this.setAuthTokens(token, refreshToken);
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  public async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

export const apiClient = Core.getInstance();
