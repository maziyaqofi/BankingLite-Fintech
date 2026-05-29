"use client";

import { toast } from "sonner";
import { account, databases, ID } from "@/lib/appwrite";
import { Query } from "appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BankAccount } from "@/types";

export default function TransferForm() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const router = useRouter();
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [selectedBankId, setSelectedBankId] = useState("");

  useEffect(() => {
    async function getBanks() {
      try {
        const currentUser = await account.get();

        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_BANK_ACCOUNTS_TABLE_ID!,
          [Query.equal("userId", currentUser.$id)]
        );

        const userBanks = response.documents as unknown as BankAccount[];

        setBanks(userBanks);
        setSelectedBankId(userBanks[0]?.$id || "");
      } catch (error) {
        console.error(error);
      }
    }

    getBanks();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const currentUser = await account.get();

      const senderBank = banks.find(
        (bank) => bank.$id === selectedBankId
      );

      if (!senderBank) {
        toast.error("Sender bank account not found!");
        return;
      }

      const recipientBankResponse = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_BANK_ACCOUNTS_TABLE_ID!,
        [Query.equal("accountNumber", recipient)]
      );

      const recipientBank = recipientBankResponse.documents[0];

      if (!recipientBank) {
        toast.error("Recipient account not found!");
        return;
      }

      if (recipientBank.userId === currentUser.$id) {
        toast.error("You cannot transfer to your own account!");
        return;
      }

      const transferAmount = Number(amount);

      if (transferAmount <= 0) {
        toast.error("Amount must be greater than 0!");
        return;
      }

      if (senderBank.balance < transferAmount) {
        toast.error("Insufficient balance!");
        return;
      }

      const senderNewBalance = senderBank.balance - transferAmount;
      const recipientNewBalance = recipientBank.balance + transferAmount;

      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_BANK_ACCOUNTS_TABLE_ID!,
        senderBank.$id,
        {
          balance: senderNewBalance,
        }
      );

      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_BANK_ACCOUNTS_TABLE_ID!,
        recipientBank.$id,
        {
          balance: recipientNewBalance,
        }
      );

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_TRANSACTIONS_TABLE_ID!,
        ID.unique(),
        {
          userId: currentUser.$id,
          title: `Transfer to ${recipientBank.ownerName || recipientBank.accountNumber}`,
          type: "transfer",
          amount: transferAmount,
          recipient: recipientBank.accountNumber,
          note,
          date: new Date().toISOString(),
        }
      );

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_TRANSACTIONS_TABLE_ID!,
        ID.unique(),
        {
          userId: recipientBank.userId,
          title: `Transfer from ${senderBank.ownerName || senderBank.accountNumber}`,
          type: "income",
          amount: transferAmount,
          recipient: senderBank.accountNumber,
          note,
          date: new Date().toISOString(),
        }
      );

      toast.success("Transfer success!");

      setRecipient("");
      setAmount("");
      setNote("");

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Transfer failed!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl rounded-2xl border bg-white p-6 shadow-sm"
    >

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Source Bank Account
        </label>

        <select
          value={selectedBankId}
          onChange={(e) => setSelectedBankId(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          required
        >
          {banks.map((bank) => (
            <option key={bank.$id} value={bank.$id}>
              {bank.bankName} - {bank.accountNumber} - ${bank.balance}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Recipient Account Number
        </label>
        
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="enter recipient account number"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="100"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">
          Note
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Payment note"
          className="min-h-28 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-black px-4 py-3 font-semibold text-white hover:bg-gray-800"
      >
        Send Money
      </button>
    </form>
  );
}
