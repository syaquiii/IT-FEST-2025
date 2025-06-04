"use client";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
  fallbackPath = "/login",
}: ProtectedRouteProps) {
  const { loading, isAuthenticated, hasRole, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(fallbackPath);
        return;
      }

      if (requiredRole && !hasRole(requiredRole)) {
        router.push("/unauthorized");
        return;
      }

      if (requiredPermission && !hasPermission(requiredPermission)) {
        router.push("/unauthorized");
        return;
      }
    }
  }, [
    loading,
    isAuthenticated,
    requiredRole,
    requiredPermission,
    router,
    fallbackPath,
    hasRole,
    hasPermission,
  ]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#030d35]">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return null;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null;
  }

  return <>{children}</>;
}
