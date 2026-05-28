"use client";

import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";
import Loader from "@/components/shared/Loader";
import useAuth from "@/hooks/useAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <section className="flex-1 p-4 pb-24 md:p-8">
        {children}
      </section>

      <MobileNav />
    </main>
  );
}