"use client";

import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

export default function Header() {

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    async function getUser() {
      try {

        const currentUser = await account.get();

        setUser({
          name: currentUser.name,
          email: currentUser.email,
        });

      } catch (error) {
        console.error(error);
      }
    }

    getUser();

  }, []);

  async function handleLogout() {
    try {

      await account.deleteSession("current");

      alert("Logout success!");

      router.push("/login");

    } catch (error) {

      console.error(error);

      alert("Logout failed!");
    }
  }

  return (
    <header className="mb-8 flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back, {user?.name || "User"} 👋
        </p>
      </div>

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black font-bold text-white">
          {user?.name?.charAt(0) || "U"}
        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Logout
        </button>

      </div>

    </header>
  );
}