import BankCard from "@/components/dashboard/BankCard";
import { bankAccounts } from "@/constants/dummyData";

export default function MyBanksPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">
        My Banks
      </h1>

      <p className="mb-8 text-gray-500">
        List of your connected bank accounts.
      </p>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {bankAccounts.map((bank) => (
          <BankCard
            key={bank.id}
            bankName={bank.bankName}
            accountNumber={bank.accountNumber}
            balance={bank.balance}
          />
        ))}
      </section>
    </div>
  );
}