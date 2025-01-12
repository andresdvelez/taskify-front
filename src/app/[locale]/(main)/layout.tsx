import { Sidebar } from "@/modules/layout/templates/Sidebar";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex gap-4 px-4 py-6 h-screen">
      <Sidebar />
      {children}
    </main>
  );
}
