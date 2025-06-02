import Sidebar from "@/shared/_admin/components/sidebar";
import Pattern from "@/shared/components/Pattern";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 relative bg-gradient-to-br from-slate-900 to-violet-950 overflow-hidden min-h-screen w-full">
        {children}
        <Pattern />
      </main>
    </div>
  );
}
