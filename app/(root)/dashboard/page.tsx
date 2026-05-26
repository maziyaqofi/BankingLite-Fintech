import Header from "@/components/shared/Header";
import BalanceCard from "@/components/dashboard/BalanceCard";

export default function DashboardPage() {
  return (
    <div>
      <Header />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BalanceCard
          title="Total Balance"
          amount="$12,450"
        />

        <BalanceCard
          title="Income"
          amount="$8,200"
        />

        <BalanceCard
          title="Expenses"
          amount="$2,150"
        />
      </section>
    </div>
  );
}