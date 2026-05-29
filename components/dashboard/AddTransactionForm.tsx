"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { account, databases, ID } from "@/lib/appwrite";
import { toast } from "sonner";
import { Query } from "appwrite";

export default function AddTransactionForm() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {

        const currentUser = await account.get();

        const bankResponse = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_BANK_ACCOUNTS_TABLE_ID!,
          [Query.equal("userId", currentUser.$id)]
        );

        const bank = bankResponse.documents[0];

        const newBalance =
          type === "income"
            ? bank.balance + Number(amount)
            : bank.balance - Number(amount);
          
          if (newBalance < 0) {
            toast.error("Insufficient balance!");
            return;
          }

        await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_TRANSACTIONS_TABLE_ID!,
        ID.unique(),
        {
            userId: currentUser.$id,
            title,
            type,
            amount: Number(amount),
            recipient: "-",
            note,
            date: new Date().toISOString(),
        }
        );

        await databases.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_BANK_ACCOUNTS_TABLE_ID!,
          bank.$id,
          {
            balance: newBalance,
          }
        );

        toast.success("Transaction added!");

        router.push("/dashboard");
        router.refresh();

    } catch (error) {

        console.error(error);

        toast.error("Failed to add transaction!");
    }
    }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl rounded-2xl border bg-white p-6 shadow-sm"
    >

      <div className="mb-5">

        <label className="mb-2 block text-sm font-medium">
          Title
        </label>

        <input
          type="text"
          placeholder="Salary, Shopping, Food"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          required
        />

      </div>

      <div className="mb-5">

        <label className="mb-2 block text-sm font-medium">
          Type
        </label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

      </div>

      <div className="mb-5">

        <label className="mb-2 block text-sm font-medium">
          Amount
        </label>

        <input
          type="number"
          placeholder="100"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          required
        />

      </div>

      <div className="mb-6">

        <label className="mb-2 block text-sm font-medium">
          Note
        </label>

        <textarea
          placeholder="Optional note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-28 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
        />

      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-black px-4 py-3 font-semibold text-white hover:bg-gray-800"
      >
        Add Transaction
      </button>

    </form>
  );
}