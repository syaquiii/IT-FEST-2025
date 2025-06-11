"use client";
import { ProtectedRoute } from "@/shared/components/protected/ProtectedRoutes";
import Sidebar from "../components/sidebar";
import Pattern from "@/shared/components/Pattern";
import { useAuth } from "@/shared/hooks/useAuth";
import ImageAdmin from "@/assets/img/_admin/rusdi.webp";
interface AdminContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function AdminContainer({
  children,
  className = "",
}: AdminContainerProps) {
  const { user, logout } = useAuth();

  const profileData = {
    imageUrl: user?.name || ImageAdmin.src,
    username: user?.name || user?.email?.split("@")[0] || "Admin",
    email: user?.email || "",
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-900 to-violet-950">
        <Sidebar onLogout={logout} profileData={profileData} />
        <main
          className={`flex-1 relative overflow-hidden min-h-screen ${className}`}
        >
          <div className="relative z-10 h-full">{children}</div>
          <Pattern />
        </main>
      </div>
    </ProtectedRoute>
  );
}
