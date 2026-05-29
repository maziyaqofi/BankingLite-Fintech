"use client";

import { useEffect, useState } from "react";
import { Query } from "appwrite";

import BankCard from "@/components/dashboard/BankCard";
import { account, databases } from "@/lib/appwrite";

import { BankAccount } from "@/types";

export default function MyBanksPage() {
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBanks() {
      try {
        const currentUser = await account.get();

        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_BANK_ACCOUNTS_TABLE_ID!,
          [Query.equal("userId", currentUser.$id)]
        );

        setBanks(response.documents as unknown as BankAccount[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getBanks();
  }, []);

  if (loading) {
    return <p>Loading banks...</p>;
  }

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">My Banks</h1>

      <p className="mb-8 text-gray-500">
        List of your connected bank accounts.
      </p>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {banks.map((bank) => (
          <BankCard
            key={bank.$id}
            bankName={bank.bankName}
            accountNumber={bank.accountNumber}
            balance={bank.balance}
          />
        ))}
      </section>
    </div>
  );
}