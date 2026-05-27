import TransactionTable from "@/components/dashboard/TransactionTable";

export default function TransactionsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Transaction History</h1>

      <p className="mb-8 mt-2 text-gray-500">
        View and manage your latest transactions.
      </p>

      <TransactionTable />
    </div>
  );
}