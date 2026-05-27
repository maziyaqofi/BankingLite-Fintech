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

export default function ExpenseChart() {
  const data = {
    labels: ["Income", "Expense", "Transfer"],
    datasets: [
      {
        data: [8200, 350, 500],
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

      <div className="max-w-xs mx-auto">
        <Doughnut data={data} />
      </div>
    </div>
  );
}