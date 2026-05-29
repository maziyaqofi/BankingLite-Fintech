"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { account } from "@/lib/appwrite";

export default function useGuest() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function checkSession() {

      try {

        await account.get();

        router.replace("/dashboard");

      } catch {

        console.log("Guest user");

      } finally {

        setLoading(false);
      }
    }

    checkSession();

  }, [router]);

  return { loading };
}
