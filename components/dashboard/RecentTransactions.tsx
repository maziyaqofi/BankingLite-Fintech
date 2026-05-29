import { Transaction } from "@/types";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-xl font-bold">
        Recent Transactions
      </h2>

      <div className="space-y-4">

        {transactions.map((trx) => (

          <div
            key={trx.$id}
            className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
          >

            <div>
              <h3 className="font-medium">
                {trx.title}
              </h3>

              <p className="text-sm text-gray-500">
                {new Date(trx.date).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <p
              className={`font-semibold ${
                trx.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {trx.type === "income" ? "+" : "-"}${trx.amount}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}