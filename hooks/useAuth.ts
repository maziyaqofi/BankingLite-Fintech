"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

export default function useAuth() {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {

      try {
        await account.get();
      } catch (error) {

        console.error(error);
        router.push("/login");

      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, [router]);

  return { loading };
}