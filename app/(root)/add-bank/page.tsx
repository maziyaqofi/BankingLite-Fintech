import AddBankForm from "@/components/dashboard/AddBankForm";

export default function AddBankPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Add Bank Account</h1>

      <p className="mb-8 mt-2 text-gray-500">
        Add a new bank account to your fintech profile.
      </p>

      <AddBankForm />
    </div>
  );
}