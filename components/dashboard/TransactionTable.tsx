"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { account } from "@/lib/appwrite";
import { Query } from "appwrite";
import Link from "next/link";
import { Transaction } from "@/types";
import jsPDF from "jspdf";

export default function TransactionTable() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
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

  const filteredTransactions = transactions.filter((trx) =>
    trx.title.toLowerCase().includes(search.toLowerCase()) ||
    trx.type.toLowerCase().includes(search.toLowerCase()) ||
    trx.recipient.toLowerCase().includes(search.toLowerCase()) ||
    trx.status?.toLowerCase().includes(search.toLowerCase())
  );

  function exportTransactionsPDF() {
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text("Fintech Bank", 20, 20);

    pdf.setFontSize(14);
    pdf.text("Transaction History Report", 20, 30);

    pdf.setFontSize(10);
    pdf.text(`Generated at: ${new Date().toLocaleString("id-ID")}`, 20, 40);

    let y = 55;

    filteredTransactions.forEach((trx, index) => {
      pdf.text(`${index + 1}. ${trx.title}`, 20, y);
      pdf.text(`Type: ${trx.type}`, 20, y + 7);
      pdf.text(`Amount: ${trx.type === "income" ? "+" : "-"}$${trx.amount}`, 20, y + 14);
      pdf.text(`Status: ${trx.status || "success"}`, 20, y + 21);
      pdf.text(
        `Date: ${new Date(trx.date).toLocaleString("id-ID")}`,
        20,
        y + 28
      );

      y += 42;

      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    });

    pdf.save("transaction-history.pdf");
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-xl font-bold">
        All Transactions
      </h2>

      

      <div className="hiden overflow-x-auto md:block">

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search transaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={exportTransactionsPDF}
            className="whitespace-nowrap rounded-xl bg-black px-10 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Export PDF
          </button>
        </div>

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

            {filteredTransactions.map((trx) => (

              <tr
                key={trx.$id}
                className="border-b last:border-b-0"
              >

                <td className="py-4 font-medium">
                  <Link
                    href={`/transactions/${trx.$id}`}
                    className="hover:underline"
                  >
                    {trx.title}
                  </Link>
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

      <div className="space-y-4 md:hidden">
        {filteredTransactions.map((trx) => (
          <div
            key={trx.$id}
            className="rounded-2xl border bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{trx.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(trx.date).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <p
                className={`font-bold ${
                  trx.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {trx.type === "income" ? "+" : "-"}${trx.amount}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                  trx.type === "income"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {trx.type}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  getStatusBadge(trx.status)
                }`}
              >
                {trx.status || "success"}
              </span>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                {trx.recipient}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}