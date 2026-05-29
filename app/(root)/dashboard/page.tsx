"use client";

import { useEffect, useState } from "react";

import Header from "@/components/shared/Header";
import BalanceCard from "@/components/dashboard/BalanceCard";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import { databases } from "@/lib/appwrite";
import { account } from "@/lib/appwrite";
import { Query } from "appwrite";

import { Transaction, BankAccount } from "@/types";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTransactions() {
      try {
        const currentUser = await account.get();

        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_TRANSACTIONS_TABLE_ID!,
          [
            Query.equal("userId", currentUser.$id),
            Query.orderDesc("date"),
            Query.limit(5),
          ]
        );

        const bankResponse = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_BANK_ACCOUNTS_TABLE_ID!,
          [Query.equal("userId", currentUser.$id)]
        );

        setTransactions(response.documents as unknown as Transaction[]);
        setBanks(bankResponse.documents as unknown as BankAccount[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getTransactions();
  }, []);

  const totalTransfer = transactions
    .filter((trx) => trx.type === "transfer")
    .reduce((total, trx) => total + trx.amount, 0);

  const totalIncome = transactions
    .filter((trx) => trx.type === "income")
    .reduce((total, trx) => total + trx.amount, 0);

  const totalExpense = transactions
    .filter((trx) => trx.type === "expense")
    .reduce((total, trx) => total + trx.amount, 0);

  const totalBalance = banks.reduce(
    (total, bank) => total + bank.balance,
    0
  );

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <Header />

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <BalanceCard title="Total Balance" amount={`$${totalBalance}`} />
        <BalanceCard title="Income" amount={`$${totalIncome}`} />
        <BalanceCard title="Expenses" amount={`$${totalExpense + totalTransfer}`} />
      </section>

      <RecentTransactions transactions={transactions.slice(0, 5)} />

      <div className="mt-8">
        <ExpenseChart transactions={transactions} />
      </div>
    </div>
  );
}