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
      }>("/auth/login", credentials);

      if (response.status.isSuccess && response.data) {
        const userInfo = this.decodeToken(response.data.token);

        const authData = {
          token: response.data.token,
          user: userInfo,
        };

        this.setAuthData(authData);

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
        const token = this.getStoredToken();
        if (token) {
          const tokenData = this.decodeToken(token);
          // Merge API response with token data
          return {
            ...response.data,
            role: tokenData.role,
            IsAdmin: tokenData.IsAdmin,
            UserID: tokenData.UserID,
            permissions: tokenData.permissions,
          };
        }
        return response.data;
      }

      // Fallback to token data only
      const token = this.getStoredToken();
      if (token) {
        return this.decodeToken(token);
      }

      return null;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Get current user error:", err.message);
      }
      // Always fallback to token data
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

      const IsAdmin = payload.IsAdmin;
      const role = IsAdmin === true ? "admin" : "user";

      return {
        UserID: payload.UserID,
        email: "", // Empty since not in token
        name: "", // Empty since not in token
        role: role,
        IsAdmin: IsAdmin,
        permissions: [], // Empty since not in token
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Token decode error:", err.message);
      }
      throw new Error("Invalid token format");
    }
  }

  private setAuthData(authData: { token: string; user: User }): void {
    if (typeof window !== "undefined") {
      apiClient.setEncryptedAuthTokens(authData.token);
    }
  }

  private clearAuthData(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
    }
  }

  private getStoredToken(): string | null {
    return apiClient.getDecryptedToken();
  }

  getStoredUser(): User | null {
    const token = this.getStoredToken();
    if (token) {
      try {
        return this.decodeToken(token);
      } catch {
        return null;
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

  IsAdmin(): boolean {
    const token = this.getStoredToken();
    if (!token) return false;

    try {
      const payload: JWTPayload = JSON.parse(atob(token.split(".")[1]));
      return payload.IsAdmin === true;
    } catch {
      return false;
    }
  }

  getUserId(): string | null {
    const token = this.getStoredToken();
    if (!token) return null;

    try {
      const payload: JWTPayload = JSON.parse(atob(token.split(".")[1]));
      return payload.UserID || null;
    } catch {
      return null;
    }
  }

  getTokenForApiCall(): string | null {
    return apiClient.getDecryptedToken();
  }
}

export const authService = AuthService.getInstance();
