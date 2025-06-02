export interface LoginCredentials {
  email: string;
  password: string;
}
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | string;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}
export interface ApiStatus {
  code: number;
  isSuccess: boolean;
}
export interface AuthResponse {
  status: ApiStatus;
  message: string;
  data: {
    token: string;
    refreshToken?: string;
    user?: User;
  };
}
export interface ApiResponse<T> {
  status: ApiStatus;
  message: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
export interface JWTPayload {
  UserID: string;
  role?: string;
  email?: string;
  name?: string;
  permissions?: string[];
  exp: number;
  iat?: number;
}
