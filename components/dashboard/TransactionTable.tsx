"use client";
import { useState } from "react";
import { transactions } from "@/constants/dummyData";

export default function TransactionTable() {
    const [filter, setFilter] = useState("all");

    const filteredTransactions =
    filter === "all"
        ? transactions
        : transactions.filter((trx) => trx.type === filter);  

    return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">All Transactions</h2>

      <div className="mb-6 flex gap-3">
        <button
            onClick={() => setFilter("all")}
            className={`rounded-lg px-4 py-2 text-sm ${
            filter === "all"
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
        >
            All
        </button>

        <button
            onClick={() => setFilter("income")}
            className={`rounded-lg px-4 py-2 text-sm ${
            filter === "income"
                ? "bg-green-600 text-white"
                : "bg-gray-100"
            }`}
        >
            Income
        </button>

        <button
            onClick={() => setFilter("expense")}
            className={`rounded-lg px-4 py-2 text-sm ${
            filter === "expense"
                ? "bg-red-600 text-white"
                : "bg-gray-100"
            }`}
        >
            Expense
        </button>

        <button
            onClick={() => setFilter("transfer")}
            className={`rounded-lg px-4 py-2 text-sm ${
            filter === "transfer"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
        >
            Transfer
        </button>
        </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-sm text-gray-500">
              <th className="pb-3">Transaction</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((trx) => (
              <tr key={trx.id} className="border-b last:border-b-0">
                <td className="py-4 font-medium">{trx.title}</td>
                <td className="py-4 capitalize">{trx.type}</td>
                <td className="py-4 text-gray-500">{trx.date}</td>
                <td
                  className={`py-4 text-right font-semibold ${
                    trx.type === "income" ? "text-green-600" : "text-red-600"
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