"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

interface BankCardProps {
  ownerName: string;
  bankName: string;
  accountNumber: string;
  balance: number;
}

export default function BankCard({
  ownerName,
  bankName,
  accountNumber,
  balance,
}: BankCardProps) {
  async function copyAccountNumber() {
    await navigator.clipboard.writeText(accountNumber);
    toast.success("Account number copied!");
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-black to-gray-800 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{bankName}</h2>
        <p className="text-sm opacity-70">Fintech Card</p>
      </div>

      <div className="mt-10">
        <p className="text-sm opacity-70">Card Number</p>

        <div className="mt-2 flex items-center justify-between gap-3">
          <h3 className="text-2xl tracking-widest">
            {accountNumber}
          </h3>

          <button
            onClick={copyAccountNumber}
            className="rounded-full bg-white/10 p-2 hover:bg-white/20"
            type="button"
          >
            <Copy size={18} />
          </button>
        </div>
      </div>

      <div className="mt-10 flex items-end justify-between">
        <div>
          <p className="text-sm opacity-70">Card Holder</p>
          <h3 className="mt-1 font-semibold uppercase">
            {ownerName}
          </h3>
        </div>

        <div className="text-right">
          <p className="text-sm opacity-70">Balance</p>
          <h1 className="mt-1 text-2xl font-bold">
            ${balance}
          </h1>
        </div>
      </div>
    </div>
  );
}