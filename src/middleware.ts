import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import CryptoJS from "crypto-js";

const publicPaths = ["/login", "/register", "/forgot-password", "/"];
const adminPaths = ["/admin"];
const userPaths = ["/dashboard", "/profile"];

function decryptToken(encryptedToken: string): string | null {
  try {
    const encryptionKey =
      process.env.ENCRYPTION_KEY || "mangujoterbaikmagelangan";
    const bytes = CryptoJS.AES.decrypt(encryptedToken, encryptionKey);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedToken) {
      throw new Error("Failed to decrypt token");
    }

    return decryptedToken;
  } catch (error) {
    console.error("Token decryption failed:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    publicPaths.some((path) => pathname.startsWith(path)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // mengambil decrypted token dari cookie atau header
  let encryptedToken = request.cookies.get("auth_token")?.value;

  if (!encryptedToken) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      encryptedToken = authHeader.replace("Bearer ", "");
    }
  }

  if (!encryptedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Decrypt token
  const token = decryptToken(encryptedToken);

  if (!token) {
    console.error("Failed to decrypt token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const userRole = payload.role as string;

    if (adminPaths.some((path) => pathname.startsWith(path))) {
      if (userRole !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    if (userPaths.some((path) => pathname.startsWith(path))) {
      if (!["user", "admin"].includes(userRole)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // Add decrypted token to request headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-decrypted-token", token);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
