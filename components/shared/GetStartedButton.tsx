"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { account } from "@/lib/appwrite";

export default function GetStartedButton() {
  const router = useRouter();

  async function handleClick() {
    try {
      await account.deleteSession("current");
    } catch {
      // No active session, continue to login.
    } finally {
      router.push("/login");
    }
  }

  return (
    <Button type="button" onClick={handleClick}>
      Get Started
    </Button>
  );
}
