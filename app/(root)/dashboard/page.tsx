import Header from "@/components/shared/Header";
import BalanceCard from "@/components/dashboard/BalanceCard";
import { bankAccounts, transactions } from "@/constants/dummyData";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import ExpenseChart from "@/components/dashboard/ExpenseChart";

export default function DashboardPage() {

  const totalBalance = bankAccounts.reduce(
    (total, bank) => total + bank.balance,
    0
  );

  const totalIncome = transactions
    .filter((trx) => trx.type === "income")
    .reduce((total, trx) => total + trx.amount, 0);

  const totalExpense = transactions
    .filter((trx) => trx.type === "expense")
    .reduce((total, trx) => total + trx.amount, 0);

  return (
    <div>
      <Header />

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <BalanceCard title="Total Balance" amount={`$${totalBalance}`} />
        <BalanceCard title="Income" amount={`$${totalIncome}`} />
        <BalanceCard title="Expenses" amount={`$${totalExpense}`} />
      </section>

      <RecentTransactions />

      <div className="mt-8">
        <ExpenseChart />
      </div>
    </div>
  );
}