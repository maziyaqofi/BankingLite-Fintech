"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Landmark,
  ReceiptText,
  Send,
  PlusCircle,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Banks",
    href: "/my-banks",
    icon: Landmark,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: ReceiptText,
  },
  {
    label: "Transfer",
    href: "/transfer",
    icon: Send,
  },
  {
    label: "Add Transaction",
    href: "/add-transaction",
    icon: PlusCircle,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 border-r bg-white p-6 md:block">
      <h1 className="text-2xl font-bold mb-10">
        Fintech
      </h1>

      <nav className="flex flex-col gap-3">
        {links.map((link) => {
          const Icon = link.icon;

          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />

              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}