"use client";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
  requireAdmin?: boolean;
  userOnly?: boolean; // New prop to restrict admin access
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
  userOnly = false,
  fallbackPath = "/login",
}: ProtectedRouteProps) {
  const { loading, isAuthenticated, IsAdmin } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        setIsAuthorized(false);
        router.push(fallbackPath);
        return;
      }

      if (userOnly && IsAdmin) {
        setIsAuthorized(false);
        router.push("/mangujo/admin/dashboard");
        return;
      }

      if (requireAdmin && !IsAdmin) {
        setIsAuthorized(false);
        router.push("/unauthorized");
        return;
      }

      setIsAuthorized(true);
    }
  }, [loading, isAuthenticated, IsAdmin, requireAdmin, userOnly, fallbackPath]);

  if (loading || isAuthorized === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#030d35]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
