import { AdminContainer } from "@/shared/_admin/container/AdminContainer";
import { AuthProvider } from "@/shared/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminContainer>{children}</AdminContainer>
    </AuthProvider>
  );
}
