import { AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface RegisterCredentials {
  email: string;
  password: string;
  confirm_password: string;
}
export interface User {
  UserID?: string;
  email: string;
  name: string;
  role: "admin" | "user" | string;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
  exp?: number;
  IsAdmin?: boolean;
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
    user?: User;
    otpSent?: boolean;
    UserID?: string;
    otpExpiresAt?: string;
  } | null;
  tempData?: TempRegisterData;
}
export interface TempRegisterData {
  token: string;
  user_id: string;
  timestamp: number;
  expiresAt: number;
}
export interface ApiResponse<T> {
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
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
  IsAdmin?: boolean;
  name?: string;
  permissions?: string[];
  exp: number;
  iat?: number;
}

export interface BlobResponse {
  data: Blob;
  headers: AxiosResponseHeaders | RawAxiosResponseHeaders;
  status: number;
}

export interface ApiErrorResponse {
  code: number;
  message: string;
  errors?: string[];
}
export interface OTPVerificationData {
  userID?: string;
  user_id?: string;
  otp_code: string;
}
export interface DecodedToken {
  UserID: string;
  email?: string;
  exp: number;
  iat: number;
}
