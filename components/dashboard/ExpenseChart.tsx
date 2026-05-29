"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

import { Transaction } from "@/types";

interface ExpenseChartProps {
  transactions: Transaction[];
}

export default function ExpenseChart({
  transactions,
}: ExpenseChartProps) {

  const totalTransfer = transactions
    .filter((trx) => trx.type === "transfer")
    .reduce((total, trx) => total + trx.amount, 0);

  const totalIncome = transactions
    .filter((trx) => trx.type === "income")
    .reduce((total, trx) => total + trx.amount, 0);

  const totalExpense = transactions
    .filter((trx) => trx.type === "expense")
    .reduce((total, trx) => total + trx.amount, 0);

  const data = {
    labels: ["Income", "Expense", "Transfer"],

    datasets: [
      {
        data: [
          totalIncome,
          totalExpense,
          totalTransfer,
        ],

        backgroundColor: [
          "#16a34a",
          "#dc2626",
          "#2563eb",
        ],

        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Financial Analytics
      </h2>

      <div className="mx-auto max-w-xs">
        <Doughnut data={data} />
      </div>

    </div>
  );
}