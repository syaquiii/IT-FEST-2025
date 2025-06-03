import {
  AuthResponse,
  JWTPayload,
  LoginCredentials,
  User,
} from "@/shared/type/TAuth";
import { apiClient } from "../core/core";

export class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<{
        token: string;
        refreshToken?: string;
      }>("/auth/login", credentials);

      if (response.status.isSuccess && response.data) {
        const userInfo = this.decodeToken(response.data.token);

        if (!userInfo.role) {
          userInfo.role = "admin";
        }

        const authData = {
          token: response.data.token,
          refreshToken: response.data.refreshToken || "",
          user: userInfo,
        };

        this.setAuthData(authData);

        window.location.href = "/mangujo/admin/dashboard";

        return {
          status: response.status,
          message: response.message,
          data: authData,
        };
      }

      return response as AuthResponse;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message || "Login failed");
      }
      throw new Error("Login failed");
    }
  }

  async logout(): Promise<void> {
    this.clearAuthData();
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<User>("/users/profile");
      if (response.status.isSuccess && response.data) {
        // Ensure admin role is set if not present from API
        if (!response.data.role) {
          response.data.role = "admin";
        }
        return response.data;
      }

      const token = this.getStoredToken();
      if (token) {
        return this.decodeToken(token);
      }

      return null;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Get current user error:", err.message);
      }
      const token = this.getStoredToken();
      if (token) {
        try {
          return this.decodeToken(token);
        } catch (decodeErr: unknown) {
          if (decodeErr instanceof Error) {
            console.error("Token decode error:", decodeErr.message);
          }
          return null;
        }
      }
      return null;
    }
  }

  private decodeToken(token: string): User {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const payload: JWTPayload = JSON.parse(jsonPayload);
      // masih hardcoded ke admin
      return {
        id: payload.UserID,
        email: "",
        name: "",
        role: payload.role || "admin",
        permissions: payload.permissions || [],
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Token decode error:", err.message);
      }
      throw new Error("Invalid token format");
    }
  }

  private setAuthData(authData: {
    token: string;
    refreshToken: string;
    user: User;
  }): void {
    if (typeof window !== "undefined") {
      // Use apiClient to set encrypted tokens
      apiClient.setEncryptedAuthTokens(authData.token, authData.refreshToken);
    }
  }

  private clearAuthData(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_data");
    }
  }

  private getStoredToken(): string | null {
    // Use apiClient untuk mengambil token dari local storage atau cookie yang sudah di decrypt
    return apiClient.getDecryptedToken();
  }

  getStoredUser(): User | null {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user_data");
      if (userData) {
        try {
          const user = JSON.parse(userData) as User;
          if (!user.role) {
            user.role = "admin";
            localStorage.setItem("user_data", JSON.stringify(user));
          }
          return user;
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error("Error parsing stored user data:", err.message);
          }
          return null;
        }
      }

      const token = this.getStoredToken();
      if (token) {
        try {
          return this.decodeToken(token);
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      try {
        const token = apiClient.getDecryptedToken();
        if (!token) return false;

        const payload: JWTPayload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp > currentTime;
      } catch (error) {
        console.error("Authentication check failed:", error);
        return false;
      }
    }
    return false;
  }

  hasRole(requiredRole: string): boolean {
    const user = this.getStoredUser();
    return user?.role === requiredRole;
  }

  hasPermission(permission: string): boolean {
    const user = this.getStoredUser();
    return user?.permissions?.includes(permission) || false;
  }

  // Ambil User Id by token
  getUserId(): string | null {
    const user = this.getStoredUser();
    return user?.id || null;
  }

  // Method untuk mengambil decrypted token untuk API call
  getTokenForApiCall(): string | null {
    return apiClient.getDecryptedToken();
  }

  // Method untuk mengambil decrypted refresh token untuk API call
  getRefreshTokenForApiCall(): string | null {
    return apiClient.getDecryptedRefreshToken();
  }
}

export const authService = AuthService.getInstance();
