import { Sidebar } from "@/modules/layout/templates/Sidebar";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <Sidebar />
      {children}
    </main>
  );
}
