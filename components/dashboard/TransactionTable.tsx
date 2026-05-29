"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { account } from "@/lib/appwrite";
import { Query } from "appwrite";

import { Transaction } from "@/types";

export default function TransactionTable() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function getTransactions() {

      try {
      const currentUser = await account.get();
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_TRANSACTIONS_TABLE_ID!,
        [Query.equal("userId", currentUser.$id)]
      );

      const sortedTransactions = (
        response.documents as unknown as Transaction[]
      ).sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setTransactions(sortedTransactions);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }

    getTransactions();

  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p>Loading transactions...</p>
      </div>
    );
  }

  function getStatusBadge(status?: string) {
    const normalizedStatus = status?.toLowerCase() || "success";

    if (normalizedStatus === "success") {
      return "bg-green-100 text-green-700";
    }

    if (normalizedStatus === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-xl font-bold">
        All Transactions
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>
            <tr className="border-b text-sm text-gray-500">
              <th className="pb-3">Transaction</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Recipient</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>

            {transactions.map((trx) => (

              <tr
                key={trx.$id}
                className="border-b last:border-b-0"
              >

                <td className="py-4 font-medium">
                  {trx.title}
                </td>

                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(
                      trx.status
                    )}`}
                  >
                    {trx.status || "success"}
                  </span>
                </td>

                <td className="py-4">
                  {trx.recipient}
                </td>

                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      trx.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {trx.type}
                  </span>
                </td>

                <td className="py-4 text-gray-500">
                  {new Date(trx.date).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                <td
                  className={`py-4 text-right font-semibold ${
                    trx.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {trx.type === "income" ? "+" : "-"}${trx.amount}
                </td>

                

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}