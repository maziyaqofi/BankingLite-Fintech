interface BalanceCardProps {
  title: string;
  amount: string;
}

export default function BalanceCard({
  title,
  amount,
}: BalanceCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border">
      <p className="text-gray-500 mb-2">
        {title}
      </p>

      <h2 className="text-3xl font-bold">
        {amount}
      </h2>
    </div>
  );
}