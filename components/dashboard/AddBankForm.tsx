"use client";

import { useState } from "react";
import { toast } from "sonner";
import { account, databases, ID } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

function createAccountNumber() {
  const digits = new Uint8Array(10);
  crypto.getRandomValues(digits);
  digits[0] = (digits[0] % 9) + 1;

  return Array.from(digits, (digit) => (digit % 10).toString()).join("");
}

export default function AddBankForm() {
  const [bankName, setBankName] = useState("");
  const [balance, setBalance] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const currentUser = await account.get();

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_BANK_ACCOUNTS_TABLE_ID!,
        ID.unique(),
        {
          userId: currentUser.$id,
          ownerName: currentUser.name,
          bankName,
          accountNumber: createAccountNumber(),
          balance: Number(balance),
        }
      );

      toast.success("Bank account added!");

      setBankName("");
      setBalance("");
      router.push("/my-banks");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add bank account!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 max-w-xl rounded-2xl border bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-bold">Add Bank Account</h2>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">Bank Name</label>
        <input
          type="text"
          placeholder="BCA, Mandiri, BNI"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Initial Balance</label>
        <input
          type="number"
          placeholder="10000"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-black px-4 py-3 font-semibold text-white hover:bg-gray-800"
      >
        Add Bank
      </button>
    </form>
  );
}