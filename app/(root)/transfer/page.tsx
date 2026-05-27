import TransferForm from "@/components/dashboard/TransferForm";

export default function TransferPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Transfer Funds</h1>

      <p className="mb-8 mt-2 text-gray-500">
        Send money to another user account.
      </p>

      <TransferForm />
    </div>
  );
}