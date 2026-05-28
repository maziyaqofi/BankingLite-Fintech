import AddTransactionForm from "@/components/dashboard/AddTransactionForm";

export default function AddTransactionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Add Transaction</h1>

      <p className="mb-8 mt-2 text-gray-500">
        Add income or expense transaction to your account.
      </p>

      <AddTransactionForm />
    </div>
  );
}