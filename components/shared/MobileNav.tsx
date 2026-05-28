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
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Banks", href: "/my-banks", icon: Landmark },
  { label: "History", href: "/transactions", icon: ReceiptText },
  { label: "Transfer", href: "/transfer", icon: Send },
  { label: "Add", href: "/add-transaction", icon: PlusCircle },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t bg-white p-3 md:hidden">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1 text-xs ${
              isActive ? "text-black font-semibold" : "text-gray-400"
            }`}
          >
            
            <Icon size={20} />
            {link.label}
            
          </Link>
        );
      })}
    </nav>
  );
}