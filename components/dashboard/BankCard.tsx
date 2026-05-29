interface BankCardProps {
  bankName: string;
  accountNumber: string;
  balance: number;
}

export default function BankCard({
  bankName,
  accountNumber,
  balance,
}: BankCardProps) {
  return (
    <div className="rounded-3xl bg-black p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{bankName}</h2>
        <p className="text-sm opacity-70">Fintech</p>
      </div>

      <div className="mt-10">
        <p className="text-sm opacity-70">Account Number</p>
        <h3 className="mt-1 text-2xl tracking-widest">
          {accountNumber}
        </h3>
      </div>

      <div className="mt-10">
        <p className="text-sm opacity-70">Balance</p>
        <h1 className="mt-1 text-3xl font-bold">
          ${balance}
        </h1>
      </div>
    </div>
  );
}