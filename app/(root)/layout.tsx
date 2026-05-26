import Sidebar from "@/components/shared/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <Sidebar />

      <section className="flex-1 p-8 bg-gray-50 min-h-screen">
        {children}
      </section>
    </main>
  );
}