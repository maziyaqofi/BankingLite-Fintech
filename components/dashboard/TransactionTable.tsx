"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { account } from "@/lib/appwrite";
import { Query } from "appwrite";

interface Transaction {
  $id: string;
  title: string;
  type: string;
  amount: number;
  recipient: string;
  note?: string;
  date: string;
}

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

      setTransactions(response.documents as unknown as Transaction[]);

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
              <th className="pb-3">Type</th>
              <th className="pb-3">Recipient</th>
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

                <td className="py-4 capitalize">
                  {trx.type}
                </td>

                <td className="py-4">
                  {trx.recipient}
                </td>

                <td className="py-4 text-gray-500">
                  {new Date(trx.date).toLocaleDateString()}
                </td>

                <td className="py-4 text-right font-semibold text-red-600">
                  -${trx.amount}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}